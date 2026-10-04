// src/engine/exceptions.js
// Handles electron configuration exceptions (Cr, Cu, Mo, Ag, Au, etc.)

/**
 * Exception configurations override the naive aufbau filling.
 * Each entry maps atomic number -> { orbital: electrons, ... }
 *
 * These are ground-state experimental configurations.
 */
export const EXCEPTION_CONFIGS = {
    24: { "4s": 1, "3d": 5 },          // Chromium
    29: { "4s": 1, "3d": 10 },         // Copper
    42: { "5s": 1, "4d": 5 },          // Molybdenum
    47: { "5s": 1, "4d": 10 },         // Silver
    79: { "6s": 1, "4f": 14, "5d": 10 }, // Gold
    90: { "7s": 2, "6d": 2 }           // Thorium (common ground-state form)
};

/**
 * Apply exception configuration to a filled orbital map.
 * @param {Object} config - config from fillOrbitals()
 * @param {number} z - atomic number
 * @returns {Object} new config with exceptions applied
 */
export function applyExceptions(config, z) {
    const exception = EXCEPTION_CONFIGS[z];
    if (!exception) return config; // No exception -> return as-is

    // Create a shallow copy so we don't mutate the original
    const adjusted = { ...config };

    // Apply each orbital override
    for (const [orbital, electrons] of Object.entries(exception)) {
        adjusted[orbital] = electrons;
    }

    return adjusted;
}
