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

export { getCurrentDateTime, getCurrentTime, getCurrentDate }
