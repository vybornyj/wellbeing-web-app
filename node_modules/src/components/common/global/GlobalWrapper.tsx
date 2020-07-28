import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'reactn'
import { GlobalAlertPopup } from 'src/components/common/global/GlobalAlertPopup'

export const GlobalWrapper: FunctionComponent = ({ children }) => {
  const STORE_LOAD_USER_SESSION = useDispatch('STORE_LOAD_USER_SESSION')

  useEffect(() => {
    STORE_LOAD_USER_SESSION()
    window.onfocus = () => STORE_LOAD_USER_SESSION()
  }, [])

  return (
    <>
      {children}
      <GlobalAlertPopup />

      <style jsx global>{
        /* language=CSS */ `
          #__background {
            position: fixed;
            z-index: -1;
            top: -100px;
            right: 0;
            bottom: -100px;
            left: 0;
          }

          /* MY VARIABLES ------------------------------------------------------------------------- */
          :root {
            --app-transition: 0.15s all ease-out;
          }

          /* MY GLOBAL STYLES --------------------------------------------------------------------- */
          :focus {
            outline: none;
          }

          html {
            user-select: none;
            color: black;
          }

          body {
            margin: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden scroll;
          }

          article {
            display: inline;
          }

          img {
            pointer-events: none;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          a:hover {
            color: inherit;
          }

          hr {
            border-width: 1px 0 0 0;
            border-color: gray;
            border-style: solid;
            margin: 20px 0;
          }

          p {
            padding: 18px 0;
            margin: 0;
          }

          /* MY HELPERS --------------------------------------------------------------------------- */
          .space20 {
            height: 20px;
          }

          .space30 {
            height: 30px;
          }

          .space40 {
            height: 40px;
          }

          .center {
            text-align: center;
          }

          .column {
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            flex-direction: row;
          }

          .column767row768,
          .column1023row1024 {
            display: flex;
            flex-direction: column;
          }

          @media screen and (min-width: 768px) {
            .column767row768 {
              flex-direction: row;
            }
          }

          @media screen and (min-width: 1024px) {
            .column1023row1024 {
              flex-direction: row;
            }
          }

          .display768 {
            display: none;
          }

          @media screen and (min-width: 768px) {
            .display768 {
              display: block;
            }
          }

          @media screen and (min-width: 768px) {
            .display767 {
              display: none;
            }
          }

          /* QUILL TYPOGRAPHY --------------------------------------------------------------------- */
          .ql-toolbar,
          .ql-container {
            background: white;
          }

          article.ql-editor {
            white-space: initial;
          }

          .ql-editor > * {
            padding-top: 5px !important;
            padding-bottom: 5px !important;
            cursor: default;
          }

          article.ql-editor > * {
            margin-top: 5px;
            margin-bottom: 5px;
            cursor: default;
          }

          a article.ql-editor > * {
            cursor: pointer;
          }

          article.ql-editor a {
            text-decoration: underline;
          }

          article.ql-editor blockquote {
            border-left: 4px solid #ccc;
            padding-left: 16px;
          }

          .ql-editor img {
            float: left;
            margin: 16px 16px 16px 0;
          }

          .ql-editor .ql-align-center img {
            float: none;
            margin: 16px;
          }

          .ql-editor .ql-align-right img {
            float: right;
            margin: 16px 0 16px 16px;
          }

          @media screen and (max-width: 1023px) {
            .ql-editor img {
              max-width: 45vw !important;
            }

            .ql-editor .ql-align-center img {
              max-width: 100% !important;
            }

            .ql-editor .ql-align-right img {
              max-width: 45vw !important;
            }
          }

          .ql-editor iframe {
            width: 100%;
            height: 360px;
            max-width: 640px !important;
            margin: 10px auto !important;
          }
        `
      }</style>
    </>
  )
}
