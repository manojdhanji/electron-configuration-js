// src/ui/PeriodicTable.js
// Builds the periodic table grid and wires element selection events.

import { ELEMENT_LAYOUT } from "../data/layout.js";

/**
 * Create the periodic table UI.
 *
 * @param {Object} options
 * @param {HTMLElement} options.container - The DOM element to render into.
 * @param {Array} options.elements - The ELEMENTS array from elements.js.
 * @param {Function} options.onSelect - Callback when an element tile is clicked.
 */
export function createPeriodicTable({ container, elements, onSelect }) {
    container.innerHTML = ""; // Clear any existing content

    elements.forEach(element => {
        const layout = ELEMENT_LAYOUT[element.atomicNumber];
        if (!layout) {
            console.warn(`Missing layout for atomic number ${element.atomicNumber}`);
            return;
        }

        const tile = document.createElement("button");
        tile.className = "element-tile";
        tile.dataset.symbol = element.symbol;
        tile.dataset.category = element.category.replaceAll(/\s+/g, "-");

        tile.setAttribute("role", "gridcell");
        tile.setAttribute("aria-label", `${element.name}, atomic number ${element.atomicNumber}`);

        // Position in CSS Grid
        tile.style.gridColumn = layout.col;
        tile.style.gridRow = layout.row;

        // Tile content
        tile.innerHTML = `
            <span class="atomic-number">${element.atomicNumber}</span>
            <span class="symbol">${element.symbol}</span>
            <span class="name">${element.name}</span>
        `;

        // wire a handler to call onSelect for each of the tiles with the element symbol when clicked
        tile.addEventListener("click", () => {
            onSelect(element.symbol);
        });

        container.appendChild(tile);
    });
}
