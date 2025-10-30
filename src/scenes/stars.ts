import * as THREE from 'three'

export function create(n: number, radius: number): THREE.Scene {
    const scene = new THREE.Scene();

    let geometry = new THREE.BufferGeometry();
    let material = new THREE.PointsMaterial();

    let positions: number[] = [];
    for (let i = 0; i < n; i++) {
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    let stars = new THREE.Points(geometry, material)
    scene.add(stars);

    return scene;
}