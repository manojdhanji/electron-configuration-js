// src/engine/aufbau.js
// Fills orbitals using the Aufbau principle (no exceptions applied).

import { ORDERED_ORBITALS } from "./config.js";

/**
 * Fill orbitals in Aufbau order for atomic number z.
 * Returns an object like:
 * { "1s": 2, "2s": 2, "2p": 6, ... }
 *
 * @param {number} z - atomic number
 * @returns {Object} orbital -> electron count
 */
export function fillOrbitals(z) {
    let remaining = z;
    const config = {};

    for (const orbital of ORDERED_ORBITALS) {
        if (remaining <= 0) break;

        const { label, capacity } = orbital;

        // Fill as much as possible: either full capacity or what's left
        const electrons = Math.min(capacity, remaining);

        config[label] = electrons;
        remaining -= electrons;
    }

    return config;
}
