import { useState } from 'react'
import { useDispatch, useGlobal } from 'reactn'
import { useDidUpdate } from 'src/scripts/hooks/useDidUpdate'

export const GlobalAlertPopup = () => {
  const [storeAlertPopup] = useGlobal('storeAlertPopup')
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const [timeoutID, setTimeoutID] = useState(null)

  useDidUpdate(() => {
    if (timeoutID) clearTimeout(timeoutID)
    const newTimeoutID = setTimeout(() => STORE_SET_ALERT_POPUP(null), 3000)
    setTimeoutID(newTimeoutID)
  }, [storeAlertPopup])

  return (
    <div className={`${!!storeAlertPopup} ${storeAlertPopup?.type ?? ''}`}>
      {storeAlertPopup?.inner ?? ''}
      <style jsx>{
        /* language=CSS */ `
          div {
            font-size: 16px;
            padding: 10px;
            margin: 40px 0 0 25%;
            width: 50%;

            position: fixed;
            left: 0;

            z-index: 10;
            display: inline-flex;
            text-align: center;
            justify-content: center;

            color: white;
            border-radius: 12px;
            transition: var(--app-transition);

            background: linear-gradient(60deg, hsla(150, 70%, 40%, 0.9), hsla(210, 70%, 40%, 0.9));
            box-shadow: 0 0 4px 0 hsl(0, 0%, 40%);
          }

          .warn {
            background: linear-gradient(60deg, hsla(30, 70%, 40%, 0.9), hsla(90, 70%, 40%, 0.9));
          }

          .error {
            background: linear-gradient(60deg, hsla(330, 70%, 40%, 0.9), hsla(30, 70%, 40%, 0.9));
          }

          .info {
            background: linear-gradient(60deg, hsla(210, 70%, 40%, 0.9), hsla(270, 70%, 40%, 0.9));
          }

          .false {
            opacity: 0;
            visibility: hidden;
            top: -60px;
          }

          .true {
            opacity: 1;
            visibility: visible;
            top: 0;
          }
        `
      }</style>
    </div>
  )
}
