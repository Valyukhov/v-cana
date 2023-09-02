import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import { Disclosure } from '@headlessui/react'

import { useSetRecoilState } from 'recoil'

import { isSwitchingPageState } from 'components/state/atoms'

import Gear from '/public/gear.svg'
import Down from '/public/arrow-down.svg'

function Card({ children, title, access, link = '/', isOpen = true }) {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  const setSwitchingPage = useSetRecoilState(isSwitchingPageState)

  return (
    <div className="card flex flex-col gap-3 sm:gap-7 !pb-4">
      <div className="flex justify-between items-start gap-7">
        <h3 className="text-lg sm:text-xl font-bold truncate">{title}</h3>
        {access && (
          <button
            onClick={() => {
              setSwitchingPage(true)
              setTimeout(() => {
                push(link)
              }, 500)
            }}
            className="w-6 min-w-[1.5rem]"
          >
            <Gear />
          </button>
        )}
      </div>
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <Disclosure.Panel>{children}</Disclosure.Panel>
            <Disclosure.Button>
              <div className="flex gap-1 justify-center w-full pt-3 border-t border-gray-350 text-gray-350">
                <span>{t(open ? 'Hide' : 'Open')}</span>
                <Down
                  className={`w-6 max-w-[1.5rem] ${open ? 'rotate-180 transform' : ''}`}
                />
              </div>
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Card
