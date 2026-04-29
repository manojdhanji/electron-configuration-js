import { angleToPosition } from "../../src/ui/ElectronCanvas.js";

describe("angleToPosition", () => {
    test("returns empty array for empty input", () => {
        expect(angleToPosition([])).toEqual([]);
    });

    test("computes angles for a single shell", () => {
        const result = angleToPosition([2]);
        console.log("Result for single shell:", result);
        expect(result.length).toBe(1);
        expect(result[0].length).toBe(2);
        expect(result[0][0]).toBeCloseTo(0);
        expect(result[0][1]).toBeCloseTo(Math.PI);
    });

    test("computes angles for multiple shells", () => {
        const result = angleToPosition([2, 4]);
        console.log("Result for multiple shells:", result);
        expect(result.length).toBe(2);

        // Shell 1
        expect(result[0].length).toBe(2);
        expect(result[0][1]).toBeCloseTo(Math.PI);

        // Shell 2
        expect(result[1].length).toBe(4);
        expect(result[1][2]).toBeCloseTo(Math.PI);
    });

    test("handles zero-electron shells gracefully", () => {
        const result = angleToPosition([0, 3]);
        expect(result[0]).toEqual([]);
        expect(result[1].length).toBe(3);
    });
});
