import * as THREE from 'three';
import { config } from '@/config/config';
import models from '@/store/models';
import state from '@/store/state';
import { scene } from '@/utils/renderer';
import { finishNight } from '../actions/finishNight';

const { attackRange, attackCooldown } = config.character;

let cooldownTimer = 0;
let spaceDown = false;
const diff = new THREE.Vector3();

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') spaceDown = true;
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') spaceDown = false;
});

// Finds the closest alive monster within attack range
function findNearestTarget(playerPos) {
  let nearest = null;
  let minDist = Infinity;

  for (const entry of state.monsters) {
    if (entry.health <= 0) continue;
    diff.subVectors(entry.model.position, playerPos);
    diff.y = 0;
    const dist = diff.length();
    if (dist <= attackRange && dist < minDist) {
      minDist = dist;
      nearest = entry;
    }
  }
  return nearest;
}

export function triggerAttack() {
  spaceDown = true;
  setTimeout(() => (spaceDown = false), 100);
}

export function updateCombat(delta) {
  if (cooldownTimer > 0) cooldownTimer -= delta;
  if (!spaceDown || cooldownTimer > 0) return;

  const player = models.characterModel;
  if (!player) return;

  const target = findNearestTarget(player.position);
  if (!target) return;

  cooldownTimer = attackCooldown;
  target.health -= state.attackDamage;
  console.log(`Player attacks for ${state.attackDamage}! Monster HP: ${target.health}`);

  if (target.health <= 0) {
    console.log('Monster defeated!');
    scene.remove(target.model);
    scene.remove(target.healthBar.group);
    state.monsters.splice(state.monsters.indexOf(target), 1);
    if (state.monsters.length === 0) {
      finishNight();
    }
  }
}
