import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const config = {
  position: {
    y: 0.175,
    z: 0.25,
    x: 2.5,
  },
  rotation: {
    y: Math.PI * -0.5,
  },
  scale: {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  },
};

const statue = async () => {
  const { position, rotation, scale } = config;
  const statueSprite = textureLoader.load('./sprite/statues/statue-1.png');
  statueSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: statueSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = position.y;
  sprite.position.x = position.x;
  sprite.position.z = position.z;
  sprite.rotation.y = rotation.y;
  sprite.scale.set(scale.x, scale.y, scale.z);
  return sprite;
};

export default statue;
