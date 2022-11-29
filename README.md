# awesome-qr-code-generator


> Simple QR code generator. Output Svg & Png

## Installation
For install [npm package](https://www.npmjs.com/package/awesome-qr-code-generator) inside your project folder do:

```shell
npm install --save awesome-qr-code-generator
```

### ES6/ES7
`awesome-qr-code-generator` can be used in browser through module bundlers like [Browserify](https://github.com/substack/node-browserify) and [Webpack](https://github.com/webpack/webpack)

```javascript
import { toDataURL, toSvgString } from 'awesome-qr-code-generator';

const svgString = toSvgString(text);
const pngBase64 = toDataURL(text);
```

<br>

### API

#### `toSvgString(text, [options])`
#### `toDataURL(text, [options])`
<br>

##### `text`
Type: `String|Array`

Text to encode or a list of objects describing segments.

##### `options`

Optional

<br>

#### QR Code options

##### `margin`
Type: `Number`<br>
Default: `1`

Define how much wide the quiet zone should be.

##### `scale`
Type: `Number`<br>
Default: `20`

Scale factor. A value of `1` means 1px per modules (black dots). Affects only the quality of PNG

##### `codeColor`
Type: `String`<br>
Default: `#000000ff`

Color of qr code. Value must be in hex format (RGBA).<br>

##### `backgroundColor`
Type: `String`<br>
Default: `#ffffffff`

Background Color. Value must be in hex format (RGBA).<br>