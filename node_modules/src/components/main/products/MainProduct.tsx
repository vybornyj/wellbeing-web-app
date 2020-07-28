import { FunctionComponent } from 'react'
import { ProductPrices } from 'src/components/main/products/ProductPrices'
import { ProductToCart } from 'src/components/main/products/ProductToCart'

interface Props {
  lang: lang
  product: Product
  currency?: Currency
}

export const MainProduct: FunctionComponent<Props> = ({ lang, product, currency }) => {
  const { productId, titleRu, titleEn, contentRu, contentEn, imageUrl, jcontainer } = product

  return (
    <section className='column767row768'>
      <div className='left'>
        <img className='img768 display768' src={imageUrl || '/images/product-default.png'} alt='' />

        <div className='variants'>
          {jcontainer.variants.map(({ price, titleEn: titleEn2, titleRu: titleRu2, profitEn, profitRu }, variantKey) => (
            <div className='variant' key={variantKey}>
              <ProductPrices price={price} currency={currency} />
              {(profitRu || profitEn) && (
                <div className='profit'>
                  <div>{lang === 'ru' ? profitRu : profitEn}</div>
                </div>
              )}
              {(titleRu2 || titleEn2) && <div className='title'>{lang === 'ru' ? titleRu2 : titleEn2}</div>}

              <ProductToCart lang={lang} productId={productId} variantKey={variantKey} />
            </div>
          ))}
        </div>
      </div>
      <div className='right'>
        <img className='img767 display767' src={imageUrl || '/images/product-default.png'} alt='' />

        <h1>{lang === 'ru' ? titleRu : titleEn}</h1>

        <article className='ql-editor' dangerouslySetInnerHTML={{ __html: lang === 'ru' ? contentRu : contentEn }} />
      </div>

      <style jsx>{
        /* language=CSS */ `
          section {
            display: flex;
            flex-direction: column-reverse;
          }
          @media screen and (min-width: 768px) {
            section {
              flex-direction: row;
            }
            .left {
              padding-right: 20px;
            }
          }

          .img767 {
            display: block;
            margin: 10px auto;
            width: 120px;
            height: 120px;
            box-shadow: 0 0 4px 2px hsla(0, 0%, 100%, 0.5), 0 0 0 4px hsl(180, 90%, 30%);
          }

          .img768 {
            margin: 10px;
            width: 250px;
            height: 250px;
            box-shadow: 0 0 10px 5px hsla(0, 0%, 100%, 0.5), 0 0 0 10px hsl(180, 90%, 30%);
          }

          .variant {
            width: 270px;
            background: white;
            margin: 20px 0;
            box-shadow: 0 0 2px 0 hsl(180, 90%, 30%);
          }

          .profit {
            padding: 8px 8px 0 8px;
          }

          .title {
            padding: 10px 10px 10px 15px;
            text-align: center;
          }

          h1 {
            background: -webkit-linear-gradient(hsl(180, 90%, 50%), hsl(180, 90%, 10%));
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            margin: 0 0 15px 15px;
          }

          .profit div {
            width: 250px;
            background: hsl(150, 100%, 30%);
            color: white;
            text-align: center;
            position: relative;
          }

          .profit div::before,
          .profit div::after {
            content: '';
            position: absolute;
            bottom: 0;
          }

          .profit div::before {
            right: 0;
            border: 12px solid transparent;
            border-right: 12px solid white;
          }

          .profit div::after {
            left: 0;
            border: 12px solid transparent;
            border-left: 12px solid white;
          }
        `
      }</style>
    </section>
  )
}
