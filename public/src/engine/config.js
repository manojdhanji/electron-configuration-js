// src/engine/config.js
// Core configuration for the electron configuration engine.

/* Orbital filling order (Aufbau principle).
    "1s",
    "2s", "2p",
    "3s", "3p",
    "4s", "3d", "4p",
    "5s", "4d", "5p",
    "6s", "4f", "5d", "6p",
    "7s", "5f", "6d", "7p"
 Each entry is a string like "1s", "2s", "2p", "3s", "3p", "4s", "3d", ...
*/
export const ORBITAL_ORDER = [
    "1s",
    "2s",
    "2p",
    "3s",
    "3p",
    "4s",
    "3d",
    "4p",
    "5s",
    "4d",
    "5p",
    "6s",
    "4f",
    "5d",
    "6p",
    "7s",
    "5f",
    "6d",
    "7p"
];

// Maximum electrons each orbital type can hold.
export const ORBITAL_CAPACITY = {
    s: 2,
    p: 6,
    d: 10,
    f: 14
};

/**
 * Parse an orbital label like "4s" -> { n: 4, type: "s" }.
 * @param {string} orbital
 * @returns {{ n: number, type: string }}
 */
export function parseOrbital(orbital) {
    console.log(`Parsing orbital: ${orbital}`);
    const orbitalRegex = /^(\d+)([spdf])$/i;
    if (!orbitalRegex.test(orbital)) {
        throw new Error(`Invalid orbital label: ${orbital}`);
    }
    const n = Number.parseInt(orbital[0], 10);
    
    if (Number.isNaN(n) || n < 1) {
        throw new Error(`Invalid orbital label: ${orbital}`);
    }
    const type = orbital[1];
    return { n, type };
}

/**
 * Expand ORBITAL_ORDER into a list of objects:
 * [
 *   { label: "1s", n: 1, type: "s", capacity: 2 },
 *   { label: "2s", n: 2, type: "s", capacity: 2 },
 *   ...
 * ]
 */
export const ORDERED_ORBITALS = ORBITAL_ORDER.map(label => {
    const { n, type } = parseOrbital(label);
    return {
        label,
        n,
        type,
        capacity: ORBITAL_CAPACITY[type]
    };
});
