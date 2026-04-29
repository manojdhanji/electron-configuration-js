// src/utils/configToShells.js
export function configToShells(configString) {
    const shells = [];
    const parts = configString.trim().split(/\s+/);
    console.log(`Config string: "${configString}", Parts: ${JSON.stringify(parts)} Length: ${parts.length}`);
    
    for (let _ of parts) {
        const part = _.trim();
        if(part.match(/^\d+[spdf]\d+$/) === null) {
            console.warn(`Skipping invalid part: "${part}"`);
            continue;
        }
        const shell = Number.parseInt(part[0], 10);
        console.log(`Parsing part: ${part}, shell: ${shell}`);
        const electrons = Number.parseInt(part.match(/\d+$/)[0], 10);
        shells[shell - 1] = (shells[shell - 1] || 0) + electrons;
    }

    return shells;
}