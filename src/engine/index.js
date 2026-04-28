// src/engine/index.js
// Public API for the electron configuration engine.

import { fillOrbitals } from "./aufbau.js";
import { applyExceptions } from "./exceptions.js";
import { applyNobleGasShorthand } from "./nobleGas.js";
import { sortOrbitalsForDisplay } from "./utils.js";
export {
    getElementBySymbol as lookupBySymbol,
    getElementByNumber as lookupByAtomicNumber,
    getElementByName as lookupByName
} from "./lookup.js";

/**
 * Full electron configuration (no shorthand).
 * Applies Aufbau + exceptions.
 *
 * @param {number} z - atomic number
 * @returns {Object} orbital -> electrons
 */
export function fullConfig(z) {
    // Step 1: naive Aufbau filling
    const base = fillOrbitals(z);

    // Step 2: apply Cr/Cu/Mo/Ag/Au/etc. exceptions
    const corrected = applyExceptions(base, z);

    return corrected;
}

/**
 * Full configuration as a string.
 * Example: "1s2 2s2 2p6 3s2 3p6 4s2 3d6"
 */
export function fullConfigString(z) {
    const cfg = fullConfig(z);
    const sorted = sortOrbitalsForDisplay(cfg);

    return sorted
        .map(orbital => `${orbital}${cfg[orbital]}`)
        .join(" ");
}

/**
 * Noble-gas shorthand configuration.
 * Example: "[Ar] 3d6 4s2"
 */
export function shorthandConfig(z) {
    const cfg = fullConfig(z);
    return applyNobleGasShorthand(cfg, z);
}

/**
 * Main entry point.
 * Options:
 *   { shorthand: true } -> "[Ar] 3d6 4s2"
 *   { shorthand: false } -> "1s2 2s2 2p6 ..."
 *
 * @param {number} z
 * @param {Object} options
 * @returns {string}
 */
export function electronConfiguration(z, { shorthand = true } = {}) {
    return shorthand
        ? shorthandConfig(z)
        : fullConfigString(z);
}
