import * as THREE from 'three';
import textureLoader from '@/utils/loader/textureLoader.js';
import { config } from '@/config/config';

const { size, color } = config.ground;

const groundTexture = textureLoader.load('./textures/grass.png');

const rotation = Math.PI * 0.75;

const repeatX = size / 2.5;
const repeatY = size / 2.5;

groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(repeatX, repeatY);
groundTexture.center.set(repeatX / 2, repeatY / 2);
groundTexture.rotation = rotation;

const material = new THREE.MeshStandardMaterial({
  color: color,
  map: groundTexture,
  side: THREE.DoubleSide,
});

const ground = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);
ground.rotation.x = Math.PI * 0.5;
ground.receiveShadow = true;

export default ground;
