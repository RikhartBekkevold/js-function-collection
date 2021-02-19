/**
 * Creates string representing a date which is
 * formatted based on the config arguments passed.
 * Set monthAsText to true to avoid ambiguity
 * between AM or military time.
 */
function formatDate(date, type, withTime, includeDay, monthAsText, longNames) {
  var type = type || "en"
  var today = date || new Date()
  var day = today.getDate()
  var month = monthAsText ? getMonth(today.getMonth(), type === "no", !longNames) : today.getMonth() + 1
  var year = today.getFullYear()

  return type === "am" ?
    (includeDay ? getDay(today.getDay(), null, !longNames) + " " : "") +
    (withTime ? to12hourTime(today) + " " : "") +
    month + "/" + day + "/" + year
    :
    (includeDay ? getDay(today.getDay(), type === "no", !longNames) + " " : "") +
    (withTime ? padTime(today) + " " : "") +
    day + "/" + month + "/" + year
}



/**
 * Simplified, function independant version.
 */
function getCurrentDate() {
  var today = new Date()
  var day = today.getDate()
  var month = today.getMonth() + 1
  var year = today.getFullYear()

  var date = day + "/" + month + "/"+ year
  return date
}



/**
 * Gets the name of the day based on its position in the week.
 * Maps num to array index which contains day
 * lang/localization/no getDay(new Date().getDay(), true)
 */
function getDay(num, no, shorthand) {
  if (!num) num = new Date().getDay()
  var days = [
    "Sunday", "Monday",
    "Tuesday", "Wedensday",
    "Thursday", "Friday", "Saturday"
  ]
  var daysno = [
    "Søndag", "Mandag",
    "Tirsdag", "Onsdag",
    "Torsdag", "Fredag", "Lørdag",
  ]
  return no ?
  shorthand ? daysno[num].slice(0, 3) : daysno[num] :
  shorthand ? days[num].slice(0, 3) : days[num]
}



/**
 * Gets the name of the month, by when it appears
 * in the year (starting with 0).
 */
function getMonth(num, no, shorthand) {
  if (!num) num = new Date().getMonth()
  var months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ]
  var monthsNO = [
    "Januar", "Februar", "Mars",
    "April", "Mai", "Juni",
    "Juli", "August", "September",
    "Oktober", "November", "Desember"
  ]
  return no ?
    shorthand ? monthsNO[num].slice(0, 3) : monthsNO[num] :
    shorthand ? months[num].slice(0, 3) : months[num]
}



/**
 * Prepends 0 to single digit times (0-9), before
 * returning the time as a formatted string.
 */
function padTime(date) {
  return (
    (date.getHours().toString().length === 1 ?
      "0" + date.getHours() + ":" :
      date.getHours() + ":"
    )
    +
    (date.getMinutes().toString().length === 1 ?
      "0" + date.getMinutes() :
      date.getMinutes()
    )
  )
}



/**
 * Converts from 24 hour to 12 hour timeformat.
 * The formats the time before return.
 */
function to12hourTime(date, noMinutes, nopad, dot) {
  var today = date || new Date()
  var hours = today.getHours()
  var min = today.getMinutes()
  if (hours === 12 || hours === 0) hours += 12 // force 00.00 -> 12 and 24.00 -> 12

  return (hours > 12 && hours <= 24) ?
    ((hours - 12).toString().length === 1 ? ("0" + (hours - 12).toString() + ":") : (hours - 12 + ":")) +
    (min.toString().length === 1 ? ("0" + min.toString() + "pm") : ( min.toString() + "pm"))
    :
    (hours.toString().length === 1 ? ("0" + hours + ":") : (hours + ":")) +
    (min.toString().length === 1   ? ("0" + min.toString() + "am") : (min.toString() + "am"))
}



/**
 * Calculates the current age of a person born the given year.
 * Wrong if user clock is wrong. Allow skip min/sec/hour in future.
 * Allow strings not nums, and dates? default values.
 */
function getCurrentAge(month, day, year, hour, min, sec) {
 var bd = new Date(`${month} ${day}, ${year} ${hour}:${min}:${sec}`)
 var now =  new Date()
 var years_old = now.getFullYear() - bd.getFullYear()
 var months_diff = now.getMonth() - bd.getMonth()

 if (months_diff === 0) {
   var days_diff = now.getDate() - bd.getDate()
   if (days_diff < 0) {
     years_old -= 1
   }
   else if (days_diff === 0) {
     var hours_diff = now.getHours() - bd.getHours()
     if (hours_diff === 0) {
       var min_diff = now.getMinutes() - bd.getMinutes()
       if (min_diff < 0 ) {
         years_old -= 1
       }
       else if (min_diff === 0) {
         var sec_diff = now.getSeconds() - bd.getSeconds()
         if (sec_diff < 0) {
           years_old -= 1
         }
         else if (sec_diff === 0) {
           return years_old
         }
       }
     }
     else if (hours_diff < 0) {
       years_old -= 1
     }
   }
 }
 else if (months_diff < 0) {
   years_old -= 1
 }

 return years_old
}
