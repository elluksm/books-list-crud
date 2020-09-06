class BooksApp {
  constructor() {
    this.books = [];
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

    this.client = new BooksWebClient("http://localhost:3000/api");

    this.tableContainer = document.getElementById("booksList");
    this.table = new Table(
      this.tableContainer,
      this.dataKeys,
      this.tableHeadings
    );

    this.newBookButton = document.getElementById("newBookButton");
    this.newBookButton.addEventListener("click", () => this.openBookForm());

    //check if bookId is passed in url pathname
    let bookId = null;
    const url = new URL(window.location.href);
    if (url.pathname.length > 1) {
      const pathpart = url.pathname.split("/");
      bookId = pathpart[1];
    }

    //Load books and show books list
    this.renderBooksList(bookId);
  }

  renderBooksList = (openBookId) => {
    this.client.getBooks().then((books) => {
      this.table.renderTable(books);

      //add event listeners for Edit buttons
      Array.from(document.getElementsByClassName("button__edit")).forEach(
        (element) => {
          element.addEventListener("click", this.editBookListener);
        }
      );

      this.books = books;

      //If book ID is passed by passing it through url path, then open modal for corresponding book in edit mode
      if (openBookId) {
        this.displayEditBookForm(openBookId);
      }
    });
  };

  editBookListener = (event) => {
    const id = event.target.getAttribute("data-id");
    history.pushState({ id: id }, "", `/${id}`);
    this.displayEditBookForm(id);
  };

  getBook = (bookId) => {
    const item = this.books.find((item) => item._id === bookId);
    return item;
  };

  displayEditBookForm = (bookId) => {
    this.openBookForm();
    const book = this.getBook(bookId);
    if (book) {
      this.dataKeys.forEach((key) => {
        document.getElementById(`${key}Input`).value = book[key];
      });
    }
    this.form.setAttribute("data-id", bookId);

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
    //change url back to default without bookId
    history.pushState({}, "", "/");

    //clear all form values
    this.clearFormValues();

    //hide modal window
    this.modalContainer.classList.remove("show");
    this.modalContent.classList.remove("show");

    //remove all event listeners
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

  closeButtonListener = () => {
    this.closeModal();
  };

  submitFormListener = (event) => {
    this.submitBookForm(event);
  };

  submitBookForm = (e) => {
    e.preventDefault();
    const bookId = e.target.getAttribute("data-id");

    if (bookId) {
      //update existing book
      const updatedBook = this.getFormValues();
      this.client.updateBook(bookId, updatedBook).then(() => {
        console.log("Book edited: " + bookId);
        this.renderBooksList();
      });
    } else {
      //create new book
      const newBook = this.getFormValues();
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

  deleteBook = () => {
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
      const inputElement = document.getElementById(`${key}Input`);
      if (inputElement.type === "number") {
        book[key] = parseInt(inputElement.value);
      } else {
        book[key] = inputElement.value;
      }
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
