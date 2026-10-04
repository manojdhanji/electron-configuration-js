// src/engine/lookup.js
// Lookup helpers for elements by atomic number or symbol.

import { ELEMENTS } from "../data/elements.js";

// Build fast lookup maps once at module load.
const BY_NUMBER = new Map();
const BY_SYMBOL = new Map();
const BY_NAME = new Map();

for (const element of ELEMENTS) {
    BY_NUMBER.set(element.atomicNumber, element);
    BY_SYMBOL.set(element.symbol.toUpperCase(), element);
    BY_NAME.set(element.name.toLowerCase(), element);
}

/**
 * Get the full element object by atomic number.
 * @param {number} z - Atomic number
 * @returns {Object | undefined}
 */
export function getElementByNumber(z) {
    return BY_NUMBER.get(z);
}

/**
 * Get the full element object by symbol (case-insensitive).
 * @param {string} symbol
 * @returns {Object | undefined}
 */
export function getElementBySymbol(symbol) {
    if (!symbol) return undefined;
    return BY_SYMBOL.get(symbol.toUpperCase());
}

/**
 * Get the full element object by name.
 * @param {string} name - Element name
 * @returns {Object | undefined}
 */
export function getElementByName(name) {
    return name ? BY_NAME.get(name.toLowerCase()) : undefined;
}

/**
 * Get atomic number from a symbol.
 * @param {string} symbol
 * @returns {number | undefined}
 */
export function getAtomicNumber(symbol) {
    const el = getElementBySymbol(symbol);
    return el ? el.atomicNumber : undefined;
}
