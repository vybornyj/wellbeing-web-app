import { FunctionComponent } from 'react'

export const AuthorizationFormLoader: FunctionComponent = () => (
  <div className='loader'>
    <div />
    <div />
    <div />

    <style jsx>{
      /* language=CSS */ `
        .loader {
          width: 100%;
          margin: 70px 0 50px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loader > div {
          width: 20px;
          height: 20px;
          background: hsl(120, 40%, 60%);
          border-radius: 50%;
          margin: 3px;
          animation: loader 0.6s infinite alternate;
        }

        .loader > div:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loader > div:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loader {
          to {
            transform: translate(0, -20px);
            background: hsl(240, 40%, 60%);
          }
        }
      `
    }</style>
  </div>
)
