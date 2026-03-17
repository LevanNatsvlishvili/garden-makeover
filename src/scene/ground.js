import * as THREE from 'three';
import { config } from '../config';

const { size, color, positionY } = config.ground;

export const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(size, size),
  new THREE.MeshStandardMaterial({ color })
);
ground.position.y = positionY;
ground.rotation.x = -Math.PI * 0.5;
ground.receiveShadow = true;
