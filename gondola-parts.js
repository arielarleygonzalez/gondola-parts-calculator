// gondola-parts.js
function calculateParts(totalLengthInFeet) {
    const sections = totalLengthInFeet / 4;
    
    return {
        uprights: {
            count: sections + 1,
            measurement: "84 inches"  // Example height in inches
        },
        shoes: {
            count: (sections + 1) * 2,
            measurement: "10 inches"  // Example width in inches
        },
        lowerSpanners: {
            count: sections,
            measurement: "4 feet"     // Each spans 4 feet
        },
        topSpanners: {
            count: sections,
            measurement: "4 feet"     // Each spans 4 feet
        },
        zBars: {
            count: sections + 2,
            measurement: "4 feet"     // Each spans 4 feet
        },
        bases: {
            count: sections * 2,
            measurement: "12 inches"  // Example base width in inches
        },
        shelves: {
            count: sections,
            measurement: "48 inches"  // Shelf length in inches for 4' sections
        }
    };
}

module.exports = { calculateParts };
