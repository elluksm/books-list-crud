class BooksApp {
  constructor() {
    //Elements
    this.tableContainer = document.getElementById("booksTable");
    this.modalContainer = document.getElementById("booksModal");
    this.modalContent = document.getElementById("booksModalContent");
    this.tableContainer = document.getElementById("booksTable");
    this.newBookButton = document.getElementById("newBookButton");
    this.closeModalButton = document.getElementById("closeModalButton");

    this.dataKeys = [
      "author",
      "title",
      "yearPublished",
      "publisher",
      "summary",
    ];

    this.client = new BooksWebClient("http://localhost:3000/api");
    this.table = new Table(this.tableContainer);

    //Listeners
    this.newBookButton.addEventListener("click", () => this.openModal());
    this.closeModalButton.addEventListener("click", () => this.closeModal());

    //Load books
    this.loadBooks();
  }

  loadBooks() {
    this.client.getBooks().then((books) => {
      console.log(books[0]);

      this.table.generateTableData(books, this.dataKeys);
      this.table.generateTableHead(this.dataKeys);
    });
  }

  openModal() {
    console.log("opening modal....");
    //display modal window and its content
    this.modalContainer.classList.add("show");
    this.modalContent.classList.add("show");

    // close modal when the user clicks anywhere outside of the modal or press Escape key
    window.addEventListener("click", (event) =>
      this.outsideModalClickListener(event)
    );
    window.addEventListener("keydown", (event) =>
      this.escapeKeyListener(event)
    );
  }

  closeModal() {
    this.modalContainer.classList.remove("show");
    this.modalContent.classList.remove("show");
    window.removeEventListener("click", this.outsideModalClickListener);
    window.removeEventListener("keydown", this.escapeKeyListener);
  }

  outsideModalClickListener(event) {
    if (event.target == this.modalContainer) {
      this.closeModal();
    }
  }
  escapeKeyListener(event) {
    if (event.key == "Escape") {
      this.closeModal();
    }
  }
}
