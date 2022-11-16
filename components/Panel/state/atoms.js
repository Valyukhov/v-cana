import { atom } from 'recoil'

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
  default: 1,
})
