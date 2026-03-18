import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const config = {
  position: {
    y: 0.25,
    z: -1,
    x: 2.5,
  },
  rotation: {
    y: Math.PI * -0.5,
  },
  scale: {
    x: 0.75,
    y: 0.75,
    z: 0.75,
  },
};

const well = async () => {
  const { position, rotation, scale } = config;
  const wellSprite = textureLoader.load('./sprite/well.png');
  wellSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: wellSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = position.y;
  sprite.position.x = position.x;
  sprite.position.z = position.z;
  sprite.rotation.y = rotation.y;
  sprite.scale.set(scale.x, scale.y, scale.z);
  return sprite;
};

export default well;
