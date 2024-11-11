// Función para renderizar los uprights y bases en el canvas
// Función para renderizar uprights y bases con una disposición similar al gráfico 3D
// Función para renderizar uprights y bases con ajuste de tamaño y posición
function render2DGondola(parts) {
    const canvas = document.getElementById('gondola2DCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuración de tamaños y espaciado
    const uprightSpacing = 120; // Espaciado entre uprights
    const uprightWidth = 15; // Ancho de los uprights
    const uprightHeight = parseInt(parts.uprights.measurement) / 1.5; // Escalado de altura de uprights
    const baseWidth = parseInt(parts.bases.measurement) * 8; // Aumentamos la longitud de las bases para que sean más visibles
    const baseHeight = 15; // Altura de las bases
    const canvasCenterY = canvas.height / 2;

    console.log("Dibujando uprights y bases con tamaño ajustado...");

    // Dibujar uprights (rectángulos grises)
    ctx.fillStyle = '#8b8b8b';
    for (let i = 0; i < parts.uprights.count; i++) {
        const positionX = 60 + i * uprightSpacing; // Posición X de cada upright
        ctx.fillRect(positionX - uprightWidth / 2, canvasCenterY - uprightHeight / 2, uprightWidth, uprightHeight);
        console.log(`Upright ${i + 1} dibujado en X: ${positionX}`);
    }

    // Dibujar bases (rectángulos verdes) entre los uprights
    ctx.fillStyle = '#2e8b57';
    for (let j = 0; j < parts.bases.count / 2; j++) {
        const basePositionX = 60 + (j * uprightSpacing) + uprightSpacing / 2; // Posición centrada entre uprights

        // Dibujar base delante del upright
        ctx.fillRect(basePositionX - baseWidth / 2, canvasCenterY + uprightHeight , baseWidth, baseHeight);

        // Dibujar base detrás del upright
        ctx.fillRect(basePositionX - baseWidth / 2, canvasCenterY - uprightHeight , baseWidth, baseHeight);

        console.log(`Base ${j + 1} dibujada en X: ${basePositionX}`);
    }
}
