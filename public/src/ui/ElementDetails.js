// src/ui/ElementDetails.js
// Renders the right-side details panel for a selected element.
import { renderElectronCanvas, clearElectronCanvas } from "./ElectronCanvas.js";
import { shorthandConfig, fullConfigString } from "../engine/index.js";
import { configToShells } from "../utils/configToShells.js";

/**
 * Render element details into the details panel.
 *
 * @param {HTMLElement} container - The DOM element for the details panel.
 * @param {Object} element - The element object from ELEMENTS.
 */
export function renderElementDetails(container, element) {
    if (!element) {
        container.innerHTML = "<p>Select an element to see details.</p>";
        return;
    }

    const nbConfig = shorthandConfig(element.atomicNumber);
    const config = fullConfigString(element.atomicNumber);

    container.innerHTML = `
        <h2>${element.name} (${element.symbol})</h2>

        <div class="detail-row">
            <span class="label">Atomic Number:</span>
            <span class="value">${element.atomicNumber}</span>
        </div>

        <div class="detail-row">
            <span class="label">Atomic Mass:</span>
            <span class="value">${element.atomicMass}</span>
        </div>

        <div class="detail-row">
            <span class="label">Category:</span>
            <span class="value">${element.category}</span>
        </div>

        <div class="detail-row">
            <span class="label">Full Electron Configuration:</span>
            <span class="value">${config}</span>
        </div>

        <div class="detail-row">
            <span class="label">Noble-Gas Shorthand:</span>
            <span class="value">${nbConfig}</span>
        </div>

        <div id="electron-visualizer-container">
            <canvas id="electron-canvas" width="250" height="250"></canvas>
        </div>
    `;
    const shells = configToShells(config);
    clearElectronCanvas();
    renderElectronCanvas(shells);

}
