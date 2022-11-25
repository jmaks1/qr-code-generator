import { Ecc } from './core';

const isBlank = (value) => typeof value === 'undefined' || value === null;

const present = (value) => !isBlank(value);

const hex2rgba = (hexA) => {
    if (isBlank(hexA)) throw new Error('Color should be defined')
    if (typeof hexA === 'number') hexA = hexA.toString()
    if (typeof hexA !== 'string') throw new Error('Color should be defined as hex string')

    let hexCode = hexA.slice().replace('#', '').split('')

    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) throw new Error('Invalid hex color: ' + hexA)

    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map((c) => [c, c]))
    }

    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F')

    const hexValue = parseInt(hexCode.join(''), 16)
    const red = (hexValue >> 24) & 255
    const green = (hexValue >> 16) & 255
    const blue = (hexValue >> 8) & 255
    const alpha = hexValue & 255
    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`
    const hex = '#' + hexCode.slice(0, 6).join('')

    return { red, green, blue, alpha, rgba, hex }
}

const getOptions = (options) => {
    const { margin = 1, scale = 20, backgroundColor = '#ffffff00', codeColor = '#000000ff', errorCorrectionLevel = Ecc.MEDIUM } = options || {}

    if (margin < 0) throw new RangeError('Margin must be non-negative');
    if (scale <= 0) throw new RangeError('Scale must be greater than zero');

    return {
        margin,
        scale,
        backgroundColor: hex2rgba(backgroundColor),
        codeColor: hex2rgba(codeColor),
        errorCorrectionLevel,
    }
}

const getQrWidth = (qrSize, margin) => (qrSize + margin * 2)

export { present, isBlank, getOptions, getQrWidth }