import * as THREE from 'three'
import { SceneEnvironment } from '../types/scene-environment';

export function create() {
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

    let animate = function (t: number) {
        torus.position.y = ((t % period) / period) * height;
    }

    let environment: SceneEnvironment = {
        scene: scene,
        animate: animate
    }

    return environment;
}