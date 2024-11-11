// Variable global para almacenar los datos de partes
let calculatedParts = null;

// Evento para el formulario: calcular partes y mostrar botones
document.getElementById('gondolaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    console.log("Form submitted. Calculating parts...");

    const totalLength = parseInt(document.getElementById('totalLength').value);
    const uprightSize = parseInt(document.getElementById('uprightSize').value);
    const shoeBaseSize = parseInt(document.getElementById('shoeBaseSize').value);

    // Definir detalles de las partes (ejemplo)
    const partDetails = {
        shoePartName: `BSSIL-${shoeBaseSize}-5-PC059`,
        shoePartDescription: `STRAIGHT IN LOCKING SHOE ${shoeBaseSize} INCHES DEEP`,
        basePartName: `SBS-${shoeBaseSize}-PC002`,
        basePartDescription: `SHELF - STANDARD BASE 48IN X ${shoeBaseSize} SAHARA STD BASE / SBS-${shoeBaseSize} - SA`,
        uprightPartName: `BU-${uprightSize}-PC002`,
        uprightPartDescription: `UPRIGHT GONDOLA ${uprightSize} INCH HIGH BASIC UPRIGHT SAHARA PC002`,
        topSpannerPartName: `STL-4-PC002`,
        topSpannerPartDescription: `SPANNER GONDOLA 48 INCH WIDE TOP SPANNER SAHARA`,
        lowerSpannerPartName: `SL-4-PC002`,
        lowerSpannerPartDescription: `SPANNER GONDOLA 48 INCH WIDE LOWER SPANNER SAHARA`,
        zBarPartName: `SZB48-PC003`,
        zBarPartDescription: `Z SEISMIC TIE BAR 48 INCHES CHOCOLATE PC003`,
        shelfPartName: `SUS-424-PC002`,
        shelfPartDescription: `SHELF - STANDARD UPPER 48IN X 24IN SAHARA`
    };

    // Solicitar los cálculos de las partes desde el servidor
    const response = await fetch('/calculate-parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalLength, uprightSize, shoeBaseSize })
    });

    if (!response.ok) {
        console.error("Failed to calculate parts. Server error.");
        return;
    }

    calculatedParts = await response.json();
    console.log("Parts calculated:", calculatedParts);

    if (!calculatedParts || !calculatedParts.uprights) {
        console.error("Error: Parts data is missing or incomplete.");
        return;
    }

    // Mostrar los resultados en una tabla
    const partsResult = document.getElementById('partsResult');
    partsResult.innerHTML = `
        <h2>Calculated Parts</h2>
        <table>
            <thead>
                <tr>
                    <th>Part</th>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Uprights</td><td>${calculatedParts.uprights.count}</td><td>${partDetails.uprightPartName}</td><td>${partDetails.uprightPartDescription}</td></tr>
                <tr><td>Shoes</td><td>${calculatedParts.shoes.count}</td><td>${partDetails.shoePartName}</td><td>${partDetails.shoePartDescription}</td></tr>
                <tr><td>Bases</td><td>${calculatedParts.bases.count}</td><td>${partDetails.basePartName}</td><td>${partDetails.basePartDescription}</td></tr>
                <tr><td>Top Spanners</td><td>${calculatedParts.topSpanners.count}</td><td>${partDetails.topSpannerPartName}</td><td>${partDetails.topSpannerPartDescription}</td></tr>
                <tr><td>Lower Spanners</td><td>${calculatedParts.lowerSpanners.count}</td><td>${partDetails.lowerSpannerPartName}</td><td>${partDetails.lowerSpannerPartDescription}</td></tr>
                <tr><td>Z-Bars</td><td>${calculatedParts.zBars.count}</td><td>${partDetails.zBarPartName}</td><td>${partDetails.zBarPartDescription}</td></tr>
                <tr><td>Shelves</td><td>${calculatedParts.shelves.count}</td><td>${partDetails.shelfPartName}</td><td>${partDetails.shelfPartDescription}</td></tr>
            </tbody>
        </table>
    `;

    // Mostrar los botones y ocultar el formulario
    partsResult.style.display = 'block';
    document.getElementById('generate2DGraphBtn').style.display = 'block';
    document.getElementById('generate3DGraphBtn').style.display = 'block';
    document.getElementById('backBtn').style.display = 'block';
    document.getElementById('gondolaForm').style.display = 'none';
});

// Evento para el botón de vista 2D
// Variable global para almacenar los datos de partes


// Evento para el formulario: calcular partes y mostrar los botones de generación


// Función para manejar el clic en el botón de "Generate 2D Gondola Layout"
function generate2D() {
    const canvas = document.getElementById('gondola2DCanvas');
    canvas.style.display = 'block'; // Asegurarse de que el canvas esté visible

    if (!calculatedParts) {
        alert("Please calculate the parts first.");
        return;
    }

    render2DGondola(calculatedParts); // Llamar a render2DGondola en 2d-gondola.js
}

// Asignar evento de clic para el botón de 2D
document.getElementById('generate2DGraphBtn').addEventListener('click', generate2D);

// Evento para el botón de vista 3D
let is3DInitialized = false;

document.getElementById('generate3DGraphBtn').addEventListener('click', function() {
    if (!calculatedParts) {
        alert("Please calculate the parts first.");
        return;
    }

    if (!is3DInitialized) {
        init3D();
        is3DInitialized = true;
    }

    // Mostrar el contenedor y renderizar la góndola
    document.getElementById('gondola3DContainer').style.display = 'block';
    render3DGondola(calculatedParts);
});

// Evento para el botón "Go Back"
document.getElementById('backBtn').addEventListener('click', function() {
    document.getElementById('partsResult').style.display = 'none';
    document.getElementById('generate2DGraphBtn').style.display = 'none';
    document.getElementById('generate3DGraphBtn').style.display = 'none';
    document.getElementById('gondola2DCanvas').style.display = 'none'; // Ocultar el canvas 2D
    document.getElementById('gondola3DContainer').style.display = 'none';
    document.getElementById('gondolaForm').style.display = 'block';
    document.getElementById('backBtn').style.display = 'none';
});


