import * as THREE from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three/examples/jsm/Addons.js';
import { SceneEnvironment } from '../types/scene-environment';

const SLICES = 12;

export function create(): SceneEnvironment {
    const scene = new THREE.Scene();

    const sphereGeometry = new THREE.SphereGeometry(0.1);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 'brown'
    })

    const group = new THREE.Group();
    for (let i = 0; i < SLICES; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 1, 0);
        sphere.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), i * (2 * Math.PI / SLICES));
        group.add(sphere);
    }

    scene.add(group);

    const points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 1, 0));

    const lineGeometry = new LineGeometry();
    lineGeometry.setPositions([0, 0, 0, 0, 1, 0]);

    const lineMaterial = new LineMaterial({
        color: 'white',
        linewidth: 3
    })

    const bigHand = new Line2(lineGeometry, lineMaterial);
    bigHand.scale.multiplyScalar(0.8);
    scene.add(bigHand);

    const littleHand = new Line2(lineGeometry, lineMaterial);
    littleHand.scale.multiplyScalar(0.5);
    littleHand.rotation.z = (2 * Math.PI) * 5 / 3;
    scene.add(littleHand);

    const animate = function(t: number) {
        group.rotation.z = t;
        return;
    }

    return {
        scene: scene,
        animate: animate
    }
}