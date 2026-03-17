import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { screenSizes } from './windowResizer';
import { config } from '../config';

export const scene = new THREE.Scene();

export const canvas = document.querySelector('canvas.webgl');

export const camera = new THREE.PerspectiveCamera(
  config.camera.fov,
  screenSizes.width / screenSizes.height
);
camera.position.set(
  config.camera.position.x,
  config.camera.position.y,
  config.camera.position.z
);

export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = config.controls.enableDamping;
controls.maxPolarAngle = config.controls.maxPolarAngle;
controls.minPolarAngle = config.controls.minPolarAngle;

export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(screenSizes.width, screenSizes.height);
renderer.setPixelRatio(config.renderer.pixelRatio);
renderer.shadowMap.enabled = config.renderer.shadowMap;
renderer.shadowMap.type = config.renderer.shadowType;
