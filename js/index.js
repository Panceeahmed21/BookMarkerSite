var siteName = document.querySelector("#siteName")
var siteURL = document.querySelector("#siteURL")
var submitBtn = document.querySelector("button")

submitBtn.addEventListener("click", function () {
    addBook();
})
var bookKey = "BookKey";

var BooksList = [];
if (localStorage.getItem(bookKey) != null) {
    BooksList = JSON.parse(localStorage.getItem(bookKey));
    displayBooks(BooksList)
}
function addBook() {
    if (validateNameInput() == true && validateName() == true && validateURLInput()==true ) {
        var books = {
            name: siteName.value,
            url: siteURL.value
        }
        BooksList.push(books);
        localStorage.setItem(bookKey, JSON.stringify(BooksList))
        displayBooks(BooksList)
        clearForm()
    }


}
function displayBooks(BooksList) {
    var cartona = "";
    for (var i = 0; i < BooksList.length; i++) {
        cartona += `
        <tr>
        <td >${BooksList[i].name}</td>
        <td >${BooksList[i].url}</td>
        <td>  <a href="${BooksList[i].url}" target="_blank"> <button class="btn btn-warning">Visit</button></a> </td>
        <td> <button class="btn btn-danger" onclick="deleteBook(${i})" >delete</button></td>
      </tr>
        `
    }
    document.getElementById("tbody").innerHTML = cartona
}
function clearForm() {
    siteName.value = ""
    siteURL.value = ""
}

function deleteBook(index) {
    BooksList.splice(index, 1)
    localStorage.setItem(bookKey, JSON.stringify(BooksList))
    displayBooks(BooksList)
}



function validateName() {
    var regex = /^[A-Z]([a-z ])*$/gm
    if (regex.test(siteName.value) == true) {
        document.getElementById("wrongName").classList.add("d-none")
        siteName.style.border = "none"
        return true
    }
    else {
        document.getElementById("wrongName").classList.remove("d-none")
        siteName.style.border = "2px solid red"
        return false
    }
}

var emptyInput1 = document.getElementById("emptyinput1")
var emptyInput2 = document.getElementById("emptyinput2")

function validateNameInput() {
    var regex = /^[a-zA-Z0-9 ]+$/gm
    if (regex.test(siteName.value) != " ") {
        siteName.style.border = "none"
        emptyInput1.classList.add("d-none");
        return true
    }
    else {
        siteName.style.border="2px solid red";
        emptyInput1.classList.remove("d-none");
        return false
    }
}
function validateURLInput (){
    var regex = /^[a-zA-Z0-9:\.\/_-]+$/gmi
    if (regex.test(siteURL.value) != "") {
        siteURL.style.border = "none"
        emptyInput2.classList.add("d-none");
        return true
    }
    else {
        siteURL.style.border = "2px solid red";
        emptyInput2.classList.remove("d-none");
        return false
    }
}