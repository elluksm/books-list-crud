class Table{
    constructor(table){
        this._table = table;
    }
    
    generateTableHead = (data) => {
    let thead = this._table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  };
  
  generateTableData = (data, dataKeys) => {
    data.forEach((element) => {
      let row = this._table.insertRow();
      dataKeys.forEach((key) => {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      });
    });
  };
  
}