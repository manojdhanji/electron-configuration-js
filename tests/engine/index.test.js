import {
    fullConfig,
    fullConfigString,
    shorthandConfig,
    electronConfiguration
} from "../../src/engine/index.js";

describe("index.js public API", () => {

    // --- fullConfig ----------------------------------------------------------

    test("fullConfig returns correct raw orbital map for Iron (26)", () => {
        const cfg = fullConfig(26);

        expect(cfg).toEqual({
            "1s": 2,
            "2s": 2,
            "2p": 6,
            "3s": 2,
            "3p": 6,
            "4s": 2,
            "3d": 6
        });
    });

    // --- fullConfigString ----------------------------------------------------

    test("fullConfigString returns sorted full configuration for Krypton (36)", () => {
        const str = fullConfigString(36);

        // Sorted by n, then s < p < d < f
        expect(str).toBe("1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6");
    });

    test("fullConfigString respects exceptions (Copper -> 4s1 3d10)", () => {
        const str = fullConfigString(29);

        expect(str).toBe("1s2 2s2 2p6 3s2 3p6 3d10 4s1");
    });

    // --- shorthandConfig -----------------------------------------------------

    test("shorthandConfig returns correct shorthand for Iron (26)", () => {
        const str = shorthandConfig(26);

        expect(str).toBe("[Ar] 3d6 4s2");
    });

    test("shorthandConfig returns no shorthand for Hydrogen (1)", () => {
        const str = shorthandConfig(1);

        expect(str).toBe("1s1");
    });

    test("shorthandConfig returns sorted remainder for Krypton (36)", () => {
        const str = shorthandConfig(36);

        expect(str).toBe("[Ar] 3d10 4s2 4p6");
    });

    // --- electronConfiguration ----------------------------------------------

    test("electronConfiguration({ shorthand: true }) returns shorthand", () => {
        const str = electronConfiguration(26, { shorthand: true });

        expect(str).toBe("[Ar] 3d6 4s2");
    });

    test("electronConfiguration({ shorthand: false }) returns full config", () => {
        const str = electronConfiguration(26, { shorthand: false });

        expect(str).toBe("1s2 2s2 2p6 3s2 3p6 3d6 4s2");
    });

    test("electronConfiguration defaults to shorthand", () => {
        const str = electronConfiguration(26);

        expect(str).toBe("[Ar] 3d6 4s2");
    });

});
