import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as STARS from './scenes/stars'
import * as SADNBOX from './scenes/sandbox'
import * as TEMPLATE from './scenes/template'
import { SceneEnvironment } from './types/scene-environment'

// Constants
const TIMESCALE = 0.1;
const DEFAULT_ENV_INDEX = 0;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 3, 3);
controls.update();

// Clock
let clock = new THREE.Clock();
let internalTime = 0;

// Register Environments
const environments: SceneEnvironment[] = [];

// TODO: @vpondtor find some way not to have to update this manually. Config file? Automatically detect files in ./scenes
environments.push(STARS.create(1000, 500));
environments.push(SADNBOX.create());
environments.push(TEMPLATE.create());

let currentEnvironmentIndex = Math.min(DEFAULT_ENV_INDEX, environments.length - 1) 
let currentEnvironment = environments[currentEnvironmentIndex];

document.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.code) {
        case ('Tab'):
            rotateEnvironment(event);
            break;
        case ('Space'): 
            pauseClock();
            break;
        case ('KeyR'): 
            resetClock();
            break;
    }
})

function rotateEnvironment(event: KeyboardEvent) {
    event.preventDefault();
    resetClock();

    if (event.shiftKey) {
        currentEnvironmentIndex = (currentEnvironmentIndex - 1 + environments.length) % environments.length;
    } else {
        currentEnvironmentIndex = (currentEnvironmentIndex + 1) % environments.length;
    }

    currentEnvironment = environments[currentEnvironmentIndex];
}

function pauseClock() {
    if (clock.running) {
        internalTime = clock.getElapsedTime();
        clock.stop();
    } else {
        clock.start();
        clock.elapsedTime += internalTime;
    }
}

function resetClock() {
    clock.elapsedTime = 0;
}

function main() {
    let t = clock.getElapsedTime() * TIMESCALE;
    currentEnvironment.animate(t);

    requestAnimationFrame(main);
    controls.update();
    renderer.render(currentEnvironment.scene, camera);
}

main();