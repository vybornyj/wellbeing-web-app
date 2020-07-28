import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import { HeaderButton } from 'src/components/common/buttons/HeaderButton'
import { Logo } from 'src/components/common/vectors/Logo'
import { TemplateModalMenuMobile } from 'src/components/templates/TemplateModalMenuMobile'

interface Props {
  lang: lang
  isMainPage: boolean
}

const menuLinks = [
  { type: 'title', children: 'Заказ и оплата' },
  { type: 'button', href: '/products', ru: 'Услуги', en: 'Services' },
  { type: 'button', href: '/cart', ru: 'КОРЗИНА (2)', en: 'CART (1)' },

  { type: 'title', children: 'Статьи' },
  { type: 'button', href: '/cat/[url]', as: '/cat/news', ru: 'Новости', en: 'News' },
  { type: 'button', href: '/cat/[url]', as: '/cat/research', ru: 'Исследования', en: 'Research' },
  { type: 'button', href: '/cat/[url]', as: '/cat/nutrition', ru: 'Питание', en: 'Nutrition' },
  { type: 'button', href: '/cat/[url]', as: '/cat/training', ru: 'Тренировки', en: 'Training' },

  { type: 'title', children: 'Прочее' },
  { type: 'button', href: '/[url]', as: '/about-us', ru: 'О НАС', en: 'ABOUT US' },
  { type: 'button', href: '/[url]', as: '/team', ru: 'НАША КОМАНДА', en: 'OUR TEAM' }
]

export const TemplateMainHeader: FunctionComponent<Props> = ({ lang, isMainPage }) => {
  const [modal2IsOpen, setModal2IsOpen] = useState(false)
  const [storeCart] = useGlobal('storeCart')

  useEffect(() => {
    const header = document.getElementById('myHeader')
    const sticky = header?.offsetTop ?? 0
    const scrollCallBack = () => {
      if (window.pageYOffset > sticky) {
        header?.classList.add('sticky')
      } else {
        header?.classList.remove('sticky')
      }
    }

    if (isMainPage) window.addEventListener('scroll', scrollCallBack)

    return () => {
      window.removeEventListener('scroll', scrollCallBack)
    }
  }, [])

  return (
    <header>
      <TemplateModalMenuMobile menuItems={menuLinks} lang={lang} isOpen={modal2IsOpen} closing={() => setModal2IsOpen(false)} />

      {isMainPage && <div className='mainPageHeader' />}

      <div className={isMainPage ? 'block2' : 'block2 sticky'} id='myHeader'>
        <div className='block21'>
          <div className='logoImg'>
            <Logo />
          </div>
          <HeaderButton
            lang={lang}
            ru={
              <div className='block211'>
                <div>Исследовательский</div>
                <div>Проект</div>
                <div>Благополучие</div>
              </div>
            }
            en={
              <div className='block211'>
                <div>Wellbeing</div>
                <div>Research</div>
                <div>Project</div>
              </div>
            }
          />

          <div className='only1024plus'>
            <HeaderButton lang={lang} href='/products' ru='Услуги' en='Services' />
            <HeaderButton lang={lang} href='/cat/[url]' as='/cat/news' ru='Новости' en='News' />
            <HeaderButton lang={lang} href='/cat/[url]' as='/cat/research' ru='Исследования' en='Research' />
            <HeaderButton lang={lang} href='/cat/[url]' as='/cat/nutrition' ru='Питание' en='Nutrition' />
            <HeaderButton lang={lang} href='/cat/[url]' as='/cat/training' ru='Тренировки' en='Training' />
          </div>

          <div className='freeSpace' />

          <div className='only1024plus'>
            <HeaderButton lang={lang} href='/cart' ru={`КОРЗИНА (${storeCart.products.length})`} en={`CART (${storeCart.products.length})`} />
            <HeaderButton
              lang={lang}
              href='/my'
              ru={
                <div>
                  <div>Личный</div>
                  <div>Кабинет</div>
                </div>
              }
              en={
                <div>
                  <div>My</div>
                  <div>Account</div>
                </div>
              }
            />
          </div>

          <div className='only1023minus'>
            <HeaderButton href='/my' lang={lang}>
              <FontAwesomeIcon icon={faUserCircle} />
            </HeaderButton>

            <HeaderButton onClick={() => setModal2IsOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </HeaderButton>
          </div>
        </div>
      </div>

      {!isMainPage && <div className='block2' />}

      <style jsx>{
        /* language=CSS */ `
          .logoImg {
            width: 50px;
            height: 50px;
          }

          a,
          a:visited,
          a:active {
            color: white;
            font-size: 18px;
            margin: 4px 2px;
            display: block;
          }

          a:hover {
            color: hsl(190, 100%, 90%);
          }

          header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1;
          }

          .mainPageHeader {
            width: 100%;
            height: 17vmax;
            background: url(/images/header/background.jpg) center center;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }

          .block1 {
            flex: 0 0 20px;
            width: 1200px;
            display: flex;
            justify-content: flex-end;
            line-height: 1;
            padding-top: 2px;
          }

          .block11 {
            font-size: 18px;
            font-weight: bold;
            padding-left: 15px;
          }

          .block2 {
            color: white;
            flex: 0 0 50px;
            width: 100%;
            display: flex;
            justify-content: center;
            background: linear-gradient(to bottom, hsla(200, 60%, 60%, 1), hsla(120, 60%, 60%, 1));
          }

          .block2.sticky {
            position: fixed;
            top: 0;

            z-index: 1;
          }

          .block21 {
            display: flex;
            height: 50px;
            width: 1200px;
          }

          .only1024plus {
            display: none;
          }

          .only1023minus {
            display: flex;
          }

          @media screen and (min-width: 1024px) {
            .only1024plus {
              display: flex;
            }

            .only1023minus {
              display: none;
            }
          }

          .block211 {
            flex: 0 0 158px;
            padding-top: 1px;
            line-height: 0.9;
            font-size: 17px;
          }

          .block211 > div:nth-child(2) {
            /*padding-left: 8px;*/
          }

          .block211 > div:nth-child(3) {
            /*padding-left: 16px;*/
          }

          .freeSpace {
            flex: 1 0 auto;
          }

          img {
            box-shadow: gray 0 0 4px -1px;
          }
        `
      }</style>
    </header>
  )
}
