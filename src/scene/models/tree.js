// import gltfLoader from '@/utils/loader/gtlfLoader';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const tree = async () => {
  const treeSprite = textureLoader.load('./sprite/tree-3.png');
  treeSprite.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: treeSprite });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = 0.35;
  sprite.position.x = 2.5;
  sprite.position.z = 2.5;
  return sprite;
};

export default tree;
