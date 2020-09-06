import { faArrowLeft, faArrowRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useState } from 'react'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AdminInput } from 'src/components/common/inputs/AdminInput'
import { hotReplacerEn, hotReplacerPrice, hotReplacerRu } from 'src/scripts/helpers/hotReplacers'

interface Props {
  variants: Product['jcontainer']['variants']
  setVariants: (variants: Product['jcontainer']['variants']) => void
  currency?: Currency
}

export const AdminProductVariants: FunctionComponent<Props> = ({ variants, setVariants, currency }) => {
  const [doRerender, setDoRerender] = useState(false)

  const handlePrice = (key: number, value: string) => {
    const newVariants = [...variants]
    newVariants[key].price = hotReplacerPrice(value)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleTitleRu = (key: number, value: string) => {
    const newVariants = [...variants]
    newVariants[key].titleRu = hotReplacerRu(value)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleProfitRu = (key: number, value: string) => {
    const newVariants = [...variants]
    newVariants[key].profitRu = hotReplacerRu(value)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleTitleEn = (key: number, value: string) => {
    const newVariants = [...variants]
    newVariants[key].titleEn = hotReplacerEn(value)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleProfitEn = (key: number, value: string) => {
    const newVariants = [...variants]
    newVariants[key].profitEn = hotReplacerEn(value)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleDelete = (key: number) => {
    const newVariants = variants.filter((_, k) => k !== key)
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleAdd = () => {
    let newVariants = [...variants]
    newVariants = [...newVariants, { price: '0', titleRu: '', profitRu: '', titleEn: '', profitEn: '' }]
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleSortDown = (key: number) => {
    const newVariants = [...variants]
    const currentElement = newVariants[key]
    const downElement = newVariants[key + 1]
    newVariants[key + 1] = currentElement
    newVariants[key] = downElement
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  const handleSortUp = (key: number) => {
    const newVariants = [...variants]
    const currentElement = newVariants[key]
    const upElement = newVariants[key - 1]
    newVariants[key - 1] = currentElement
    newVariants[key] = upElement
    setVariants(newVariants)
    setDoRerender(!doRerender)
  }

  return (
    <div className='row'>
      {variants.map(({ price, titleRu, profitRu, titleEn, profitEn }, key) => (
        <div className='column maxWidth300' key={key}>
          <div className='column' key={key}>
            <div className='row'>
              {variants?.length > 1 && key > 0 && <AdminButton onClick={() => handleSortUp(key)} type='blue' faIcon={faArrowLeft} />}
              {variants?.length > 1 && key < variants?.length - 1 && (
                <AdminButton onClick={() => handleSortDown(key)} type='blue' faIcon={faArrowRight} />
              )}
            </div>
            <AdminInput label='Цена в Евро' value={price} setValue={(value) => handlePrice(key, value)} />
            <div className='currency'>
              ≈ {(Number(price) * currency.rates.RUB).toFixed()} RUB ≈ {(Number(price) * currency.rates.USD).toFixed(2)} USD ≈{' '}
              {(Number(price) * currency.rates.GBP).toFixed(2)} GBP
            </div>
            <AdminInput label='Название на русском' value={titleRu} setValue={(value) => handleTitleRu(key, value)} />
            <AdminInput label='Выгода на русском' value={profitRu} setValue={(value) => handleProfitRu(key, value)} />
            <AdminInput label='Название на английском' value={titleEn} setValue={(value) => handleTitleEn(key, value)} />
            <AdminInput label='Выгода на английском' value={profitEn} setValue={(value) => handleProfitEn(key, value)} />
          </div>
          {variants?.length > 1 && (
            <>
              <div className='space30' />
              <AdminButton onClick={() => handleDelete(key)} type='red' faIcon={faTrash}>
                Удалить
              </AdminButton>
            </>
          )}
        </div>
      ))}
      <div className='column maxWidth300 plus' onClick={handleAdd} role='link' tabIndex={0}>
        <FontAwesomeIcon icon={faPlus} />
      </div>

      <style jsx>{
        /* language=CSS */ `
          .row {
            flex-wrap: wrap;
          }

          .maxWidth300 {
            width: 300px;
            height: 521px;
            border-radius: 8px;
            border: 1px solid transparent;
            box-shadow: 0 0 3px 0 hsl(0, 0%, 25%);
            padding: 4px;
            margin: 4px;
          }

          .plus {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .plus:hover {
            box-shadow: inset 0 0 3px 0 hsl(0, 0%, 25%);
          }

          .plus :global(svg) {
            width: 40px;
            height: 40px;
            color: white;
          }

          .currency {
            font-size: 14px;
            text-align: center;
          }
        `
      }</style>
    </div>
  )
}
