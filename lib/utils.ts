import { Ecc } from './core';

const isBlank = (value) => typeof value === 'undefined' || value === null;

const present = (value) => !isBlank(value);

const hex2rgba = (hex) => {
    if (isBlank(hex)) throw new Error('Color should be defined')
    if (typeof hex === 'number') hex = hex.toString()
    if (typeof hex !== 'string') throw new Error('Color should be defined as hex string')

    let hexCode = hex.slice().replace('#', '').split('')

    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) throw new Error('Invalid hex color: ' + hex)

    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map((c) => [c, c]))
    }

    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F')

    const hexValue = parseInt(hexCode.join(''), 16)

    return {
        r: (hexValue >> 24) & 255,
        g: (hexValue >> 16) & 255,
        b: (hexValue >> 8) & 255,
        alpha: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    }
}

const getOptions = (options) => {
    const { margin = 1, width, scale = 4, backgroundColor = '#ffffffff', codeColor = '#000000ff', errorCorrectionLevel = Ecc.LOW } = options || {}

    if (margin < 0) throw new RangeError('Margin must be non-negative');
    if (scale <= 0) throw new RangeError('Scale must be greater than zero');

    return {
        width,
        margin,
        scale,
        backgroundColor: hex2rgba(backgroundColor),
        codeColor: hex2rgba(codeColor),
        errorCorrectionLevel,
    }
}

const getQrWidth = (qrSize, margin) => (qrSize + margin * 2)

const getActualWidth = (qrSize, margin, width, scale) => {
    const qrWidth = getQrWidth(qrSize, margin) * scale

    return (present(width) && width >= qrWidth) ? width : qrWidth
}

const getActualScale = (qrSize, margin, width, scale) => {
    const qrWidth = getQrWidth(qrSize, margin)

    return (present(width) && width >= qrWidth) ? width / qrWidth : scale
}


export { present, isBlank, getOptions, getQrWidth, getActualWidth, getActualScale }