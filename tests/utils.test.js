import { sortOrbitalsForDisplay } from "../src/engine/utils.js";

describe("sortOrbitalsForDisplay", () => {

    test("sorts orbitals by principal quantum number first", () => {
        const cfg = { "4s": 2, "1s": 2, "3p": 6, "2p": 6 };
        const sorted = sortOrbitalsForDisplay(cfg);

        expect(sorted).toEqual(["1s", "2p", "3p", "4s"]);
    });

    test("sorts orbitals with same n by subshell order s < p < d < f", () => {
        const cfg = { "4d": 10, "4s": 2, "4f": 14, "4p": 6 };
        const sorted = sortOrbitalsForDisplay(cfg);

        expect(sorted).toEqual(["4s", "4p", "4d", "4f"]);
    });

    test("handles mixed n and subshell ordering correctly (Krypton example)", () => {
        const cfg = { "4s": 2, "3d": 10, "4p": 6 };
        const sorted = sortOrbitalsForDisplay(cfg);

        expect(sorted).toEqual(["3d", "4s", "4p"]);
    });

    test("returns an empty array for an empty config", () => {
        const sorted = sortOrbitalsForDisplay({});
        expect(sorted).toEqual([]);
    });

    test("returns a single orbital unchanged", () => {
        const sorted = sortOrbitalsForDisplay({ "5s": 1 });
        expect(sorted).toEqual(["5s"]);
    });

    test("does not mutate the original config object", () => {
        const cfg = { "4s": 2, "3p": 6 };
        const copy = { ...cfg };

        sortOrbitalsForDisplay(cfg);

        expect(cfg).toEqual(copy);
    });

});
