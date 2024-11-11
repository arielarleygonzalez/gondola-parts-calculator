let scene, camera, renderer, controls;

function init3D() {
    console.log("Initializing 3D...");

    // Crear la escena
    scene = new THREE.Scene();

    // Configurar la cámara
    camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.set(0, 20, 100);

    // Configurar el renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.setClearColor(0xe0e0e0);
    document.getElementById('gondola3DContainer').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Limpiar la escena antes de renderizar
function clearScene() {
    console.log("Clearing scene...");
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

// Renderizar la góndola en 3D con colores visibles


function render3DGondola(parts) {
    console.log("Rendering 3D Gondola with parts:", parts);
    clearScene();

    const spacing = 15; // Espaciado entre uprights
    const offset = (parts.uprights.count - 1) * spacing / 2;

    // Añadir uprights y bases en disposición correcta
    for (let i = 0; i < parts.uprights.count; i++) {
        // Calcular la posición de cada upright
        let positionX = i * spacing - offset;
        positionX = isNaN(positionX) ? 0 : positionX;

        const height = isNaN(parts.uprights.size / 2) ? 10 : parts.uprights.size / 2;
        addUpright(positionX, 0, 0, height); // Añadir upright

        // Añadir bases solo si no estamos en el último upright (para evitar base extra)
        if (i < parts.uprights.count - 1) {
            const baseWidth = isNaN(parts.bases.size / 2) ? 10 : parts.bases.size / 2;
            const basePositionX = positionX + spacing / 2; // Colocar entre uprights
            addBase(basePositionX, -1, -7, baseWidth); // Base delante
            addBase(basePositionX, -1, 7, baseWidth);  // Base detrás
        }
    }
}

// Función para añadir uprights
function addUpright(x, y, z, height) {
    const geometry = new THREE.BoxGeometry(2, height, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x8b8b8b });
    const upright = new THREE.Mesh(geometry, material);
    upright.position.set(x, height / 2, z);
    scene.add(upright);
}

// Función para añadir bases
function addBase(x, y, z, width) {
    const geometry = new THREE.BoxGeometry(width, 1, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x2e8b57 });
    const base = new THREE.Mesh(geometry, material);
    base.position.set(x, y, z);
    scene.add(base);
}
