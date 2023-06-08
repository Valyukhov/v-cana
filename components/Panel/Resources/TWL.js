import { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'

import { useTranslation } from 'next-i18next'

import { setup } from 'axios-cache-adapter'

import localforage from 'localforage'

import { Placeholder, TNTWLContent } from '../UI'

import { useGetResource, useScroll } from 'utils/hooks'
import { checkLSVal, filterNotes } from 'utils/helper'

const DEFAULT_MAX_AGE = 24

function TWL({ config, url, toolName }) {
  const [item, setItem] = useState(null)
  const { isLoading, data } = useGetResource({ config, url })
  const [wordObjects, setWordObjects] = useState([])
  const [isLoadingTW, setIsLoadingTW] = useState(false)
  useEffect(() => {
    const getWords = async () => {
      const cacheStore = localforage.createInstance({
        driver: [localforage.INDEXEDDB],
        name: 'web-cache',
      })
      const api = setup({
        cache: {
          store: cacheStore,
          maxAge: 60 * 60 * DEFAULT_MAX_AGE,
        },
      })
      const {
        resource: { owner, repo },
      } = config
      const promises = data.map(async (wordObject) => {
        const url = `${
          process.env.NEXT_PUBLIC_NODE_HOST ?? 'https://git.door43.org'
        }/${owner}/${repo.slice(0, -1)}/raw/branch/master/${wordObject.TWLink.split('/')
          .slice(-3)
          .join('/')}.md`
        let markdown
        try {
          setIsLoadingTW(true)
          markdown = await api.get(url)
        } catch (error) {
          setIsLoadingTW(false)
          console.log(error)
        }

        const splitter = markdown?.data?.search('\n')
        return {
          ...wordObject,
          title: markdown?.data?.slice(0, splitter),
          text: markdown?.data?.slice(splitter),
        }
      })
      const words = await Promise.all(promises)
      const finalData = {}

      words?.forEach((word) => {
        const {
          ID,
          Reference,
          TWLink,
          isRepeatedInBook,
          isRepeatedInChapter,
          isRepeatedInVerse,
          text,
          title,
        } = word
        const wordObject = {
          id: ID,
          title,
          text,
          url: TWLink,
          isRepeatedInBook,
          isRepeatedInChapter,
          isRepeatedInVerse,
        }

        const [, verse] = Reference.split(':')
        filterNotes(wordObject, verse, finalData)
      })
      setIsLoadingTW(false)
      setWordObjects(finalData)
    }
    if (data && config) {
      getWords()
    }
  }, [config, data])

  return (
    <>
      <div className="relative h-full">
        <TNTWLContent setItem={setItem} item={item} />
        <TWLList
          setItem={setItem}
          data={wordObjects}
          toolName={toolName}
          isLoading={isLoadingTW || isLoading}
        />
      </div>
    </>
  )
}

export default TWL

function TWLList({ setItem, data, toolName, isLoading }) {
  const [verses, setVerses] = useState([])
  const [filter, setFilter] = useState(() => {
    return checkLSVal('filter_words', 'disabled', 'string')
  })
  const { scrollId, handleSave } = useScroll({ toolName })

  useEffect(() => {
    localStorage.setItem('filter_words', filter)
  }, [filter])

  useEffect(() => {
    if (data) {
      setVerses(Object.entries(data))
    }
  }, [data])

  return (
    <div
      className={`divide-y divide-gray-800 divide-dashed h-full overflow-auto ${
        isLoading ? 'px-4' : ''
      }`}
    >
      <div className="text-center">
        {<FilterRepeated filter={filter} setFilter={setFilter} />}
      </div>
      {isLoading ? (
        <div className="pt-4 pr-4">
          <Placeholder />
        </div>
      ) : (
        verses?.map((el, verseIndex) => {
          return (
            <div key={verseIndex} className="p-4 flex mx-4">
              <div className="text-2xl">{el[0]}</div>
              <div className="text-gray-700 pl-7 flex-1">
                <ul>
                  {el[1]?.map((item, index) => {
                    let itemFilter
                    switch (filter) {
                      case 'disabled':
                        itemFilter = false
                        break
                      case 'verse':
                        itemFilter = item.isRepeatedInVerse
                        break
                      case 'book':
                        itemFilter = item.isRepeatedInBook
                        break

                      default:
                        break
                    }

                    return (
                      <li
                        key={index}
                        id={'id' + item.id}
                        className={`p-2 cursor-pointer ${
                          itemFilter ? 'text-gray-400' : ''
                        } hover:bg-gray-200
                      ${scrollId === 'id' + item.id ? 'bg-gray-200' : ''}
                      `}
                        onClick={() => {
                          handleSave(item.id)
                          setItem({ text: item.text, title: item.title })
                        }}
                      >
                        <ReactMarkdown>{item.title}</ReactMarkdown>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

function FilterRepeated({ setFilter, filter }) {
  const { t } = useTranslation('common')
  const options = [
    { value: 'verse', name: t('ByVerse') },
    { value: 'book', name: t('ByBook') },
    { value: 'disabled', name: t('Disabled') },
  ]

  return (
    <div className="flex items-center justify-center">
      <div className="">{t('FilterRepeatedWords')}</div>
      <select
        className="input m-2 !w-auto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {options?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
