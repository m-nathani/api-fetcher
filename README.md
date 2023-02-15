## API FETCHER

A script in node, that extracts api called in all of the UMAI.

### How it works ?

Basically it goes through every file in the src and looks for searchTerms as mentioned below and then store the line until the functions ends.

```js
const searchTerms = [
  "this.create(",
  "this.update(",
  "this.fetch(",
  "this.patch(",
  "this.remove(",
  "request(",
  "this.create<",
  "this.update<",
  "this.fetch<",
  "this.patch<",
  "this.remove<",
  "request<",
];
```

### How to use it ?

clone the repo and run

```bash
node api.js <directory to src> <output.json>
```

### Example output

The result will be extracted using the following command

```
node api.js ../calendar/src/ calendar.json
```

expected output in `json` format

```json
[
  {
    "filePath": "../calendar/src/api/reservation-calendar-service.js",
    "rootPath": "",
    "functionsFound": [
      {
        "line": 11,
        "text": "request(`/partner/v2/calendar?start_date=${startingYear}-${startingMonth}&end_date=${endingYear}-${endingMonth}`);"
      }
    ]
  }
]
```

### NOTE

#### **Loyalty** 
application already has all the endpoints compiled in a file (`src/api/endpoints.js`), so no need to use the script on it.

####**Team management** 
haven't yet found a way to parse this app, it uses redux-toolkit RKT, so need to work on it
