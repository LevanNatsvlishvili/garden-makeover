import * as THREE from 'three';

export const config = {
  camera: {
    fov: 22.5,
    position: { x: 0, y: 6, z: 28 },
  },

  controls: {
    enableDamping: true,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: 0,
    // maxDistance: 10,
    // minDistance: 5,
  },

  renderer: {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    shadowMap: true,
    shadowType: THREE.PCFSoftShadowMap,
  },

  scene: {
    // background: 0x87ceeb,
    // fog: { color: 0xcccccc, near: 10, far: 80 },
  },

  fps: {
    limit: 60,
  },

  paths: {
    // models: {
    //   garden: '/models/garden.glb',
    // },
    // textures: {
    //   grass: '/textures/grass.jpg',
    // },
  },
};
