import DateDiff from 'date-diff'

function _splitDate (dt) {
  if (!dt.getDate) {
    return {
      date: '',
      month: '',
      year: ''
    }
  }
  return {
    date: dt.getDate(),
    month: dt.getMonth(),
    year: dt.getFullYear()
  }
}

export function diffDays (d1, d2) {
  const diff = new DateDiff(d1, d2)
  return diff.days()
}

export function compareDateOnly (dt1, dt2) {
  const { date: dt1Date, month: dt1Month, year: dt1Year } = _splitDate(dt1)
  const { date: dt2Date, month: dt2Month, year: dt2Year } = _splitDate(dt2)
  // const dt1Date = dt1.getDate();
  // const dt1Month = dt1.getMonth();
  // const dt1Year = dt1.getFullYear();
  // const dt2Date = dt2.getDate();
  // const dt2Month = dt2.getMonth();
  // const dt2Year = dt2.getFullYear();
  const isEqual =
    dt1Date === dt2Date && dt1Month === dt2Month && dt1Year === dt2Year
  return isEqual
}

export function gtDateOnly (dt1, dt2) {
  const { date: dt1Date, month: dt1Month, year: dt1Year } = _splitDate(dt1)
  const { date: dt2Date, month: dt2Month, year: dt2Year } = _splitDate(dt2)
  if (dt1Year > dt2Year) {
    return true
  }
  if (dt1Month > dt2Month) {
    return true
  }
  return dt1Date > dt2Date
}

export function gteDateOnly (dt1, dt2) {
  const { date: dt1Date, month: dt1Month, year: dt1Year } = _splitDate(dt1)
  const { date: dt2Date, month: dt2Month, year: dt2Year } = _splitDate(dt2)
  if (dt1Year >= dt2Year) {
    return true
  }
  if (dt1Month >= dt2Month) {
    return true
  }
  return dt1Date >= dt2Date
}

export function isNotPast (dt) {
  const fullDate = new Date()
  function removeTime (d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }
  const today = removeTime(fullDate)
  return gteDateOnly(dt, today)
}

export function dateReviver (key, value) {
  function isDate () {
    const regDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    return regDate.test(value)
  }

  if (isDate()) {
    return new Date(value)
  }
  return value
}
export function withDates (obj) {
  return JSON.parse(JSON.stringify(obj), dateReviver)
}

export function getDateRangeString (arriveDate, departDate) {
  const arriveMonth = arriveDate
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(arriveDate)
    : ''
  const arriveDay = arriveDate
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(arriveDate)
    : ''
  const arriveYear = arriveDate
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(arriveDate)
    : ''
  const departMonth = departDate
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(departDate)
    : ''
  const departDay = departDate
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(departDate)
    : ''
  const departYear = departDate
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(departDate)
    : ''

  const dateRangeString =
    arriveYear === departYear
      ? `${arriveMonth} ${arriveDay} - ${departMonth} ${departDay} ${departYear}`
      : `${arriveMonth} ${arriveDay} ${arriveYear} - ${departMonth} ${departDay} ${departYear}`

  return dateRangeString
}
