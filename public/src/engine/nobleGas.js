// src/engine/nobleGas.js
// Noble-gas core lookup + shorthand configuration.
import { sortOrbitalsForDisplay } from "./utils.js";
import { NOBLE_GASES } from "../data/nobleGases.js";
// Example: { 2: "He", 10: "Ne", 18: "Ar", 36: "Kr", ... }

/**
 * Find the noble gas with atomic number < z.
 * Returns { z: number, symbol: string } or null.
 */
export function getNobleGasCore(z) {
    const candidates = Object.keys(NOBLE_GASES)
        .map(n => Number.parseInt(n, 10))
        .filter(n => n < z);
    console.log(`Noble gas candidates for z=${z}: ${candidates}`);
    if (candidates.length === 0) return null;

    const coreZ = Math.max(...candidates);
    return { z: coreZ, symbol: NOBLE_GASES[coreZ] };
}

/**
 * Convert a full config into noble-gas shorthand.
 * @param {Object} config - full orbital map (e.g. { "1s":2, "2s":2, ... })
 * @param {number} z - atomic number
 * @returns {string} shorthand like "[Ar] 3d6 4s2"
 */
export function applyNobleGasShorthand(config, z) {
    const core = getNobleGasCore(z);
    if (!core) {
        // H and He have no noble-gas core
        return stringifyConfig(config);
    }

    // Build the full config for the core element
    const coreConfig = buildCoreConfig(core.z);

    // Remove core orbitals from the full config
    const remainder = {};
    for (const [orbital, electrons] of Object.entries(config)) {
        if (!coreConfig[orbital]) {
            remainder[orbital] = electrons;
        }
    }

    const remainderStr = stringifyConfig(remainder);
    return `[${core.symbol}]` + (remainderStr ? " " + remainderStr : "");
}

/**
 * Build the full configuration for a noble gas core.
 * This uses the same fillOrbitals() logic as the main engine.
 */
import { fillOrbitals } from "./aufbau.js";
function buildCoreConfig(coreZ) {
    return fillOrbitals(coreZ);
}

/**
 * Convert { "3d": 6, "4s": 2 } -> "3d6 4s2"
 * Now sorted using canonical display order.
 */
function stringifyConfig(cfg) {
    const sorted = sortOrbitalsForDisplay(cfg);

    return sorted
        .map(orbital => `${orbital}${cfg[orbital]}`)
        .join(" ");
}
