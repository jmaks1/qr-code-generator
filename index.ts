import { QrCode } from './lib/core';
import { getOptions, getQrWidth } from './lib/utils';
import { drawCanvas } from './lib/canvas';

type TOptions = {
    margin?: number
    width?: number
    scale?: number
    backgroundColor?: string,
    codeColor?: string,
}

/**
 * Returns a string of data base64
 *
 * @param text
 * @param options
 */
export const toDataURL = (text: string, options: TOptions) => {
    const { margin, width, scale, backgroundColor, codeColor, errorCorrectionLevel } = getOptions(options)

    const qr = QrCode.encodeText(text, errorCorrectionLevel);
    const canvas = drawCanvas(qr, margin, width, scale, backgroundColor.hex, codeColor.hex)

    return canvas.toDataURL('image/png')
}

/**
 * Returns a string of SVG code for an image depicting the given QR Code, with the given number
 * of border modules. The string always uses Unix newlines (\n), regardless of the platform.
 *
 * @param text
 * @param options
 */
export const toSvgString = (text: string, options: TOptions) => {
    const { margin, backgroundColor, codeColor, errorCorrectionLevel } = getOptions(options)

    const qr = QrCode.encodeText(text, errorCorrectionLevel);
    const qrWidth = getQrWidth(qr.size, margin)

    let parts: Array<string> = [];
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y)) parts.push(`M${x + margin},${y + margin}h1v1h-1z`);
        }
    }

    const background = backgroundColor.alpha !== 0 ? `<path fill="${backgroundColor.hex}" d="M0 0h${qrWidth}v${qrWidth}H0z"/>` : ''
    const code = codeColor.alpha !== 0 ? `<path d="${parts.join(" ")}" fill="${codeColor.hex}"/>` : ''

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qrWidth} ${qrWidth}">${background}${code}</svg>`;
}
