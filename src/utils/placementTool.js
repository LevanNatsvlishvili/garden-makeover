import * as THREE from 'three';
import { camera, renderer, scene } from './renderer';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let active = false;
let groundMesh = null;
let spawnCallback = null;
let onDeactivate = null;

function onPointerDown(event) {
  if (!active || !groundMesh) return;

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(groundMesh);

  if (hits.length > 0 && spawnCallback) {
    spawnCallback(hits[0].point);
  }

  deactivate();
}

function updateCursor() {
  renderer.domElement.style.cursor = active ? 'crosshair' : '';
}

export function activate(ground, callback) {
  active = true;
  groundMesh = ground;
  spawnCallback = callback;
  updateCursor();

  return new Promise((resolve) => {
    onDeactivate = resolve;
  });
}

export function deactivate() {
  active = false;
  groundMesh = null;
  spawnCallback = null;
  updateCursor();
  if (onDeactivate) {
    onDeactivate();
    onDeactivate = null;
  }
}

export function isActive() {
  return active;
}

renderer.domElement.addEventListener('pointerdown', onPointerDown);
