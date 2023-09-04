import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useSetRecoilState } from 'recoil'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { isSwitchingPageState } from 'components/state/atoms'

export default function Confession() {
  const { t } = useTranslation('common', 'users')
  const setSwitchingPage = useSetRecoilState(isSwitchingPageState)
  const { push } = useRouter()
  useEffect(() => {
    setSwitchingPage(false)
  }, [setSwitchingPage])

  return (
    <div className="layout-appbar">
      <div className="mx-5 max-w-lg text-center whitespace-pre-line">
        <h1 className="mb-6 text-4xl">{t('users:Confession')}:</h1>

        <p
          dangerouslySetInnerHTML={{
            __html: t('DescriptionConfession', { interpolation: { escapeValue: false } }),
          }}
          className="mb-2"
        />
        <p className="text-sm font-light">
          {t('OfficialVersion')}
          <a
            href="https://texttree.org/"
            target={'_blank'}
            className="underline text-cyan-600"
            rel="noreferrer"
          >
            https://texttree.org/
          </a>
        </p>
        <button
          onClick={() => {
            setSwitchingPage(true)
            setTimeout(() => {
              push('/confession-steps')
            }, 500)
          }}
          className="btn-cyan w-28 mt-7"
        >
          {t('Start')}
        </button>
      </div>
    </div>
  )
}
Confession.backgroundColor = 'bg-white'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'users'])),
    },
  }
}
