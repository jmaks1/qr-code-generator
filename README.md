# qr-code-generator


> QR code generator.

## Installation
Inside your project folder do:

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
Default: `4`

Scale factor. A value of `1` means 1px per modules (black dots).

##### `width`
Type: `Number`<br>

Forces a specific width for the output image.<br>
If width is too small to contain the qr symbol, this option will be ignored.<br>
Takes precedence over `scale`.

##### `codeColor`
Type: `String`<br>
Default: `#000000ff`

Color of qr code. Value must be in hex format (RGBA).<br>

##### `backgroundColor`
Type: `String`<br>
Default: `#ffffffff`

Background Color. Value must be in hex format (RGBA).<br>