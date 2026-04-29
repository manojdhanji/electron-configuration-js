import { fillOrbitals } from "../../src/engine/aufbau.js";

describe("Aufbau filling (fillOrbitals)", () => {

    test("Hydrogen (1) -> 1s1", () => {
        const cfg = fillOrbitals(1);
        expect(cfg).toEqual({ "1s": 1 });
    });

    test("Helium (2) -> 1s2", () => {
        const cfg = fillOrbitals(2);
        expect(cfg).toEqual({ "1s": 2 });
    });

    test("Neon (10) -> 1s2 2s2 2p6", () => {
        const cfg = fillOrbitals(10);
        expect(cfg).toEqual({
            "1s": 2,
            "2s": 2,
            "2p": 6
        });
    });

    test("Argon (18) -> 1s2 2s2 2p6 3s2 3p6", () => {
        const cfg = fillOrbitals(18);
        expect(cfg).toEqual({
            "1s": 2,
            "2s": 2,
            "2p": 6,
            "3s": 2,
            "3p": 6
        });
    });

    test("Iron (26) -> 1s2 2s2 2p6 3s2 3p6 4s2 3d6", () => {
        const cfg = fillOrbitals(26);
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

});
