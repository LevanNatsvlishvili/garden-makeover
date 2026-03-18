import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const config = {
  position: {
    y: 0.075,
    z: 0.25,
    x: 1.5,
  },
  rotation: {
    y: Math.PI * -0.5,
  },
  scale: {
    x: 0.2,
    y: 0.2,
    z: 0.2,
  },
};

const rose = async () => {
  const { position, rotation, scale } = config;
  const roseSprite = textureLoader.load('./sprite/roses/rose-red.png');
  roseSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: roseSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = position.y;
  sprite.position.x = position.x;
  sprite.position.z = position.z;
  sprite.rotation.y = rotation.y;
  sprite.scale.set(scale.x, scale.y, scale.z);
  return sprite;
};

export default rose;
