import { configToShells } from "../../src/utils/configToShells.js";

describe("configToShells", () => {
    test("parses a simple 1-shell configuration", () => {
        const result = configToShells("1s1");
        expect(result).toEqual([1]);
    });

    test("parses a typical multi-shell configuration", () => {
        const result = configToShells("1s2 2s2 2p6 3s2 3p1");
        expect(result).toEqual([2, 8, 3]);
    });

    test("handles full d and f blocks correctly", () => {
        const result = configToShells("1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6");
        expect(result).toEqual([2, 8, 18, 8]);
    });

    test("handles irregular spacing", () => {
        const result = configToShells("1s2   2s2   2p6");
        expect(result).toEqual([2, 8]);
    });

    test("returns empty array for empty input", () => {
        const result = configToShells("");
        expect(result).toEqual([]);
    });

    test("throws or handles malformed input gracefully", () => {
        const result = configToShells("notAConfig");
        // "notAConfig" -> shell = NaN -> ignored -> []
        expect(result).toEqual([]);
    });
});
