import Link from 'next/link'

import { useTranslation } from 'next-i18next'

import ProjectCard from 'components/ProjectCard'

import { useProjects } from 'utils/hooks'
import { useCurrentUser } from 'lib/UserContext'

export default function Projects() {
  const { user } = useCurrentUser()
  const { t } = useTranslation(['projects'])

  const [projects] = useProjects({
    token: user?.access_token,
  })
  // здесь у нас придет массив проектов, разложенный по языкам
  return (
    <>
      <div className="h2 mt-4 mb-5">
        {user?.is_admin ? t('Projects') : t('MyProjects')}
      </div>
      <div className="grid grid-cols-1 gap-7 my-3 sm:grid-cols-1 md:grid-cols-2 md:my-5 xl:grid-cols-3">
        {projects &&
          projects.map((project) => {
            return <ProjectCard key={project.id} project={project} user={user} />
          })}
      </div>
      {user?.is_admin && (
        <div className="mt-3">
          <Link href={'/projects/create'}>
            <a className="btn-cyan">{t('AddNew')}</a>
          </Link>
        </div>
      )}
    </>
  )
}
