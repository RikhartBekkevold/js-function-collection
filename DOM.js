/**
 * Parent fn (document inherit) vs remove fn of the child.
 */
function deleteAllChildren(node) {
  while (el.lastChild) el.lastChild.remove()
}



/**
 * Deletes all children of a html DOM element.
 */
function deleteAllChildren(el) {
  while (el.lastChild) el.removeChild(el.lastChild)
}



/**
 * Creates a HTMLTableElement.
 */
function createTable(titles, ...data) {
  var table = document.createElement("table")
  var row = document.createElement("tr")
  table.appendChild(row)

  titles.forEach((title) => {
    var th = document.createElement("th")
    th.textContent = title
    row.appendChild(th)
  })

  data.forEach((row) => {
    var trow = document.createElement("tr")
    table.appendChild(trow)
    row.forEach((text) => {
      var th = document.createElement("td")
      th.textContent = text
      trow.appendChild(th)
    })
  })
  return table
}
