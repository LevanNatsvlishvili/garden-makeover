import { scene } from '@/utils/renderer';

export function setNightTint(isNight) {
  const tint = isNight ? 0.1 : 1;
  scene.traverse((child) => {
    if (child.isSprite) {
      child.material.color.setScalar(tint);
    }
  });
}
