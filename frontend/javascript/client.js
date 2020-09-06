class BooksWebClient {
  constructor(baseurl) {
    this._baseurl = baseurl;
  }

  async getBooks() {
    const url = `${this._baseurl}/books`;
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299 get the response body
      let books = await response.json();
      return books;
    } else {
      throw `"HTTP-Error:  ${response.status}`;
    }
  }

  async createBook(book) {
    const url = `${this._baseurl}/books`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw `"HTTP-Error:  ${response.status}`;
    }
  }

  async updateBook(bookId, book) {
    const url = `${this._baseurl}/books/${bookId}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw `"HTTP-Error:  ${response.status}`;
    }
  }

  async deleteBook(bookId) {
    const url = `${this._baseurl}/books/${bookId}`;
    let response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw `"HTTP-Error:  ${response.status}`;
    }
  }
}
