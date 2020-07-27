import { NextPage } from 'next'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'

interface Props {
  error?: error
}

const Page: NextPage<Props> = ({ error }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Авторы статей'>
      <h3>В разработке</h3>
    </TemplateAdmin>
  )
}

export default Page
