describe("Table class", () => {
  const { JSDOM } = require("jsdom");
  const { Table } = require("../javascript/table");

  let dom, testDiv, tableContainer, table;

  const dataKeys = ["test_1", "test_2", "test_3"];
  const tableHeadings = ["Heading-1", "Heading-2", "Heading-3"];
  const mockData_1 = [
    {
      _id: "f4",
      test_1: "Laborum deserunt consequat nostrud dolor laborum et sit.",
      test_2: "ETERNIS",
      test_3: "Claudine Wall",
    },
    {
      _id: "5f",
      test_1: "Anim eu occaecat in esse ullamco quis non laboris elit anim.",
      test_2: "SULTRAX",
      test_3: "Mccarthy Soto",
    },
  ];

  const mockData_2 = [
    {
      _id: "5f4523",
      test_1: "Consequat nostrud dolor et sit.",
      test_2: "ETERNIS",
      test_3: "Claudine Wall",
    },
    {
      _id: "5f4d5032",
      test_1: "Anim eu occaecat in esse ullamco quis non laboris elit anim.",
      test_2: "PEARLESSA",
      test_3: "Mccarthy Soto",
    },
    {
      _id: "5f032",
      test_1: "Anim eu occaecat in esse ullamco quis non laboris elit anim.",
      test_2: "POSHOME",
      test_3: "Camille Fischer",
    },
    {
      _id: "5f432",
      test_1: "Anim eu occaecat in esse ullamco quis non laboris elit anim.",
      test_2: "SULTRAX",
      test_3: "Kristina Good",
    },
  ];

  beforeEach(() => {
    dom = new JSDOM(
      '<html><head></head><body><div id="testDiv"><</div></body></html>'
    );
    global.document = dom.window.document;

    testDiv = dom.window.document.getElementById("testDiv");
    tableContainer = dom.window.document.createElement("table");
    testDiv.appendChild(tableContainer);
  });

  describe("When there are 2 data items", () => {
    beforeEach(() => {
      table = new Table(tableContainer, dataKeys, tableHeadings);
      table.renderTable(mockData_1);
    });

    it("should contain one heading row", () => {
      expect(document.querySelectorAll("thead tr").length).toBe(1);
    });

    it("should contain a heading row with 3 headings", () => {
      expect(document.querySelectorAll("thead tr th").length).toBe(3);
    });

    it("should contain correct heading name for first column", () => {
      expect(document.querySelector("thead tr th").innerHTML).toEqual(
        "Heading-1"
      );
    });

    it("should contain 2 data rows", () => {
      expect(document.querySelectorAll("tbody tr").length).toBe(2);
    });

    it("should contain 8 table data elements", () => {
      expect(document.querySelectorAll("tbody tr td").length).toBe(8);
    });

    it("should contain correct value for first data element", () => {
      expect(document.querySelector("tbody tr td").innerHTML).toEqual(
        "Laborum deserunt consequat nostrud dolor laborum et sit."
      );
    });

    it("should contain edit button with correct data-id as the last element of data row", () => {
      expect(
        document.querySelector("tbody tr td:last-child").innerHTML
      ).toEqual('<button data-id="f4" class="button button__edit"></button>');
    });
  });

  describe("When there are 4 data items", () => {
    beforeEach(() => {
      table = new Table(tableContainer, dataKeys, tableHeadings);
      table.renderTable(mockData_2);
    });

    it("should contain a heading row with 3 headings", () => {
      expect(document.querySelectorAll("thead tr th").length).toBe(3);
    });

    it("should contain 4 data rows", () => {
      expect(document.querySelectorAll("tbody tr").length).toBe(4);
    });

    it("should contain 16 table data elements", () => {
      expect(document.querySelectorAll("tbody tr td").length).toBe(16);
    });

    it("should contain correct value for first data element", () => {
      expect(document.querySelector("tbody tr td").innerHTML).toEqual(
        "Consequat nostrud dolor et sit."
      );
    });
  });
});
