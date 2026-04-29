import { parseOrbital, ORBITAL_CAPACITY, ORDERED_ORBITALS }
    from "../../src/engine/config.js";

describe("config.js utilities", () => {

    test("parseOrbital correctly parses orbital strings", () => {
        expect(parseOrbital("1s")).toEqual({ n: 1, type: "s" });
        expect(parseOrbital("2p")).toEqual({ n: 2, type: "p" });
        expect(parseOrbital("3d")).toEqual({ n: 3, type: "d" });
        expect(parseOrbital("4f")).toEqual({ n: 4, type: "f" });
    });

    test("parseOrbital throws on invalid input", () => {
        expect(() => parseOrbital("")).toThrow();
        expect(() => parseOrbital("xyz")).toThrow();
        expect(() => parseOrbital("22")).toThrow();
        expect(() => parseOrbital("p2")).toThrow();
    });

    test("ORBITAL_CAPACITY has correct values", () => {
        expect(ORBITAL_CAPACITY.s).toBe(2);
        expect(ORBITAL_CAPACITY.p).toBe(6);
        expect(ORBITAL_CAPACITY.d).toBe(10);
        expect(ORBITAL_CAPACITY.f).toBe(14);
    });

    test("ORDERED_ORBITALS is in correct Aufbau order", () => {
        // Spot‑check key positions
        const order = ORDERED_ORBITALS.map(o => o.label);
        console.log(order);
        expect(order[0]).toBe("1s");
        expect(order[1]).toBe("2s");
        expect(order[2]).toBe("2p");
        expect(order[3]).toBe("3s");
        expect(order[4]).toBe("3p");
        expect(order).toContain("4s");
        expect(order).toContain("3d");
        expect(order.indexOf("4s")).toBeLessThan(order.indexOf("3d"));
    });

});
