// Entry point for the Interactive Periodic Table
// This file stays small and delegates real work to src/engine + src/ui

import { loadElements } from "../src/data/elements.js";
import { createPeriodicTable } from "../src/ui/PeriodicTable.js";
import { renderElementDetails } from "../src/ui/ElementDetails.js";
import { lookupBySymbol, lookupByAtomicNumber, lookupByName } from "../src/engine/index.js";

// DOM references
const tableContainer = document.getElementById("periodic-table");
const detailsPanel = document.getElementById("details-panel");
const searchInput = document.getElementById("search");

// ------------------------------------------------------------
// Initialize App
// ------------------------------------------------------------
async function init() {
    // Load element data (JSON or JS module)
    const elements = await loadElements();

    // Build the periodic table grid
    createPeriodicTable({
        container: tableContainer,
        elements,
        onSelect: handleElementSelect
    });

    // Wire up search
    searchInput.addEventListener("input", handleSearch);
}

document.addEventListener("DOMContentLoaded", init);

// ------------------------------------------------------------
// Event Handlers
// ------------------------------------------------------------
function handleElementSelect(symbol) {
    const element = lookupBySymbol(symbol);
    renderElementDetails(detailsPanel, element);
}

function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    if (!query) return;

    let element = null;

    // Try number
    if (!Number.isNaN(query)) {
        element = lookupByAtomicNumber(Number(query));
    }

    // Try symbol
    if (!element) {
        element = lookupBySymbol(query);
    }

    // Try name
    if (!element) {
        element = lookupByName(query);
    }

    if (element) {
        renderElementDetails(detailsPanel, element);

        // Optional: highlight tile
        const tile = document.querySelector(`[data-symbol="${element.symbol}"]`);
        if (tile) tile.focus();
    }
}
