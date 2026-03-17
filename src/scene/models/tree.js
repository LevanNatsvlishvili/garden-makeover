// import gltfLoader from '@/utils/loader/gtlfLoader';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const tree = async () => {
  const treeSprite = textureLoader.load('./sprite/tree-3.png');
  const material = new THREE.SpriteMaterial({ map: treeSprite, color: 'green' });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = 0.35;
  return sprite;
};

export default tree;
