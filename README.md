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

#### output1
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

#### output2
```json
[
  {
    "filePath": "../webrms/src/apis/notification.js",
    "rootPath": "super(API_ENDPOINT_PARTNER_V2);",
    "functionsFound": [
      {
        "line": 10,
        "text": "this.create('/notifications', data);"
      }
    ]
  },
]
```

here `rootpath` that would define as `super` is basically the constructor function, that would take the following to initialize the root path, 
possible values are 

```
API_ENDPOINT_PARTNER_V3 = 'partner/v3'
API_ENDPOINT_PARTNER_V2 = 'partner/v2'
API_ENDPOINT = ''
```
so the above endpoint would read as `'partner/v2/notifications'`

P.S: any thing else except the above values could be ignored.. unless its hardcoded routes etc.. for any question please contact.


---

### NOTE

#### Url's in variables
> find a way where the url is stored in a variables, currently have to manually in json to replace values of vars from the code  

#### **Loyalty** 
> application already has all the endpoints compiled in a file (`src/api/endpoints.js`), so no need to use the script on it.

#### **Team management** 
> haven't yet found a way to parse this app, it uses redux-toolkit RKT, so need to work on it

