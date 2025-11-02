import * as THREE from 'three'

export type SceneEnvironment = {
    scene: THREE.Scene;
    animate: (t:number) => void;
}