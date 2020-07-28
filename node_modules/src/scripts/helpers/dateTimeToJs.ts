// MYSQL DATETIME range from '1000-01-01 00:00:00' to '9999-12-31 23:59:59    2020-03-21 04:45:18.689315
// в MySQL месяцы с 01 по 12
// в JS месяцы с 0 по 11
type DateTimeToJs = (dateTime: string) => Date

export const dateTimeToJs: DateTimeToJs = (dateTime = '2017-02-04 11:23:54') =>
  new Date(
    Number(dateTime.slice(0, 4)),
    Number(dateTime.slice(5, 7)) - 1,
    Number(dateTime.slice(8, 10)),
    Number(dateTime.slice(11, 13)),
    Number(dateTime.slice(14, 16)),
    Number(dateTime.slice(17, 19))
  )
