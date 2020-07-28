import { FunctionComponent } from 'react'
import { AppButtonCheckbox } from 'src/components/common/buttonsCheckbox/AppButtonCheckbox'

interface Props {
  categories: Categories
  categoriesIds: number[]
  setCategoriesIds: (categoriesIds: number[]) => void
}

export const AdminArticleCategories: FunctionComponent<Props> = ({ categories, categoriesIds, setCategoriesIds }) => {
  const handleSaveCheckbox = (categoryId: number) => {
    const newCategoriesIds = categoriesIds.includes(categoryId) ? categoriesIds.filter(id => id !== categoryId) : [...categoriesIds, categoryId]

    setCategoriesIds(newCategoriesIds)
  }

  return (
    <div className='column1023row1024'>
      {categories.map(({ categoryId, titleRu }, key) => (
        <AppButtonCheckbox checked={categoriesIds.includes(categoryId)} key={key} onClick={() => handleSaveCheckbox(categoryId)} flex='none'>
          {titleRu}
        </AppButtonCheckbox>
      ))}

      <style jsx>{
        /* language=CSS */ `
          div {
            display: flex;
            flex-wrap: wrap;
          }
        `
      }</style>
    </div>
  )
}
