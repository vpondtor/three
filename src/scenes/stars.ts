import * as THREE from 'three'
import { SceneEnvironment } from '../types/scene-environment';

export function create(n: number, radius: number): SceneEnvironment {
    const scene = new THREE.Scene();

    let buffer = new THREE.BufferGeometry();
    let material = new THREE.PointsMaterial({
        size: 1.0,
        vertexColors: true
    });

    let direction = new THREE.Vector3();
    let color = new THREE.Vector3();
    let positions: number[] = [];
    let colors: number[] = [];
    for (let i = 0; i < n; i++) {
        direction.randomDirection();
        direction.multiplyScalar(radius);
        positions.push(direction.x, direction.y, direction.z);

        color.random();
        colors.push(color.x, color.y, color.z);
    }

    buffer.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    buffer.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    let stars = new THREE.Points(buffer, material);
    scene.add(stars);

    let animate = function(t: number) {
        stars.rotation.y = t;
    }

    const environment : SceneEnvironment = {
        scene: scene,
        animate: animate
    }

    return environment;
}