import Link from 'next/link'
import { FunctionComponent } from 'react'
import { ProductPrices } from 'src/components/main/products/ProductPrices'
import { ProductToCart } from 'src/components/main/products/ProductToCart'

interface Props {
  lang: lang
  products: Products
  currency?: Currency
}

export const MainProducts: FunctionComponent<Props> = ({ lang, products, currency }) => {
  return (
    <div className='products'>
      {products.map(({ productId, titleRu, titleEn, imageUrl, jcontainer, url }, index) =>
        jcontainer.variants.map(({ price, titleEn: titleEn2, titleRu: titleRu2, profitEn, profitRu }, variantKey) => (
          <div key={`${index}${variantKey}`}>
            <div className='product'>
              <Link href='/[lang]/products/[url]' as={`/${lang}/products/${url}`}>
                <a className='article'>
                  <div className='info'>
                    {(profitRu || profitEn) && (
                      <div className='ribbon'>
                        <span>{lang === 'ru' ? profitRu : profitEn}</span>
                      </div>
                    )}
                    <img src={imageUrl || '/images/product-default.png'} alt='' />

                    <ProductPrices price={price} currency={currency} />

                    <div className='titles'>
                      <div className='title'>{lang === 'ru' ? titleRu : titleEn}</div>
                      <div className='title2'>{lang === 'ru' ? titleRu2 : titleEn2}</div>
                    </div>
                  </div>
                </a>
              </Link>
              <ProductToCart lang={lang} productId={productId} variantKey={variantKey} />
              {/* <ProductToCart lang={lang} product={{productId, variantKey}}/> */}
            </div>
          </div>
        ))
      )}

      <style jsx>{
        /* language=CSS */ `
          .products {
            display: flex;
            flex-wrap: wrap;
            width: 290px;
            margin: auto;
          }

          @media screen and (min-width: 620px) {
            .products {
              width: 580px;
            }
          }

          @media screen and (min-width: 910px) {
            .products {
              width: 870px;
            }
          }

          @media screen and (min-width: 1200px) {
            .products {
              width: 100%;
            }
          }

          .product {
            position: relative;
            width: 270px;
            background: white;
            margin: 10px;
            box-shadow: 0 0 2px 0 hsl(180, 90%, 30%);
          }

          .product .info:hover {
            box-shadow: 0 0 0 10px hsl(180, 90%, 30%);
          }

          .info {
            transition: var(--app-transition);
            cursor: pointer;
          }

          .profit {
            width: 100%;
            margin-top: 10px;
            background-color: red;
            position: absolute;
            text-align: center;
            font-weight: bold;
            color: white;
            opacity: 0.8;
          }

          img {
            width: 270px;
            height: 270px;
          }

          .product .titles {
            padding: 10px 10px 10px 15px;
          }

          .title {
            font-size: 20px;
          }

          /* ribbon */
          .ribbon {
            width: 150px;
            height: 150px;
            overflow: hidden;
            position: absolute;
            top: -10px;
            right: -10px;
          }

          .ribbon::before,
          .ribbon::after {
            position: absolute;
            z-index: -1;
            content: '';
            display: block;
            border: 5px solid hsl(180, 90%, 30%);
            border-top-color: transparent;
            border-right-color: transparent;
          }

          .ribbon::before {
            top: 0;
            left: 0;
          }

          .ribbon::after {
            bottom: 0;
            right: 0;
          }

          .ribbon span {
            position: absolute;
            display: block;
            width: 225px;
            padding: 15px 0;
            background-color: hsl(210, 90%, 30%);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            color: #fff;
            font: 700 18px/1 'Lato', sans-serif;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
            text-align: center;
            left: -25px;
            top: 30px;
            transform: rotate(45deg);
          }
        `
      }</style>
    </div>
  )
}
