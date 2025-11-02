import * as THREE from 'three'
import { SceneEnvironment } from '../types/scene-environment';

export function create(): SceneEnvironment {
    const scene = new THREE.Scene();

    const animate = function(t: number) {
        return;
    }

    return {
        scene: scene,
        animate: animate
    }
}