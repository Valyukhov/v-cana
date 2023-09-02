import { atom } from 'recoil'

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const checkedVersesBibleState = atom({
  key: 'checkedVersesBibleState',
  default: [],
})

export const inactiveState = atom({
  key: 'inactiveState',
  default: false,
})

export const stepConfigState = atom({
  key: 'stepConfigState',
  default: {
    count_of_users: '',
    time: 0,
    description: '',
    title: '',
    last_step: 8,
    current_step: 1,
    project_code: '',
  },
})

export const projectIdState = atom({
  key: 'projectIdState',
  default: null,
})
export const currentVerse = atom({
  key: 'currentVerse',
  default: '1',
  effects: [localStorageEffect('currentScrollVerse')],
})

export const aboutVersionModalIsOpen = atom({
  key: 'aboutVersionModalIsOpen',
  default: false,
})
export const isSwitchingPageState = atom({
  key: 'isSwitchingPageState',
  default: false,
})
