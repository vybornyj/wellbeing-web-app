type GetHtmlContentLength = (html: string) => number

export const getHtmlContentLength: GetHtmlContentLength = html =>
  new DOMParser()?.parseFromString(html, 'text/html')?.documentElement?.textContent?.length
