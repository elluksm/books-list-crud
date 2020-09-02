## Generator used:

[https://www.json-generator.com/#]


## Settings:
```
[
  '{{repeat(250, 300)}}',
  {
    
    _id: '{{objectId()}}',
    title: '{{lorem(1, "sentences")}}',
    price: '{{floating(1000, 4000, 2, "$0,0.00")}}',    
    yearPublished: '{{integer(1899, 2021)}}',
    publisher: '{{company().toUpperCase()}}',               
    summary: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
	  author: '{{firstName()}} {{surname()}}',
    
  }
]
```