
var footer = document.getElementById('footer');

/* Set copyright date before name */

var year = document.createTextNode(new Date().getFullYear());
var showYear = document.createElement("span");
var insertYear = showYear.appendChild(year);

var copyRightName = document.getElementById("copyRightName");

footer.insertBefore(insertYear, copyRightName);

/* Set a last modified date at the end of the landing page */

var newLine = document.createElement("p");

var d = document.lastModified;
var date = new Date(d);
var n = date.toLocaleString();
var showDateText = document.createTextNode("Ce site est en constante évolution, sa dernière modification a eu lieu le : " + n);

var container = footer.appendChild(newLine);

container.appendChild(showDateText);

