type PrettyYmdhm = (date: number | string | Date) => string

export const prettyYmdhm: PrettyYmdhm = date => {
  const d = new Date(date)
  const with0 = n => `${n > 9 ? '' : 0}${n}`
  return `${d.getFullYear()}.${with0(d.getMonth() + 1)}.${with0(d.getDate())} ${with0(d.getHours())}:${with0(d.getMinutes())}`
}
