// document.getElementById("date").innerHTML = new Date().toDateString();

/* fetch("https://api.kanye.rest")
  .then((res) => res.json())
  .then((quote) => {
    quotesDiv.innerHTML += `<p> ${quote.quote} </p>`;
  }); */

async function getBooks() {
  const url = "http://localhost:3000/api/books";
  let response = await fetch(url);
  if (response.ok) {
    // if HTTP-status is 200-299 get the response body
    let json = await response.json();
    console.log(json);
    return json;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateTableData = (table, data, dataKeys) => {
  data.forEach((element) => {
    let row = table.insertRow();
    dataKeys.forEach((key) => {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    });
  });
};

getBooks().then((books) => {
  console.log(books[0]);

  let table = document.getElementById("booksTable");
  let dataKeys = ["author", "title", "yearPublished", "publisher", "summary"];
  generateTableData(table, books, dataKeys);
  generateTableHead(table, dataKeys);
});

let modal = document.getElementById("booksModal");
let content = document.getElementById("booksModalContent");

const openModal = () => {
  //display modal window and its content
  modal.classList.add("show");
  content.classList.add("show");

  // close modal when the user clicks anywhere outside of the modal or press Escape key
  window.addEventListener("click", outsideModalClickListener);
  window.addEventListener("keydown", escapeKeyListener);
};

const closeModal = () => {
  modal.classList.remove("show");
  content.classList.remove("show");
  window.removeEventListener("click", outsideModalClickListener);
  window.removeEventListener("keydown", escapeKeyListener);
};

const outsideModalClickListener = (event) => {
  if (event.target == modal) {
    closeModal();
  }
};

const escapeKeyListener = (event) => {
  if (event.key == "Escape") {
    closeModal();
  }
};
