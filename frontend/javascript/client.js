class BooksWebClient{
    constructor(baseurl){
        this._baseurl = baseurl;        
    }
    async getBooks() {
        const url = `${this._baseurl}/books`;
        let response = await fetch(url);
        if (response.ok) {
          // if HTTP-status is 200-299 get the response body
          let json = await response.json();
          console.log(json);
          return json;
        } else {
          throw `"HTTP-Error:  ${response.status}`;
        }
      }
}