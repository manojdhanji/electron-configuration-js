# Periodic Table – Electron Configuration Engine (JavaScript)

A fully modular, algorithmic electron‑configuration engine implemented in modern JavaScript.  
This project computes electron configurations using the Aufbau principle, real‑world exceptions, and noble‑gas shorthand - without hard‑coded strings.

It is designed for:

- teaching and demos  
- UI visualization (browser‑based periodic table included)  
- integration into other JS applications  
- clean, testable, extensible architecture  

The engine mirrors the behavior of the original Python version, but is now written entirely in ES modules with a fully‑tested Jest suite and a browser UI.


## ✨ Features
### Algorithmic electron‑configuration engine  
Computes configurations using the Aufbau principle, subshell capacities, and real‑world exceptions - no hard‑coded strings.

### Real‑world exception handling  
Correctly models elements like Cr, Cu, Mo, Ag, Au, Th, and others that deviate from naive Aufbau filling.

### Noble‑gas shorthand generation  
Automatically trims core orbitals and outputs canonical shorthand (e.g., Se → [Ar] 3d10 4s2 4p4).

### Canonical display ordering  
All configurations are sorted by principal quantum number and subshell order (s < p < d < f), matching IUPAC and textbook notation.

### 118‑element dataset  
Includes atomic number, symbol, name, and mass for all known elements.

### Lookup utilities  
Search by atomic number, symbol, or name with clean, deterministic results.

### Modular ES‑module architecture  
Each subsystem (Aufbau, exceptions, noble‑gas logic, lookup, formatting) is isolated and testable.

### Browser UI included  
Interactive periodic table with element details, full configuration, and shorthand configuration.

### Complete Jest test suite  
Covers engine logic, exceptions, noble‑gas shorthand, lookup utilities, and formatting behavior.

## Project Structure
```text
electron-configuration-js/
├── Dockerfile
├── README.md
├── docker-compose.yaml
├── jest.config.js
├── package-lock.json
├── package.json
├── public
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src
│   ├── data
│   │   ├── elements.js
│   │   ├── layout.js
│   │   └── nobleGases.js
│   ├── engine
│   │   ├── aufbau.js
│   │   ├── config.js
│   │   ├── exceptions.js
│   │   ├── index.js
│   │   ├── lookup.js
│   │   ├── nobleGas.js
│   │   └── utils.js
│   └── ui
│       ├── ElementDetails.js
│       └── PeriodicTable.js
└── tests
    ├── aufbau.test.js
    ├── config.test.js
    ├── exceptions.test.js
    ├── index.test.js
    ├── lookup.test.js
    ├── nobleGas.test.js
    └── utils.test.js            # Interactive command-line interface
```
## How it all works

### Electron Configuration Engine
The engine computes configurations algorithmically using:

- the Aufbau principle  
- subshell capacities  
- orbital filling order  
- real‑world exceptions (e.g., Cr: 4s¹ 3d⁵, Cu: 4s¹ 3d¹⁰)  
- canonical display ordering (sorted by n, then s < p < d < f)

### Noble‑Gas Shorthand
```code
Full:  1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4
Core:  [Ar]
Short: [Ar] 3d10 4s2 4p4
```

### Lookup Utilities
Search by:
- atomic number
- chemical symbol
- element name

## Requirements
- Docker and Docker Compose (recommended)
- OR Node.js 18+ if running locally without Docker

## Installation

### Option 1: Run with Docker (recommended)

Build the image:

```bash
docker compose build --no-cache
```

Run the container (detached mode):
```bash
docker compose up -d
```

Open the browser:
```text
http://localhost:8082
```
### Option 2: Run locally (not recommended)

Install dependencies:

```bash
npm install
npm start
```

Open the browser:
```text
http://localhost:8082/public/
```

## Tests

This project includes a complete jest suite covering:

- Aufbau filling behavior
- Exception handling (Cr, Cu, Mo, Ag, Au, etc.)
- Noble‑gas shorthand
- Canonical orbital sorting
- Lookup utilities
- Engine public API

### Run all tests
```bash
npm test
```

### Run a single test
```bash
npm test -- --testNamePattern="Iron"
```
