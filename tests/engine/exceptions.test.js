import { fillOrbitals } from "../../src/engine/aufbau.js";
import { applyExceptions } from "../../src/engine/exceptions.js";

describe("Electron configuration exceptions", () => {

    test("Chromium (24) -> 4s1 3d5", () => {
        const base = fillOrbitals(24);
        const corrected = applyExceptions(base, 24);

        expect(corrected["4s"]).toBe(1);
        expect(corrected["3d"]).toBe(5);
    });

    test("Copper (29) -> 4s1 3d10", () => {
        const base = fillOrbitals(29);
        const corrected = applyExceptions(base, 29);

        expect(corrected["4s"]).toBe(1);
        expect(corrected["3d"]).toBe(10);
    });

    test("Molybdenum (42) -> 5s1 4d5", () => {
        const base = fillOrbitals(42);
        const corrected = applyExceptions(base, 42);

        expect(corrected["5s"]).toBe(1);
        expect(corrected["4d"]).toBe(5);
    });

    test("Silver (47) -> 5s1 4d10", () => {
        const base = fillOrbitals(47);
        const corrected = applyExceptions(base, 47);

        expect(corrected["5s"]).toBe(1);
        expect(corrected["4d"]).toBe(10);
    });

    test("Gold (79) -> 6s1 4f14 5d10", () => {
        const base = fillOrbitals(79);
        const corrected = applyExceptions(base, 79);

        expect(corrected["6s"]).toBe(1);
        expect(corrected["4f"]).toBe(14);
        expect(corrected["5d"]).toBe(10);
    });

    test("Non-exception elements remain unchanged (e.g., Calcium 20)", () => {
        const base = fillOrbitals(20);
        const corrected = applyExceptions(base, 20);

        expect(corrected).toEqual(base);
    });

});
