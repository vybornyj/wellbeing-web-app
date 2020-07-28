type Space = (height: number, background: string) => string

export const space: Space = (height, background) =>
  `<tr>
    <td>
     <table bgcolor='${background}' width='100%' cellpadding='0' cellspacing='0' border='0' style='border-collapse:collapse'>
       <tbody>
         <tr>
           <td height='${height}' style='font-size:1px;line-height:1px'>&nbsp;</td>
         </tr>
       </tbody>
     </table>
    </td>
  </tr>`

type MailHtmlBase = (inner: string, lang: lang) => string

export const mailHtmlBase: MailHtmlBase = (inner, lang) => {
  const background = '#f7f7f7'
  const title = lang === 'ru' ? 'Исследовательский проект Благополучие' : 'Wellbeing Research Project'
  const rights = lang === 'ru' ? 'Все права защищены' : 'All rights reserved'
  const year = new Date().getFullYear()

  return `
<table bgcolor='${background}' width='100%' cellpadding='0' cellspacing='0' border='0' style='border-collapse:collapse; font-family: Verdana, Geneva, sans-serif;'>
  <tbody>
    <tr>
      <td>

        <table bgcolor='${background}' cellpadding='0' cellspacing='0' border='0' width='600' style='margin:0px auto;border-collapse:collapse'>
          <tbody>

            ${space(30, background)}

            <tr>
              <td align='center'>
                <div>
                  <img width='60' height='60' border='0' alt='Logo' style='display:block;border:none;outline:none;text-decoration:none' src='https://static.wellbeing-research.ru/mail/wellbeing-logo-120.png'>
                </div>
              </td>
            </tr>

            ${space(30, background)}

            <tr>
              <td>
                <table bgcolor='#ffffff' width='100%' cellpadding='0' cellspacing='0' border='0' style='border-collapse:collapse'>
                  <tbody>
                    <tr>
                      <td>


                        <table bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' width='500' style='margin:0px auto;border-collapse:collapse'>
                          <tbody>

                            ${space(20, '#ffffff')}

                            <tr>
                              <td style='color:#000000;font-weight:normal;'>
                                <div>
                                  ${inner}
                                </div>
                              </td>
                            </tr>

                            ${space(20, '#ffffff')}

                          </tbody>
                        </table>


                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            ${space(30, background)}

            <tr>
              <td style='font-size:12px;color:#808080;font-weight:normal;text-align:center;'>
                <div>
                  <p>Copyright © ${year} ${title}</p>
                  <p>${rights}</p>
                </div>
              </td>
            </tr>

            ${space(30, background)}

          </tbody>
        </table>

      </td>
    </tr>
  </tbody>
</table>
`
}
