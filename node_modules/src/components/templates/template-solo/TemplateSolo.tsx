import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Logo } from 'src/components/common/vectors/Logo'
import { TemplateHead } from 'src/components/templates/TemplateHead'

interface Props {
  lang?: lang
  title?: string
  titleBase?: string
}

export const TemplateSolo: FunctionComponent<Props> = ({ lang, title, titleBase, children }) => {
  return (
    <>
      <TemplateHead title={title} titleBase={titleBase} lang={lang} />

      <div className='background' />

      <div className='logo'>
        <Link href='/[lang]' as={`/${lang}`}>
          <a className='article'>
            <Logo />
          </a>
        </Link>
      </div>

      <div className='form'>{children}</div>

      <style jsx>{
        /* language=CSS */ `
          .background {
            z-index: -1;
            position: fixed;
            top: 0;
            right: 0;
            bottom: -100px; /* чтобы в мобильных под фоном не было белого отступа, из-за плавующей адресной строки */
            left: 0;

            /*https://www.svgbackgrounds.com/#liquid-cheese*/
            /*background-color: hsl(243, 100%, 33%);*/
            /*background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23000dae' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230024b4' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23003cbb' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230056c1' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%230071c7' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230082c9' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230092cb' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%2300a4cd' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%2300b5cf' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%2300c7d1' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");*/
            /*background-attachment: fixed;*/
            /*background-size: cover;*/

            background-color: #52c79a;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%2352c79a' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%2336bd9b' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%2307b39c' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%2300a89c' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23009e9b' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23009399' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23008997' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23007e93' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%2300738f' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23006889' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23005e82' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%2300537b' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23004972' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23003f69' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%2300355f' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23002b54' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23012149' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%2309183d' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
            background-attachment: fixed;
            background-size: cover;

            transition: var(--app-transition);
          }

          .logo {
            padding: 40px 0 20px 0;
            width: 125px;
            margin: auto;
            transition: var(--app-transition);
          }

          .logo :global(svg) {
            filter: drop-shadow(0 5px 10px hsl(223, 74%, 14%));
          }

          .logo:hover {
            padding: 38px 0 18px 0;
            width: 129px;
          }

          .logo:hover :global(svg) {
            filter: drop-shadow(0 7px 14px hsl(223, 74%, 14%));
          }

          .form {
            max-width: 600px;
            padding: 20px 10px 200px 10px;
            transition: var(--app-transition);
            margin: auto;
          }
        `
      }</style>
    </>
  )
}
