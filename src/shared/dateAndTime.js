function getCurrentDateTime() {
  const now = new Date()

  // Get the year, month, and day
  const dateString = getCurrentDate(now)

  //Get Current Time
  const timeString = getCurrentTime(now)
  // Concatenate the date and time parts with the desired format
  const dateTimeString = `${dateString} ${timeString}`

  return dateTimeString
}

function getCurrentTime(now = null) {
  if (now === null) now = new Date()
  // Get the hours, minutes, and seconds
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const timeString = `${hours}:${minutes}:${seconds}`

  return timeString
}

function getCurrentDate(now = null) {
  if (now === null) now = new Date()
  // Get the hours, minutes, and seconds
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const dateString = `${year}-${month}-${day}`

  return dateString
}

function formatDate(date) {
  const options = { month: 'long', day: 'numeric', weekday: 'long' }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function getAllDaysOfMonth(year, month) {
  let daysOfMonth = []
  for (let day = 1; day <= 31; day++) {
    const currentDate = new Date(year, month - 1, day)

    // Check if the date is still in the specified month
    if (currentDate.getMonth() !== month - 1) {
      break
    }
    const formattedDate = formatDate(currentDate)

    const date = {
      date: formattedDate,
      date2: getCurrentDate(currentDate)
    }
    daysOfMonth.push(date)
  }
  return daysOfMonth
}

export { getCurrentDateTime, getCurrentTime, getCurrentDate, getAllDaysOfMonth }
