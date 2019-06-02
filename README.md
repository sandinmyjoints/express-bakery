# express-bakery

Set cookies via query parameters.
- Convenient -- no mucking around with cookie extensions, just write a url!
- Simple -- no explaining to non-technical users how to install an extension
  and set a cookie, just send them a url like
  <http://example.com?bake:in_experiment:true> and once they visit it, they've
  got the cookie!

## Installation

```sh
$ npm install --save express-bakery
# or
$ yarn add express-bakery
```

## API

```js
const express = require('express');
const app = express();

const bakery = require('express-bakery');
const opts = {
  queryParam: 'bake', // default
  whitelist: ['feature_flag1', 'feature_flag2'],
};

app.use(bakery(opts))
  .get('*', (req, res) => res.sendStatus(201))
  .listen(3000);
```

## Usage

    $ curl -v "http://localhost:3000/?bake=feature_flag1:true,feature_flag2:false,forbidden_feature_flag_3:true"
    < HTTP/1.1 201 Created
    < Set-Cookie: feature_flag1=true; Path=/
    < Set-Cookie: feature_flag2=false; Path=/

### Options

#### queryParam (string)

Default: `bake`

Name of the query parameter to be parsed for cookie names and values.

#### whitelist (array)

Default: `[]`

Names of cookies that the bakery can make.
