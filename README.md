# SwiftSell JavaScript SDK

This SDK aims to help the development of integrations with
[SwiftSell](https://www.SwiftSell.shop) that use JavaScript, providing an easy
interface to communicate with
[SwiftSell's REST API](https://api.SwiftSell.shop/docs/).
The SDK is compatible with Browser, CommonJS and ECMA.

## Requirements

To use this SDK, you will need:

- [Node.js **v6.3.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Bundling

This uses webpack to bundle in order to make it compatible for browsers, with commonJS and AMD - <https://webpack.js.org/guides/author-libraries/>

## Installation

### Node.js

`npm install npm i @anietz/swiftsell-js-sdk`

`import SwiftSell from '@anietz/swiftsell-js-sdk';`

### Build

`npm run build`

### Browser

Reference the `bundle.js` file in the package `dist` folder.

`<script src="dist/bundle.js"></script>`

```js
const swiftsellInstance = new SDK.SwiftSellSDK("EKDWMKPWMGECABJZLGSL", "https://api.swiftsell.shop/api");
const cartItems = await d.getCartItems('cart-89ea1d2-094dcc-8105-67ed90bf155b');
```

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises),
making it easier to handle the asynchronous requests made to the API. The SDK
provides a `SwiftSell` object containing several methods which map to the
calls and parameters described in
[SwiftSell's API documentation](http://api.swiftSell.shop/docs).

Before executing any request, you need to authorize the calls to the API:

#### Using API key

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

### Forms

- `processEmailSubscriptionForm()`
- `processContactUsForm()`

### Authentication

- `login()`
- `register()`

### Config

- `getSiteConfig()`
