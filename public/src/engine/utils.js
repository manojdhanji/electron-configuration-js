// src/engine/utils.js
export function sortOrbitalsForDisplay(configObject) {
    const subshellOrder = { s: 1, p: 2, d: 3, f: 4 };

    return Object.keys(configObject)
        .sort((a, b) => {
            // a and b are strings like "4s", "3d", "4p"

            const nA = Number.parseInt(a, 10);      // principal quantum number of a
            const nB = Number.parseInt(b, 10);      // principal quantum number of b

            const typeA = a.at(-1);   // 's', 'p', 'd', or 'f'
            const typeB = b.at(-1);

            // 1. Compare principal quantum number (n)
            if (nA !== nB) {
                return nA - nB;                // smaller n comes first
            }

            // 2. If same n, compare subshell order: s < p < d < f
            return subshellOrder[typeA] - subshellOrder[typeB];
        });
}
