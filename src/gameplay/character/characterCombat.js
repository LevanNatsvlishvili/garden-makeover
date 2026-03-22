import * as THREE from 'three';
import { config } from '@/config/config';
import models from '@/store/models';
import state from '@/store/state';

const { attackRange, attackDamage, attackCooldown } = config.character;

let cooldownTimer = 0;
let spaceDown = false;
const diff = new THREE.Vector3();

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') spaceDown = true;
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') spaceDown = false;
});

// Called every frame from the tick loop
export function updateCombat(delta) {
  if (cooldownTimer > 0) cooldownTimer -= delta;
  if (!spaceDown || cooldownTimer > 0) return;

  const player = models.characterModel;
  const enemy = models.monsterModel;
  if (!player || !enemy) return;

  // Check distance to enemy (ignore Y)
  diff.subVectors(enemy.position, player.position);
  diff.y = 0;

  if (diff.length() > attackRange) return;

  // Attack lands
  cooldownTimer = attackCooldown;
  state.monsterHealth -= attackDamage;
  console.log(`Player attacks for ${attackDamage}! Monster HP: ${state.monsterHealth}`);

  if (state.monsterHealth <= 0) {
    console.log('Monster defeated!');
    enemy.visible = false;
  }
}
