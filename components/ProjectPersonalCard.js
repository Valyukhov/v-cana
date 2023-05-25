import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import Translators from 'components/Translators'

import { supabase } from 'utils/supabaseClient'
import { useBriefState, useGetBooks, useAccess } from 'utils/hooks'
import { readableDate } from 'utils/helper'

function ProjectPersonalCard({ project, token, user }) {
  const { locale } = useRouter()

  const [currentSteps, setCurrentSteps] = useState(null)

  const { t } = useTranslation(['common', 'books'])

  const { briefResume, isBrief } = useBriefState({
    token,
    project_id: project?.id,
  })
  const [{ isCoordinatorAccess }, { isLoading }] = useAccess({
    token: user?.access_token,
    user_id: user?.id,
    code: project?.code,
  })

  useEffect(() => {
    supabase
      .rpc('get_current_steps', { project_id: project.id })
      .then((res) => setCurrentSteps(res.data))
  }, [project?.id])

  const chapters = useMemo(() => {
    const _chapters = {}
    currentSteps?.forEach((step) => {
      _chapters[step.book] = _chapters?.[step.book]?.length
        ? [..._chapters[step.book], step]
        : [step]
    })
    return _chapters
  }, [currentSteps])
  const localStorageSteps = useMemo(
    () => JSON.parse(localStorage.getItem('viewedIntroSteps')),
    []
  )

  const searchLocalStorage = (step, localStorageSteps) => {
    const { project, book, chapter, step: numStep } = step
    const isRepeatIntro = localStorageSteps?.find(
      (el) =>
        JSON.stringify(el) ===
        JSON.stringify({
          project,
          book,
          chapter: chapter.toString(),
          step: numStep.toString(),
        })
    )
    return isRepeatIntro
  }
  const [books] = useGetBooks({
    token,
    code: project?.code,
  })
  const countChaptersVerses = useMemo(() => {
    if (books) {
      const count = {}
      for (const book of books) {
        let { chapters } = book
        if (book.code === 'obs') {
          const obsChapters = {}
          for (const key in chapters) {
            if (Object.hasOwnProperty.call(chapters, key)) {
              obsChapters[parseInt(key)] = chapters[key]
            }
          }
          chapters = obsChapters
        }
        const countVerses = Object.keys(chapters).reduce(
          (count, chapter) => count + chapters[chapter],
          0
        )
        count[book.code] = {
          countChapters: Object.keys(chapters).length,
          countVerses,
          chapters,
        }
      }
      return count
    }
  }, [books])

  return (
    <>
      {Object.keys(chapters).length > 0 && (
        <div className="flex flex-col gap-7">
          {Object.keys(chapters).map((book, i) => {
            return (
              <div key={i} className="card flex flex-col sm:flex-row gap-7 p-7 h-full">
                {!isLoading && currentSteps && project ? (
                  <>
                    <div className="flex flex-col gap-7 w-1/2 lg:w-1/3">
                      <div className="flex gap-1 flex-wrap items-center">
                        <div className="text-2xl font-bold">{t(`books:${book}`)}</div>
                        <div className="pt-1">{`(${t('Chapter', {
                          count: countChaptersVerses?.[book]?.countChapters,
                        })} ${t('Verse', {
                          count: countChaptersVerses?.[book]?.countVerses,
                        })})`}</div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-3">
                          <p className="text-lg">{t('Project')}:</p>
                          <Link href={`/projects/${project.code}`}>
                            <a className="text-lg text-teal-500">{project?.title}</a>
                          </Link>
                        </div>
                        <div className="flex gap-3">
                          <p className="text-lg">{t('Translators')}:</p>
                          <Translators projectCode={project?.code} size="25px" />
                        </div>
                        <div className="flex gap-3">
                          <p className="text-lg">
                            {t('Begin')}:{' '}
                            {chapters &&
                              readableDate(
                                Math.min(
                                  ...chapters?.[book].map((el) =>
                                    Date.parse(el.started_at)
                                  )
                                ),
                                locale
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 content-start w-1/2 lg:w-2/3 text-sm">
                      {chapters[book].map((step, index) => {
                        const stepLink = (
                          <>
                            <span>
                              {step.chapter} {t('Ch').toLowerCase()}
                            </span>
                            <span>|</span>
                            <span>
                              {countChaptersVerses?.[book]?.chapters[step.chapter]}{' '}
                              {t('Ver').toLowerCase()}
                            </span>
                            <span>|</span>
                            <span>
                              {t('Step', { count: parseInt(step?.step) }).toLowerCase()}
                            </span>
                          </>
                        )

                        return !isBrief || briefResume ? (
                          <Link
                            key={index}
                            href={`/translate/${step.project}/${step.book}/${
                              step.chapter
                            }/${step.step}${
                              typeof searchLocalStorage(step, localStorageSteps) ===
                              'undefined'
                                ? '/intro'
                                : ''
                            }`}
                          >
                            <a className="btn-primary flex gap-2">{stepLink}</a>
                          </Link>
                        ) : (
                          <button key={index} className="btn-primary flex gap-2" disabled>
                            {stepLink}
                          </button>
                        )
                      })}
                      {briefResume === '' && (
                        <Link href={`/projects/${project?.code}/edit?setting=brief`}>
                          <a className="btn-primary flex gap-2">
                            {t(`${isCoordinatorAccess ? 'EditBrief' : 'OpenBrief'}`)}
                          </a>
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    role="status"
                    className="flex flex-col gap-4 h-full w-full animate-pulse"
                  >
                    <div className="h-3 bg-gray-200 rounded-2xl w-1/4" />
                    <div className="h-3 bg-gray-200 rounded-2xl w-1/2" />
                    <div className="h-3 bg-gray-200 rounded-2xl w-full" />
                    <div className="h-3 bg-gray-200 rounded-2xl w-full" />
                    <div className="h-3 bg-gray-200 rounded-2xl w-full" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ProjectPersonalCard
