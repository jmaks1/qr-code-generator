import { QrCode } from './core';
import { isBlank, getActualWidth, getActualScale } from './utils';

/**
 * Update canvas size
 *
 * @param canvas
 * @param size
 */
const setCanvasSize = (canvas, size) => {
    if (isBlank(canvas.style)) canvas.style = {}

    canvas.height = size
    canvas.width = size
    canvas.style.height = size + 'px'
    canvas.style.width = size + 'px'
}

/**
 * Return canvas
 */
const getCanvasElement = (): HTMLCanvasElement => {
    try {
        return document.createElement('canvas')
    } catch (e) {
        throw new Error('You need to specify a canvas element')
    }
}

/**
 * Draws the given QR Code, with the given module scale and border modules, onto the given HTML
 * canvas element. The canvas's width and height is resized to (qr.size + border * 2) * scale.
 * The drawn image is purely dark and light, and fully opaque.
 * The scale must be a positive integer and the border must be a non-negative integer.
 *
 * @param qr
 * @param margin
 * @param width
 * @param scale
 * @param backgroundColorHex
 * @param codeColorHex
 */
export const drawCanvas = (qr: QrCode, margin, width, scale, backgroundColorHex, codeColorHex) => {
    const actualWidth = getActualWidth(qr.size, margin, width, scale)
    const actualScale = getActualScale(qr.size, margin, width, scale)
    const canvas = getCanvasElement();

    setCanvasSize(canvas, actualWidth)

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    for (let y = -margin; y < qr.size + margin; y++) {
        for (let x = -margin; x < qr.size + margin; x++) {
            const posX = (x + margin) * actualScale
            const posY = (y + margin) * actualScale

            ctx.fillStyle = qr.getModule(x, y) ? codeColorHex : backgroundColorHex;
            ctx.fillRect(posX, posY, actualScale, actualScale);
        }
    }

    return canvas
}
