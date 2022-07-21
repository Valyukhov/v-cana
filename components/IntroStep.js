import { useTranslation } from 'next-i18next'

import Footer from '../components/Footer'

const IntroSteps = {
  1: {
    title: 'Первый шаг - самостоятельное изучение',
    video: 'https://www.youtube.com/embed/gxawAAQ9xbQ',
    description: [
      'Это индивидуальная работа и выполняется без участия других членов команды. Каждый читает материалы самостоятельно, не обсуждая прочитанное, но записывая свои комментарии. Если ваш проект по переводу ведется онлайн, то этот шаг можно выполнить до встречи с другими участниками команды переводчиков.',
      'ЦЕЛЬ этого шага: понять общий смысл и цель книги, а также контекст (обстановку, время и место, любые факты, помогающие более точно перевести текст) и подготовиться к командному обсуждению текста перед тем, как начать перевод.',
      'ЗАДАНИЯ ДЛЯ ПЕРВОГО ШАГА:',
      ' В этом шаге вам необходимо выполнить несколько заданий:',
      'ИСТОРИЯ - Прочитайте историю (главу, над которой предстоит работа). Запишите для обсуждения командой предложения и слова, которые могут вызвать трудности при переводе или которые требуют особого внимания от переводчиков.',
      'ОБЗОР ИНСТРУМЕНТА «СЛОВА» - Прочитайте СЛОВА к главе. Необходимо прочитать статьи к каждому слову. Отметьте для обсуждения командой статьи к словам, которые могут быть полезными для перевода Открытых Библейских Историй.',
      'ОБЗОР ИНСТРУМЕНТА «ЗАМЕТКИ» - Прочитайте ЗАМЕТКИ к главе. Необходимо прочитать ЗАМЕТКИ к каждому отрывку. Отметьте для обсуждения командой ЗАМЕТКИ, которые могут быть полезными для перевода Открытых Библейских Историй.',
    ],
  },
  2: {
    title: 'Второй шаг - командное изучение текста',
    video: 'https://www.youtube.com/embed/HK6SXnU5zEw',
    description: [
      'ВТОРОЙ шаг - КОМАНДНОЕ ИЗУЧЕНИЕ ТЕКСТА',
      'Это командная работа и мы рекомендуем потратить на нее не более 60 минут.',
      'ЦЕЛЬ этого шага: хорошо понять смысл текста и слов всей командой, а также принять командное решение по переводу некоторых слов перед тем, как начать основную работу.',
      'ЗАДАНИЯ ДЛЯ ВТОРОГО ШАГА:',
      'В этом шаге вам необходимо выполнить несколько заданий.',
      'ИСТОРИЯ - Прочитайте вслух историю(главу, над которой предстоит работа). Обсудите предложения и слова, которые могут вызвать трудности при переводе или которые требуют особого внимания от переводчиков. Уделите этому этапу 20 минут.',
      'ОБЗОР ИНСТРУМЕНТА «СЛОВА» - Обсудите инструмент СЛОВА. Что полезного для перевода вы нашли в этих статьях? Используйте свои комментарии с самостоятельного изучения. Уделите этому этапу 20 минут.',
      'ОБЗОР ИНСТРУМЕНТА «ЗАМЕТКИ» - Обсудите инструмент ЗАМЕТКИ. Что полезного для перевода вы нашли в ЗАМЕТКАХ. Используйте свои комментарии по этому инструменту с самостоятельного изучения. Уделите этому этапу 20 минут.',
    ],
  },
  3: {
    title: 'Третий шаг - подготовка к переводу',
    video: 'https://www.youtube.com/embed/jlhwA9SIWXQ',
    description: [
      'ТРЕТИЙ шаг - ПОДГОТОВКА К ПЕРЕВОДУ',
      'Это работа в паре и мы рекомендуем потратить на нее не более 20 минут.',
      'ЦЕЛЬ этого шага: подготовиться к переводу текста естественным языком.',
      'В этом шаге вам необходимо выполнить два задания.',
      'Первое задание - ПЕРЕСКАЗ НА РУССКОМ - Прочитайте ваш отрывок из главы в ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЯХ. Если необходимо - изучите отрывок вместе со всеми инструментами, чтобы как можно лучше понять этот текст. Перескажите смысл отрывка своему напарнику, используя максимально понятные и естественные слова русского языка. Не старайтесь пересказывать в точности исходный текст. Перескажите текст в максимальной для себя простоте. После этого послушайте вашего напарника, пересказывающего свой отрывок.',
      'Уделите этому этапу 10 минут. Не обсуждайте ваши пересказы. В этом шаге только проговаривание текста и слушание.',
      'Второе задание - ПЕРЕСКАЗ НА ЦЕЛЕВОМ - Еще раз просмотрите ваш отрывок или главу в ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЯХ, и подумайте, как пересказать этот текст на языке, на который делается перевод, помня о КРАТКОМ ОПИСАНИИ ПЕРЕВОДА (Резюме к переводу) и о стиле языка.',
      'Перескажите ваш отрывок напарнику на целевом языке, используя максимально понятные и естественные слова этого языка. Передайте всё, что вы запомнили, не подглядывая в текст. Затем послушайте вашего напарника, пересказывающего свой отрывок таким же образом. Уделите этому этапу 10 минут. Не обсуждайте ваши пересказы. В этом шаге только проговаривание текста и слушание.',
    ],
  },
  4: {
    title: 'Четвертый шаг - набросок «вслепую»',
    video: 'https://www.youtube.com/embed/HVXOiKUsXSI',
    description: [
      'ЧЕТВЕРТЫЙ ШАГ - НАБРОСОК «ВСЛЕПУЮ»',
      'Это индивидуальная работа и мы рекомендуем потратить на нее не более 20 минут.',
      'ЦЕЛЬ этого шага: сделать первый набросок естественным языком.',
      'Еще раз прочитайте ваш отрывок  или главу в ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЯХ. Если вам необходимо, просмотрите все инструменты к этому отрывку. Как только вы будете готовы сделать «набросок», перейдите на панель «слепого» наброска в программе Translation Studio или в другой программе, в которой вы работаете и напишите ваш перевод на своем языке, используя максимально понятные и естественные слова вашего языка. Пишите по памяти. Не подглядывайте!',
      'Главная цель этого шага - естественность языка. Не бойтесь ошибаться! Ошибки на этом этапе допустимы. Точность перевода будет проверена на следующих шагах работы над текстом.',
    ],
  },
  5: {
    title: 'Пятый шаг - самостоятельная проверка',
    video: 'https://www.youtube.com/embed/p3p8c_K-O3c',
    description: [
      'ПЯТЫЙ ШАГ - САМОСТОЯТЕЛЬНАЯ ПРОВЕРКА',
      'Это индивидуальная работа и мы рекомендуем потратить на нее не более 30 минут.',
      'ЦЕЛЬ этого шага: поработать над ошибками в тексте и убедиться, что первый набросок перевода получился достаточно точным и естественным. ',
      'В этом шаге вам необходимо выполнить три задания.',
      'Задание первое. Проверьте ваш перевод на ТОЧНОСТЬ, сравнив с текстом ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЙ на русском языке. При необходимости используйте все инструменты к переводу. Оцените по вопросам: ничего не добавлено, ничего не пропущено, смысл не изменён? Если есть ошибки, исправьте. Уделите этому заданию 10 минут.',
      'Задание второе. Прочитайте ВОПРОСЫ и ответьте на них, глядя в свой текст. Сравните с ответами. Если есть ошибки в вашем тексте, исправьте. Уделите этому заданию 10 минут.',
      'Задание третье. Прочитайте себе ваш перевод вслух и оцените - звучит ли ваш текст ПОНЯТНО И ЕСТЕСТВЕННО? Если нет, то исправьте. Уделите этому заданию 10 минут.',
    ],
  },
  6: {
    title: 'Шестой шаг - взаимная проверка',
    video: 'https://www.youtube.com/embed/cAgypQsWgQk',
    description: [
      'ШЕСТОЙ ШАГ - ВЗАИМНАЯ ПРОВЕРКА',
      'Это работа в паре и мы рекомендуем потратить на нее не более 40 минут.',
      'ЦЕЛЬ этого шага: улучшить набросок перевода, пригласив другогого человека, чтобы проверить перевод на точность и естественность.',
      'В этом шаге вам необходимо выполнить два задания.',
      'Задание первое - Прочитайте вслух свой текст напарнику, который параллельно следит за текстом ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЙ на русском языке и обращает внимание только на ТОЧНОСТЬ вашего перевода. Обсудите текст насколько он точен. Изменения в текст вносит переводчик, работавший над ним. Если не удалось договориться о каких-либо изменениях, оставьте этот вопрос для обсуждения всей командой. Поменяйтесь ролями и поработайте над отрывком партнёра. Уделите этому заданию 20 минут.',
      'Задание второе - Еще раз прочитайте вслух свой текст напарнику, который теперь не смотрит ни в какой текст, а просто слушает ваше чтение вслух, обращая внимание на ПОНЯТНОСТЬ и ЕСТЕСТВЕННОСТЬ языка. Обсудите текст, помня о целевой аудитории и о КРАТКОМ ОПИСАНИИ ПЕРЕВОДА (Резюме к переводу). Если есть ошибки в вашем тексте, исправьте. Поменяйтесь ролями и поработайте над отрывком партнёра. Уделите этому заданию 20 минут.',
      'Примечание к шагу:',
      '- Не влюбляйтесь в свой текст. Будьте гибкими к тому, чтобы слышать другое мнение и улучшать свой набросок перевода.  Это групповая работа и текст должен соответствовать пониманию большинства в вашей команде. Если даже будут допущены ошибки в этом случае, то на проверках последующих уровней они будут исправлены.',
      '- Если в работе с напарником вам не удалось договориться по каким-то вопросам, касающихся текста, оставьте этот вопрос на обсуждение со всей командой. Ваша цель - не победить напарника, а с его помощью улучшить перевод.',
    ],
  },
  7: {
    title: 'Седьмой шаг - командный обзор перевода',
    video: 'https://www.youtube.com/embed/P2MbEKDw8U4',
    description: [
      'СЕДЬМОЙ шаг - КОМАНДНЫЙ ОБЗОР ПЕРЕВОДА',
      'Это командная работа и мы рекомендуем потратить на нее не более 60 минут.',
      'ЦЕЛЬ этого шага: улучшить перевод, приняв решения командой о трудных словах или фразах, делая текст хорошим как с точки зрения точности, так и с точки зрения естественности. Это финальный шаг в работе над текстом.',
      'В этом шаге вам необходимо выполнить три задания.',
      'Задание первое - Прочитайте вслух свой текст команде. Команда в это время смотрит в текст ОТКРЫТЫХ БИБЛЕЙСКИХ ИСТОРИЙ на русском языке и обращает внимание только на ТОЧНОСТЬ вашего перевода.Обсудите текст насколько он точен. Если есть ошибки в вашем тексте, исправьте. Всей командой проверьте на точность работу каждого члена команды. Уделите этому заданию 20 минут.',
      'Задание второе - Проверьте вместе с командой ваш перевод на наличие ключевых слов из инструмента СЛОВА. Все ключевые слова на месте? Все ключевые слова переведены корректно? Уделите этому заданию 20 минут.',
      'Задание третье - Еще раз прочитайте вслух свой текст команде, которая теперь не смотрит ни в какой текст, а просто слушает, обращая внимание на ПОНЯТНОСТЬ и ЕСТЕСТВЕННОСТЬ языка. Обсудите текст, помня о целевой аудитории и о КРАТКОМ ОПИСАНИИ ПЕРЕВОДА (Резюме к переводу). Если есть ошибки в вашем тексте, исправьте. Проработайте каждую главу/ каждый отрывок, пока команда не будет довольна результатом. Уделите этому заданию 20 минут.',
      'Примечание к шагу: ',
      '- Не оставляйте текст с несколькими вариантами перевода предложения или слова. После седьмого шага не должны оставаться нерешенные вопросы. Текст должен быть готовым к чтению.',
    ],
  },
}

function IntroStep({ step }) {
  const { t } = useTranslation(['intro-steps', 'common'])

  return (
    <div className="layout-appbar">
      <div className="text-alignment">
        <h1 className="h1 my-8">{t('StepIntroduction')}:</h1>
        <div className="h2">{step && IntroSteps[step].title}</div>
        <div className="aspect-w-16 aspect-h-9 my-7">
          <iframe
            src={step && IntroSteps[step].video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          {step &&
            IntroSteps[step].description.map((paragraph, i) => {
              return (
                <p className="pb-5 h4" key={i}>
                  {paragraph}
                </p>
              )
            })}
        </div>
      </div>
      <Footer
        textButton={t('common:Next')}
        textCheckbox={
          t(
            'common:Made'
          ) /** не корректное слово на англ, вроде как. Сделано в России - тогда made, а если сделано в смысле выполнено то наверное Done или Completed */
        }
        href={
          `/intro-steps/${String(
            parseInt(step) + 1
          )}` /** TODO тут точно надо к строке приводить? */
        }
      />
    </div>
  )
}

export default IntroStep
