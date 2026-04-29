// src/ui/ElectronCanvas.js
// Handles drawing and animating electron shells for a selected element.

let animationId = null;
let isPaused = false;

export function angleToPosition(shells) {
    if (!shells || shells.length === 0) return [];
    const electronAngles = [];
    shells.forEach((count, shellIndex) => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push((i / count) * Math.PI * 2);
        }
        electronAngles.push(arr);
    });
    return electronAngles;
}

//Draw the nucleus as a red circle in the center of the canvas
function drawNucleus(ctx, cx, cy) {
    ctx.beginPath();
    ctx.fillStyle = "#d33"; // red nucleus
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
}

//Draw a circle for each shell based on the radius calculated from the shell index
function drawShellCircles(ctx, cx, cy, radius) {
    ctx.beginPath();
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
}

//Draw electrons as small white circles on the shell, using the angle to position them around the circle
function drawElectron(ctx, ex, ey) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(ex, ey, 2, 0, Math.PI * 2);
    ctx.fill();
}


/**
 * Draw and animate electron shells for a given electron configuration.
 *
 * @param {number[]} shells - Array of electron counts per shell, e.g. [2, 8, 1]
 */
export function renderElectronCanvas(shells) {
    const canvas = document.getElementById("electron-canvas");
    if (!canvas) return;

    canvas.addEventListener("click", () => {
        isPaused = !isPaused;
    });

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Stop any previous animation
    clearElectronCanvas();

    // Precompute radii for shells
    const baseRadius = 30;
    const radiusStep = 18;

    // Each electron gets an angle offset
    const electronAngles = angleToPosition(shells);

    function animate() {
        if (isPaused) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, w, h);
        // Draw nucleus
        drawNucleus(ctx, cx, cy);

        shells.forEach((count, shellIndex) => {
            const radius = baseRadius + shellIndex * radiusStep;

            // Draw shell circle
            drawShellCircles(ctx, cx, cy, radius);

            // Draw electrons
            for (let i = 0; i < count; i++) {
                // Increment angle for animation
                electronAngles[shellIndex][i] += 0.01 + shellIndex * 0.005;

                const angle = electronAngles[shellIndex][i];
                const ex = cx + radius * Math.cos(angle);
                const ey = cy + radius * Math.sin(angle);

                drawElectron(ctx, ex, ey);
            }
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Stop animation when switching elements.
 */
export function clearElectronCanvas() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    isPaused = false; // reset pause state
}
