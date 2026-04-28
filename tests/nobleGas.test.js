import { fillOrbitals } from "../src/engine/aufbau.js";
import { applyExceptions } from "../src/engine/exceptions.js";
import { getNobleGasCore, applyNobleGasShorthand }
    from "../src/engine/nobleGas.js";

describe("Noble-gas shorthand logic", () => {

    test("Hydrogen (1) -> no shorthand", () => {
        const base = applyExceptions(fillOrbitals(1), 1);
        const result = applyNobleGasShorthand(base, 1);

        expect(result).toBe("1s1");
    });

    test("Helium (2) -> no shorthand", () => {
        const base = applyExceptions(fillOrbitals(2), 2);
        const result = applyNobleGasShorthand(base, 2);

        expect(result).toBe("1s2");
    });

    test("Neon (10) -> [He] 2s2 2p6", () => {
        const base = applyExceptions(fillOrbitals(10), 10);
        const result = applyNobleGasShorthand(base, 10);

        expect(result).toBe("[He] 2s2 2p6");
    });

    test("Argon (18) -> [Ne] 3s2 3p6", () => {
        const base = applyExceptions(fillOrbitals(18), 18);
        const result = applyNobleGasShorthand(base, 18);

        expect(result).toBe("[Ne] 3s2 3p6");
    });

    test("Krypton (36) -> [Ar] 3d10 4s2 4p6", () => {
        const base = applyExceptions(fillOrbitals(36), 36);
        const result = applyNobleGasShorthand(base, 36);

        expect(result).toBe("[Ar] 3d10 4s2 4p6");
    });

    test("getNobleGasCore returns correct core for various Z", () => {
        expect(getNobleGasCore(1)).toBe(null);      // H
        expect(getNobleGasCore(2)).toBe(null);      // He
        expect(getNobleGasCore(10).symbol).toBe("He");     // Ne
        expect(getNobleGasCore(18).symbol).toBe("Ne");     // Ar
        expect(getNobleGasCore(36).symbol).toBe("Ar");     // Kr
        expect(getNobleGasCore(54).symbol).toBe("Kr");     // Xe
    });

    test("Shorthand trims all orbitals belonging to the noble-gas core", () => {
        const base = applyExceptions(fillOrbitals(26), 26); // Iron
        const result = applyNobleGasShorthand(base, 26);

        // Iron -> [Ar] 3d6 4s2
        expect(result).toBe("[Ar] 3d6 4s2");
    });

});
