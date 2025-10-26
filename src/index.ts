import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshToonMaterial( {
    color: 0x87ceeb // sky blue
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 1, 1)
scene.add(light);

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 3);

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.05;
    torus.rotation.y += 0.01;

    // camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.01);
    renderer.render(scene, camera);
}

animate();