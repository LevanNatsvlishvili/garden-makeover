import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const house = async () => {
  const houseSprite = textureLoader.load('./sprite/house.png');
  houseSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: houseSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = 0.5;
  sprite.position.x = -1.5;
  sprite.scale.set(3.25, 2, 1);

  return sprite;
};

export default house;
