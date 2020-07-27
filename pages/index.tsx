import { GetServerSideProps, NextPage } from 'next'

const Page: NextPage = () => null

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.writeHead(301, {
    Location: `https://${req?.headers?.host}/${req?.headers?.['accept-language']?.includes('ru') ? 'ru' : 'en'}`
  })
  res.end()
  return { props: {} }
}

export default Page

// todo: cron task: удалять из бд токены старше 48 часов
