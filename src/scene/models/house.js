import gui from '@/utils/gui';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const house = async () => {
  const houseSprite = textureLoader.load('./sprite/house-4.png');
  houseSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: houseSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = 0.5;
  sprite.scale.set(3.25, 2, 1);

  gui.add(sprite.rotation, 'y', 0, Math.PI * 2).name('House Rotation Y');
  gui.add(sprite.position, 'y', 0, 1).name('House Position Y');
  gui.add(sprite.position, 'x', 0, 1).name('House Position X');
  gui.add(sprite.scale, 'x', 0, 1).name('House Scale X');
  gui.add(sprite.scale, 'y', 0, 1).name('House Scale Y');
  gui.add(sprite.scale, 'z', 0, 1).name('House Scale Z');
  return sprite;
};

export default house;
