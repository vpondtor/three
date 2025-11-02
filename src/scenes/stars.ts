import * as THREE from 'three'
import { SceneEnvironment } from '../types/scene-environment';

export function create(n: number, radius: number): SceneEnvironment {
    const scene = new THREE.Scene();

    let geometry = new THREE.BufferGeometry();
    let material = new THREE.PointsMaterial();

    let direction = new THREE.Vector3();
    let points: number[] = [];
    for (let i = 0; i < n; i++) {
        direction.randomDirection();
        direction.multiplyScalar(radius);

        points.push(direction.x, direction.y, direction.z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))

    let stars = new THREE.Points(geometry, material)
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