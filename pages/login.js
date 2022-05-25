import React, { useState } from 'react'
import Report from '../public/report.svg'
import EyeIcon from '../public/eyeIcon.svg'

export default function Login() {
  const [errorText, setErrorText] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [styleLogin, setStyleLogin] = useState('form')
  const [stylePassword, setStylePassword] = useState('form')
  const [formValid, setFormValid] = useState(false)
  const [passType, setPassType] = useState('password')

  const examinationLogPass = () => {
    if (login === 'qwerty' && password === '1234') {
      setStyleLogin('form-valid')
      setStylePassword('form-valid')
      setErrorText('')
    } else {
      setStyleLogin('form-invalid')
      setStylePassword('form-invalid')
      setFormValid(true)
      setErrorText('Неверный логин или пароль')
    }
  }
  const report = () => {
    alert('Вы написали админу')
  }
  const show_hide_password = () => {
    passType == 'password' ? setPassType('text') : setPassType('password')
  }
  return (
    <div className="LTAppbar">
      <div className="">
        <p className="h1 mb-8">Вход:</p>
        <form className="relative mb-4 space-y-2.5">
          <input
            className={styleLogin}
            type="text"
            placeholder="Логин:"
            onChange={(event) => {
              setLogin(event.target.value)
              setStyleLogin('form')
            }}
          />
            <input
              className={stylePassword}
              type={passType}
              placeholder="Пароль:"
              onChange={(event) => {
                setPassword(event.target.value)
                setStylePassword('form')
              }}
            />
            <button className="eye" onClick={show_hide_password}><EyeIcon />
            </button>
        </form>
        <div class="flex items-center justify-between">
        <p className='text-xs text-red-600'>{errorText}</p>
        <a href="#" class="font-medium text-sky-500 hover:text-sky-600"> Забыли пароль? </a>
        </div>
        <div className="flex gap-2.5 mt-5 h-9">
          <button
            disabled={!formValid}
            onClick={report}
            className="w-8/12 btn-transparent"
          >
            Написать админу
          </button>
          <button onClick={examinationLogPass} className="w-4/12 btn-filled">
            Далее
          </button>
        </div>
      </div>
    </div>
  )
}
Login.layoutType = 'appbar'
