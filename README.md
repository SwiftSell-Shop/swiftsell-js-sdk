# SwiftSell JavaScript SDK

This SDK aims to help the development of integrations with
[SwiftSell](https://www.SwiftSell.shop) that use JavaScript, providing an easy
interface to communicate with
[SwiftSell's REST API](https://api.SwiftSell.shop/docs/).

## Requirements

To use this SDK, you will need:

- [Node.js **v6.3.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Installation

### Node.js

`npm install npm i @anietz/swiftsell-js-sdk`

`import SwiftSell from '@anietz/swiftsell-js-sdk';`

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises),
making it easier to handle the asynchronous requests made to the API. The SDK
provides a `SwiftSell` object containing several methods which map to the
calls and parameters described in
[SwiftSell's API documentation](http://api.swiftSell.shop/docs).

Before executing any request, you need to authorize the calls to the API:

#### Using a permanent token

```js
const swiftSellSDK = new SwiftSell("ETEYDGGDGDJDJDJDJDD", "https//api.swiftSell.shop");
```

#### Making requests

You can now use the various methods from the SDK to fetch media, metaproperties
and other data. Following the Promises notation, you should use
`.then()`/`.catch()` to handle the successful and failed requests,
respectively.

Most of the calls take an object as the only parameter but please refer to the
API documentation to tune the query as intended.

```js
SwiftSell
  .getCart("cart-id")
  .then(data => {
    //Cart Info
  })
  .catch(error => {
    // TODO Handle the error
  });
```

## Available methods

### Cart

- `addToCart()`
- `removeFromCart()`
- `getCartItems()`
- `createOrderWithoutAuth()`

### Products

- `getProducts(queryObject)`
- `getSingleProduct()`

### Authentication

- `login()`
- `register()`

### Config

- `getSiteConfig()`
