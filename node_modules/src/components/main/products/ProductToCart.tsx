import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'
import { useDispatch, useGlobal } from 'reactn'

interface Props {
  lang: lang
  productId: number
  variantKey: number
}

export const ProductToCart: FunctionComponent<Props> = ({ lang, productId, variantKey }) => {
  // @ts-ignore
  const STORE_CART_ADD = useDispatch('STORE_CART_ADD')
  // @ts-ignore
  const STORE_CART_REMOVE = useDispatch('STORE_CART_REMOVE')
  const [storeCart] = useGlobal('storeCart')
  let isProductInCart = storeCart.products.find(el => el.productId === productId && el.variantKey === variantKey)

  const q = `${productId}-${variantKey} `

  return (
    <div
      className='toCart'
      onClick={() => {
        if (isProductInCart) STORE_CART_REMOVE(productId, variantKey)
        else STORE_CART_ADD(productId, variantKey)
      }}
    >
      <FontAwesomeIcon icon={faCartPlus} />
      {q}
      {isProductInCart ? (lang === 'ru' ? 'Убрать из корзины' : 'Remove from Cart') : lang === 'ru' ? 'Добавить в Корзину' : 'Add to Cart'}

      <style jsx>{
        /* language=CSS */ `
          .toCart {
            padding: 12px 10px 10px 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px dashed hsl(180, 90%, 30%);
            cursor: pointer;
          }

          .toCart:hover {
            border-top-color: transparent;
            background-color: hsl(210, 90%, 30%);
            color: white;
          }

          .toCart:hover :global(svg) {
            color: white;
          }

          .toCart :global(svg) {
            margin-right: 15px;
            font-size: 20px;
            color: hsl(180, 90%, 30%);
          }
        `
      }</style>
    </div>
  )
}
