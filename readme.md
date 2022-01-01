# JLog `webpack, typescript config`

## 1) Configuration for js bundling

### 1. init project

```
$ yarn init
```

### 2. install webpack

```
$ yarn add -D webpack webpack-cli
```

### 3. Generate webpack config file

```javascript
//webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

### 4. Insert webpack command in `package.json`

```json
//package.json
{
  "name": "jlog",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1"
  },
  "scripts": {
    "build": "webpack"
  }
}
```

### 5. Testing

#### 1. Create test files in /scr/\*

```javascript
//src/index.js
import { add, sub } from "./calc";

console.log(add(1, 2), sub(1, 2));

//src/calc.js
export function add(x, y) {
  return x + y;
}

export function sub(x, y) {
  return x - y;
}
```

#### 2. Run webpack

```
$ yarn webpack
```

#### 3. Check `dist` folder

```javascript
//dist/main.js
(() => {
  "use strict";
  console.log(3, -1);
})();
```

#### 4. Use generated file in html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JLog</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="dist/main.js"></script>
  </body>
</html>
```

## 2) Configuration for html bundling

### 1. Install html webpack plugin

```
$ yarn add html-webpack-plugin
```

### 2. Update `webpack.config.js` file

```js
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

### 3. Run `yarn webpack` again

```
$ yarn webpack

```

### 4. Check `index.html` in dist folder

```html
<!-- dist/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script defer="defer" src="main.js"></script>
  </head>
  <body></body>
</html>
```

```js
//dist/main.js
(() => {
  "use strict";
  console.log(3, -1);
})();
```

> Automatically generated html file does not have the tags that I tried to add, so that we can add template option in `webpack.config.js` file

```js
//webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // this
    }),
  ],
};

```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>JLog</title>
    <script defer="defer" src="main.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="dist/main.js"></script>
  </body>
</html>
```

## 3) Configuration for css bundling

### 1. Install style loader

```
$ yarn add -D style-loader css-loader
```

### 2. Update `webpack.config.js`

```js
//webpack.config.js\
...
module.exports = {
  ...
  output: {
    ...
  },
  module: { //here
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    ...
  ],

};
```

### 3. Generate css file and import it

```css
/* src/index.css */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: crimson;
}
```

```js
//src/index.js
...
import "./index.css";
...
```

> styles were applied by inline style

## Extract css as file

### 1. Install plugin for extract

```
$ yarn add -D mini-css-extract-plugin
```

### 2. Update `webpack.config.js`

```js
...
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //here

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"], //here --> set `MiniCssExtractPlugin.loader` instead of style-loader
      },
    ],
  },
  plugins: [
    ...
    new MiniCssExtractPlugin({ //here
      filename: "common.css",
    }),
  ],
  ...
};

```

### 3. Build again

```
$ yarn build
```

You can see the `common.css` style file in `dist`

## 3. Configuration for file(image) bundling

TBD
https://youtu.be/zal9HVgrMaQ?t=817

### 1. Install `file-loader`

```
$ yarn add -D file-loader
```

### 2. Update `webpack.config.js`

```js
...
 module: {
    rules: [
      ...
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
    ],
  },
...
```

### 3. Test

#### 1. Load image from assets

```js
//index.js
import kbbIcon from "../asset/icon/kbb/KBB3.png";
const img = `<img src="${kbbIcon}" alt='kbbIcon'/>`;
root.innerHTML = img;
```

#### 2. Check image loads properly.

## 4) configuration for clean unused files

To remove unused output, clean is needed

### 1. Install

```
$ yarn add -D clean-webpack-plugin
```

### 2. Update `webpack.config.js`

```js

```

## 5) Development configuration

### 1. Install webpack dev server

```
$ yarn add -D webpack-dev-server
```

### 2. Update `webpack.config.js`

```js
module.exports = {
  ...
  plugins: [
     ...
  ],
  devServer: { //here
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
  },
};

```

### 3. Add script command in `package.json`

```json
//package.json
...
"scripts": {
    "build": "webpack",
    "dev":"webpack serve --open --mode=development" //this
  },
...
```

> --mode=development has to be added for wepack serve

> --mode=production is for production mode so that you can put this mode in `build` command like below

```json
//package.json
...
"scripts": {
    "build": "webpack --mode=production",
    "dev":"webpack serve --open --mode=development" //this
  },
...
```

## 6) Typescript dependencies

### 1. Install typescript modules

```
$ yarn add -D typescript ts-loader
```

### 2. Generate `tsconfig.json`

```json
//tsconfig.json
{
  "compilerOptions": {
    "module": "ES6",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "sourceMap": true
  }
}
```

### 3. Install `babel`

```
$ yarn add -D @babel/core @babel/preset-env babel-loader
```

### 4. Configure in `webpack.config.js`

```js
//webpack.config.js
entry: "./src/index.ts",
...

 module: {
    rules: [
      ...
      {
        test: /[\.js]$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  ...

   resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".js"],
  },
```

### 5. test with ts

#### 1. Generate `index.ts`

```ts
//index.ts
const generateCircle = (size: number, color: string): HTMLElement => {
  const span = document.createElement("span");
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  span.style.borderRadius = `50%`;
  span.style.display = "inline-block";
  span.style.backgroundColor = color;
  return span;
};

const colors: Array<string> = ["red", "green", "blue"];

const root = document.querySelector("#root");

colors.forEach((color) => root.appendChild(generateCircle(50, color)));
```

### 2. Run script

```
$ yarn build
```
