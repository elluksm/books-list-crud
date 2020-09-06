class BooksApp {
  constructor() {
    this.tableContainer = document.getElementById("booksList");
    this.newBookButton = document.getElementById("newBookButton");
    this.newBookButton.addEventListener("click", () => this.openBookForm());

    this.dataKeys = [
      "author",
      "title",
      "yearPublished",
      "publisher",
      "summary",
    ];
    this.tableHeadings = [
      "Author",
      "Title",
      "Year",
      "Publisher",
      "Summary",
      "",
    ];
    this.books = [];

    this.client = new BooksWebClient("http://localhost:3000/api");
    this.table = new Table(this.tableContainer);

    //Load and render books list
    this.renderBooksList();
  }

  renderBooksList = () => {
    this.client.getBooks().then((books) => {
      this.tableContainer.innerHTML = "";
      this.table.generateTableData(books, this.dataKeys);
      this.table.generateTableHead(this.tableHeadings);

      //add event listeners for Edit buttons
      Array.from(document.getElementsByClassName("button__edit")).forEach(
        (element) => {
          element.addEventListener("click", (e) => {
            this.displayEditBookForm(element.getAttribute("data-id"));
          });
        }
      );

      this.books = books;
    });
  };

  displayEditBookForm = (id) => {

    // history.pushState({page: 1}, "", '/page2.php')
    this.openBookForm();
    const item = this.books.find((item) => item._id === id);
    if (item) {
      this.dataKeys.forEach((key) => {
        document.getElementById(`${key}Input`).value = item[key];
      });
    }
    this.form.setAttribute("data-id", id);

    this.deleteButton = document.getElementById("deleteBookButton");
    this.deleteButton.style.visibility = "visible";
    this.deleteButton.addEventListener("click", this.deleteBookListener);
  };

  openBookForm = () => {
    this.openModal();
    this.form = document.getElementById("bookForm");
    this.form.addEventListener("submit", this.submitFormListener);

    this.cancelButton = document.getElementById("cancelFormButton");
    this.cancelButton.addEventListener("click", this.closeButtonListener);
  };

  openModal = () => {
    this.modalContainer = document.getElementById("bookFormModal");
    this.modalContent = document.getElementById(
      "bookFormModal"
    ).firstElementChild;
    this.closeModalButton = document.getElementById("closeFormModalButton");

    //display modal window and its content
    this.modalContainer.classList.add("show");
    this.modalContent.classList.add("show");

    // close modal when the user clicks anywhere outside of the modal, press Escape key or Close button
    window.addEventListener("click", this.outsideModalClickListener);
    window.addEventListener("keydown", this.escapeKeyListener);
    this.closeModalButton.addEventListener("click", this.closeButtonListener);
  };

  closeModal = () => {
    this.clearFormValues();
    this.modalContainer.classList.remove("show");
    this.modalContent.classList.remove("show");
    window.removeEventListener("click", this.outsideModalClickListener);
    window.removeEventListener("keydown", this.escapeKeyListener);
    this.closeModalButton.removeEventListener(
      "click",
      this.closeButtonListener
    );
    this.cancelButton.removeEventListener("click", this.closeButtonListener);
    this.form.removeEventListener("submit", this.submitFormListener);
    if (this.deleteButton) {
      this.deleteButton.removeEventListener("click", this.deleteBookListener);
      this.deleteButton.style.visibility = "hidden";
    }
  };

  outsideModalClickListener = (event) => {
    if (event.target == this.modalContainer) {
      this.closeModal();
    }
  };
  escapeKeyListener = (event) => {
    if (event.key == "Escape") {
      this.closeModal();
    }
  };
  closeButtonListener = (event) => {
    this.closeModal();
  };

  submitFormListener = (event) => {
    this.submitBookForm(event);
  };

  submitBookForm = (e) => {
    e.preventDefault();
    const bookId = e.target.getAttribute("data-id");
    if (bookId) {
      let updatedBook = this.getFormValues();
      this.client.updateBook(bookId, updatedBook).then(() => {
        console.log("Book edited: " + bookId);
        this.renderBooksList();
      });
    } else {
      let newBook = this.getFormValues();
      this.client.createBook(newBook).then(() => {
        console.log("New Book Created");
        this.renderBooksList();
      });
    }
    this.closeModal();
  };

  deleteBookListener = (event) => {
    this.deleteBook(event);
  };

  deleteBook = (e) => {
    const bookId = this.form.getAttribute("data-id");
    this.client.deleteBook(bookId).then(() => {
      console.log("Book deleted: " + bookId);
      this.renderBooksList();
    });
    this.closeModal();
  };

  getFormValues = () => {
    let book = {};
    this.dataKeys.forEach((key) => {
      book[key] = document.getElementById(`${key}Input`).value;
    });
    return book;
  };

  clearFormValues = () => {
    this.dataKeys.forEach((key) => {
      document.getElementById(`${key}Input`).value = "";
    });
    this.form.setAttribute("data-id", "");
  };
}
