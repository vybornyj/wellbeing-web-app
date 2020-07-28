import { GetServerSideProps, NextPage } from 'next'
import { HorizontalBlocks } from 'src/components/main/horizontalBlocks/HorizontalBlocks'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'

interface Props {
  error?: error
  lang?: lang
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, lang }) => {
  if (error) return <TemplateMain lang={lang} error={error} />

  return (
    <TemplateMain
      lang={lang}
      titles={{
        ru: 'Online Fitness University – by Sofia Rudina-Myers',
        en: 'Онлайн Университет Фитнеса – Софии Рудиной - Майерс'
      }}
      isMainPage
    >
      <div className='root'>
        <div className='block1'>
          {lang === 'en' ? (
            <>
              <p>
                {' '}
                Welcome to the Online Fitness University page! This is an information hub where you will find all the necessary information on setting
                up and knowing yourself, correcting your path.{' '}
              </p>
              <p>
                <i>
                  {' '}
                  <b> This is your way of Self-knowledge from Nutrition and Fitness to Relations with the world and with you. </b>{' '}
                </i>
              </p>
              <p>
                <i>
                  {' '}
                  <b> This is your way to create your own lifestyle. </b>{' '}
                </i>
              </p>
              <p>
                {' '}
                All take <b> online </b> courses. At any time available to you. In social networks. We have closed webinars for project participants
                and in the public domain on interesting topics with invited guests.{' '}
              </p>
              <p>
                {' '}
                All projects target Disclosure <b> of your personality </b>. Pursuing Volume B and Number <b> DNA and Microbiome Testing </b>, we have
                developed our own concept and methodology for discovering each genetic potential. Without looking back at anyone else, at new-fangled
                phenomena ... only what you need at this time, for your specific purposes.{' '}
              </p>
              <p> Our team has medical advisers, a dole and a style specialist. Everything you need for a complete transformation. </p>
            </>
          ) : (
            <>
              <p>
                Приветствую вас на странице Онлайн Университета Фитнеса! Это информационный хаб, где вы найдете всю необходимую информацию по
                настройке и познанию себя , коррекции своего пути.
              </p>
              <p>
                <i>
                  <b>Это Ваш путь Самопознание от Питания и Фитнес до Отношений с миром и с собой.</b>
                </i>
              </p>
              <p>
                <i>
                  <b>Это ваш путь по созданию собственного стиля жизни.</b>
                </i>
              </p>
              <p>
                Все проходят курсы <b>онлайн</b>. В любом доступном для вас время. В соцсетях. У нас есть вебинары закрытая для участников проектов и
                в открытом доступе по интересным темам с приглашенными гостями.
              </p>
              <p>
                Все нацелены проекты на Раскрытие <b>вашей индивидуальности</b>. Занимаясь том В и Число <b>ДНК и Микробиомы тестирования</b>, мы
                разработали собственный концепт и методика раскрытия генетического потенциала каждый . Без оглядки на кого-либо еще, на новомодные
                явления ... только то, что нужно именно вам в данное время, для ваших конкретных целей.
              </p>
              <p>В нашей команде есть медицинские советники, доул и специалист по стилю. Все, что нужно для полной трансформации.</p>
            </>
          )}

          <img src='https://static.wellbeing-research.ru/images/1580864615.jpg' alt='wellbeing' />
          {lang === 'en' ? (
            <>
              <p> At the University’s Online Fitness, our goal is to help you reach yours. </p>

              <p>
                {' '}
                We are an Internet Fitness Hub where you can find everything you need to change your life, bring a new wave, get these new looks and
                find tones of useful information about how to do it.{' '}
              </p>

              <h3> MISSION </h3>

              <p>
                {' '}
                Our mission is here to help people on their wellbeing journey. It can be weight loss or toning your body, it can be nutrition or
                general well-being.{' '}
              </p>

              <h3> HOW? </h3>

              <p> Online. Purely. At your fingertips. Using all kinds of social communications as you prefer. </p>

              <h3> WHEN? </h3>

              <p> In your free time. At 7 am in the gym. 9 pm when you put your baby to bed. Lunch at work. </p>

              <h3> WHY US? </h3>

              <p>
                {' '}
                We offer vibrant, individually tailored programs designed for you and your needs. Moreover, we are creating a completely new family
                for you to support in this travel, with our one-to-one online support and other team members increasingly social media platforms.{' '}
              </p>
            </>
          ) : (
            <>
              <p>В Интернете Фитнес университета, наша цель состоит в том, чтобы помочь вам достичь ваших.</p>

              <p>
                Мы являемся Интернет Фитнес-концентратор, где вы можете найти все, что нужно, чтобы изменить свою жизнь, принести новую волну,
                получить эти новые взгляды и найти тоны полезной информации о том, как это сделать.
              </p>

              <h3>МИССИЯ</h3>

              <p>
                Наша миссия здесь, чтобы помочь людям в их Wellbeing путешествие. Это может быть потери веса или тонизирующее ваше тело , это может
                быть питание или общее благополучие.
              </p>

              <h3>КАК?</h3>

              <p>В сети. Чисто. У вас под рукой. Используя все виды социальных коммуникаций так, как вы предпочитаете.</p>

              <h3>КОГДА?</h3>

              <p>В свое свободное время. В 7 утра в тренажерном зале. 9 вечера, когда вы кладете ребенка спать. Обед на работе.</p>

              <h3>ПОЧЕМУ НАС?</h3>

              <p>
                Мы предлагаем яркие индивидуально сформированные программы, разработанные для вас и ваших потребностей. Более того, мы создаю
                совершенно новая семья для вас, чтобы поддержать в этом путешествии, с нашим один-к-одному онлайн-поддержка и другие члены команд все
                более медийный платформами социальным .
              </p>
            </>
          )}
        </div>
      </div>

      <HorizontalBlocks lang={lang} isArticles={true} isProducts={true} />

      <style jsx>{
        /* language=CSS */ `
          .root {
            display: flex;
            flex-direction: column;

            align-items: center;
            font-size: 18px;
          }

          .block1 {
            text-align: center;
          }
        `
      }</style>
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: {
    lang: params?.lang
  }
})

export default Page
