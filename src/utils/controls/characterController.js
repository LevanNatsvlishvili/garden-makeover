import * as THREE from 'three';
import { camera } from '../renderer';
import { config } from '@/config/config';
import { isCellOccupied } from '@/utils/placementTool';

const keys = { up: false, down: false, left: false, right: false };
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const moveDir = new THREE.Vector3();

const SPEED = config.character.speed;

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp') keys.up = true;
  if (e.code === 'ArrowDown') keys.down = true;
  if (e.code === 'ArrowLeft') keys.left = true;
  if (e.code === 'ArrowRight') keys.right = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowUp') keys.up = false;
  if (e.code === 'ArrowDown') keys.down = false;
  if (e.code === 'ArrowLeft') keys.left = false;
  if (e.code === 'ArrowRight') keys.right = false;
});

export function updateCharacter(model, delta) {
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

  moveDir.set(0, 0, 0);

  if (keys.up) moveDir.add(forward);
  if (keys.down) moveDir.sub(forward);
  if (keys.left) moveDir.sub(right);
  if (keys.right) moveDir.add(right);

  if (moveDir.lengthSq() === 0) return;

  moveDir.normalize();
  const step = SPEED * delta;

  const nextX = model.position.x + moveDir.x * step;
  const nextZ = model.position.z + moveDir.z * step;

  const blockedFull = isCellOccupied(nextX, nextZ);

  if (!blockedFull) {
    model.position.x = nextX;
    model.position.z = nextZ;
  } else {
    if (!isCellOccupied(nextX, model.position.z)) {
      model.position.x = nextX;
    }
    if (!isCellOccupied(model.position.x, nextZ)) {
      model.position.z = nextZ;
    }
  }

  model.rotation.y = Math.atan2(moveDir.x, moveDir.z);
}
