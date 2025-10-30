import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Planet} from './planet'
import * as STARS from './scenes/stars'

// Constants
const period = 10; 
const height = 5;

// Initialize Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

const geometry = new THREE.TorusGeometry(0.6);
const material = new THREE.MeshToonMaterial( {
    color: 0xe5a369
});
const torus = new THREE.Mesh(geometry, material);
torus.rotation.x = -Math.PI / 2.0;
scene.add(torus);

const planeGeometry = new THREE.PlaneGeometry(5, 5)
const planeMaterial = new THREE.MeshPhongMaterial( {
    color: 'grey'
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2.0;
scene.add(plane);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);
// scene.add(light);

const pointLight = new THREE.PointLight();
pointLight.position.y = 1.5;
scene.add(pointLight);

// Setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create Camera + Controls
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 3, 3);
controls.update();

// Testing
const starsScene = STARS.create(1000, 100);

let clock = new THREE.Clock();
function animate() {
    let t = clock.getElapsedTime();
    torus.position.y = ((t % period) / period) * height;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(starsScene, camera);

    // [-5, 5]
}

animate();