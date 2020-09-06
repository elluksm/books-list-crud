class Table {
  constructor(table, dataKeys, tableHeadings) {
    this._table = table;
    this.dataKeys = dataKeys;
    this.tableHeadings = tableHeadings;
  }

  renderTable = (books) => {
    this._table.innerHTML = "";
    this.generateTableData(books, this.dataKeys);
    this.generateTableHead(this.tableHeadings);
  };

  generateTableHead = (data) => {
    const thead = this._table.createTHead();
    const row = thead.insertRow();
    data.forEach((key) => {
      const th = document.createElement("th");
      const text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    });
  };

  generateTableData = (data, dataKeys) => {
    data.forEach((element) => {
      //add table data for each element
      const row = this._table.insertRow();
      dataKeys.forEach((key) => {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      });

      //add edit button for each element
      const cell = row.insertCell();
      const editButton = document.createElement("button");
      editButton.setAttribute("data-id", element._id);
      editButton.className = "button button__edit";
      editButton.textContent = "";
      cell.appendChild(editButton);
    });
  };
}
