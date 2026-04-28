import { 
  getElementByNumber,
  getElementBySymbol,
  getElementByName
} from "../src/engine/lookup.js";

describe("Lookup Engine", () => {

  test("getElementByNumber returns correct element", () => {
    const el = getElementByNumber(11);
    expect(el.symbol).toBe("Na");
    expect(el.name).toBe("Sodium");
  });

  test("getElementBySymbol is case-insensitive", () => {
    expect(getElementBySymbol("fe").atomicNumber).toBe(26);
    expect(getElementBySymbol("Fe").atomicNumber).toBe(26);
    expect(getElementBySymbol("FE").atomicNumber).toBe(26);
  });

  test("getElementByName is case-insensitive", () => {
    expect(getElementByName("iron").symbol).toBe("Fe");
    expect(getElementByName("Iron").symbol).toBe("Fe");
  });

  test("invalid lookups return undefined", () => {
    expect(getElementByNumber(999)).toBeUndefined();
    expect(getElementBySymbol("??")).toBeUndefined();
    expect(getElementByName("not-an-element")).toBeUndefined();
  });

});
