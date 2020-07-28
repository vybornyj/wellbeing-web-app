import { FunctionComponent } from 'react'
import { FooterButton } from 'src/components/common/buttons/FooterButton'
import { En } from 'src/components/common/vectors/flags/En'
import { Ru } from 'src/components/common/vectors/flags/Ru'

interface Props {
  lang: lang
}

const ru = {
  titleContacts: 'Контакты',
  email: 'Email',
  phone: 'Телефон',
  titleProject: 'Проект',
  titleInfo: 'Информация',
  titleAsWellAs: 'А так же',
  titleImages: 'Присоединяйтесь к нам!',
  copyright: 'Исследовательский проект Благополучие. Все права защищены.'
}
const en = {
  titleContacts: 'Contacts',
  email: 'Email',
  phone: 'Telephone',
  titleProject: 'Project',
  titleInfo: 'Information',
  titleAsWellAs: 'As Well As',
  titleImages: 'Join Us!',
  copyright: 'Wellbeing Research Project. All Rights Reserved.'
}
const uni = {
  phone: '+(44) 75 85 313 535',
  email: 'WellbeingResearchPro@gmail.com'
}

export const TemplateMainFooter: FunctionComponent<Props> = ({ lang }) => {
  const texts = lang === 'ru' ? ru : en
  return (
    <footer>
      <div className='wrapper'>
        <div className='blocks'>
          <div className='block'>
            <div className='title'>{texts.titleContacts}</div>
            <FooterButton href={`mailto:${uni.email}`}>{`${texts.email}: ${uni.email}`}</FooterButton>
            <FooterButton href={`tel:${uni.phone}`}>{`${texts.phone}: ${uni.phone}`}</FooterButton>

            <div className='title'>{texts.titleProject}</div>
            <FooterButton href='/[url]' as='/about-us' lang={lang} ru='О НАС' en='ABOUT US' />
            <FooterButton href='/[url]' as='/team' lang={lang} ru='НАША КОМАНДА' en='OUR TEAM' />

            <div className='title'>{texts.titleInfo}</div>
            <FooterButton href='/' lang={lang} ru='ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' en='PRIVACY POLICY' />
            <FooterButton href='/' lang={lang} ru='ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ' en='DENIAL OF RESPONSIBILITY' />

            <div className='title'>{texts.titleAsWellAs}</div>
            <FooterButton href='/' lang={lang} ru='ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ' en='FAQ' />

            {lang === 'ru' ? (
              <FooterButton lang='en'>
                READ THIS SITE IN ENGLISH
                <En />
              </FooterButton>
            ) : (
              <FooterButton lang='ru'>
                Читать этот сайт на русском
                <Ru />
              </FooterButton>
            )}
          </div>
          <div className='block'>
            <div className='title'>{texts.titleImages}</div>
            <div className='images'>
              <img src='/images/footer/1.jpg' alt='' />
              <img src='/images/footer/2.jpg' alt='' />
              <img src='/images/footer/3.jpg' alt='' />
              <img src='/images/footer/4.jpg' alt='' />
              <img src='/images/footer/5.jpg' alt='' />
              <img src='/images/footer/6.jpg' alt='' />
              <img src='/images/footer/7.jpg' alt='' />
              <img src='/images/footer/8.jpg' alt='' />
              <img src='/images/footer/9.jpg' alt='' />
            </div>
          </div>
        </div>

        <div className='copyright'>
          Copyright © {new Date().getFullYear()} {texts.copyright}
        </div>
      </div>

      <style jsx>{
        /* language=CSS */ `
          footer {
            display: flex;
            flex-direction: column;
            background: linear-gradient(90deg, hsl(190, 100%, 25%), hsl(200, 100%, 25%));
            margin: 50px 0 0 0;
          }

          .wrapper {
            width: 100%;
            margin: auto;
            padding: 40px 20px;
            max-width: 1200px;

            display: flex;
            flex-direction: column;
          }

          .blocks {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .block {
            width: 100%;
          }

          @media screen and (min-width: 1200px) {
            .blocks {
              flex-direction: row;
            }

            .block {
              width: 48%;
            }
          }

          .title {
            font-size: 18px;
            margin: 30px 0 20px 10px;
            font-weight: bold;
            color: white;
            background: -webkit-linear-gradient(hsla(0, 0%, 100%, 0.6), hsl(0, 0%, 100%));
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
          }

          .images {
            display: flex;
            flex-wrap: wrap;
            margin: 0 0.5%;
          }

          .images img {
            width: 30%;
            margin: 0 1.5% 3% 1.5%;
            opacity: 0.01;
          }

          .copyright {
            margin-top: 60px;
            text-align: center;
            font-size: 16px;
            color: white;
            background: -webkit-linear-gradient(hsla(0, 0%, 100%, 0.6), hsl(0, 0%, 100%));
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
          }
        `
      }</style>
    </footer>
  )
}
