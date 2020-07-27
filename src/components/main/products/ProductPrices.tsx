import { FunctionComponent } from 'react'

interface Props {
  price: string
  currency?: Currency
}

export const ProductPrices: FunctionComponent<Props> = ({ price, currency }) => {
  const usd = (Number(price) * currency.rates.USD).toFixed()
  const rub = Number(((Number(price) * currency.rates.RUB) / 50).toFixed()) * 50
  return (
    <div className='prices'>
      <div className='price main'>{price} EUR</div>
      <div className='price'>≈ {usd} USD</div>
      <div className='price'>≈ {rub} RUB</div>
      <style jsx>{
        /* language=CSS */ `
          .prices {
            display: flex;
            justify-content: space-around;
            padding: 4px 0;
            color: white;
            background: linear-gradient(60deg, hsl(210, 90%, 30%), hsl(180, 90%, 30%));
          }

          .price {
            padding-top: 2px;
          }

          .price.main {
            padding: 2px 8px;
            margin: 0;
            border-radius: 12px;
            box-shadow: 0 0 3px 0 white;
            background: hsla(0, 0%, 0%, 0.2);
          }
        `
      }</style>
    </div>
  )
}
