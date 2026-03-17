import * as THREE from 'three';

export const config = {
  camera: {
    fov: 22.5,
    position: { x: 10, y: 9, z: 10 },
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

  lights: {
    ambient: { color: '#ffffff', intensity: 5 },
    directional: {
      color: '#ffffff',
      intensity: 1,
      position: { x: -1.5, y: 2, z: -8 },
      shadow: {
        mapSize: 1024,
        camera: { top: 8, right: 8, bottom: -8, left: -8, near: 1, far: 15 },
      },
    },
  },

  ground: {
    size: 50,
    color: 'green',
    positionY: -0.5,
  },

  environment: {
    background: 0x87ceeb,
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
