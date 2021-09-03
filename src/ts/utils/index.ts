import { Attributes } from '../interface/attributes'

/**
 * Sets multiples attributes of an element at once.
 * @param e - The element on which attributes are set.
 * @param attrs - The attributes object with 
 * @returns void
 */
export const setAttributes = (e: HTMLElement, attrs: Attributes): void => {
    for (const key in attrs) {
        e.setAttribute(key, attrs[key])
    }
}