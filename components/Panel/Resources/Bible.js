import ReactMarkdown from 'react-markdown'
import { useGetResource } from 'utils/hooks'
import Placeholder from '../UI/Placeholder'

function Bible({ config }) {
  const { loading, data, error } = useGetResource({ config, url: '/api/git/bible' })

  return (
    <div>{loading ? <Placeholder /> : <BibleView data={data} checkView={false} />}</div>
  )
}

export default Bible

function BibleView({ data }) {
  return (
    <>
      {data?.map((el) => (
        <ul key={el.verse} className="flex">
          <li className={`py-2`}>
            <ReactMarkdown>{el.verse + ' ' + el.text}</ReactMarkdown>
          </li>
        </ul>
      ))}
    </>
  )
}