// import gltfLoader from '@/utils/loader/gtlfLoader';
import gltfLoader from '@/utils/loader/gltfLoader';
// import textureLoader from '@/utils/loader/textureLoader';
// import * as THREE from 'three';

// const house = async () => {
//   const houseSprite = textureLoader.load('./sprite/house-3.png');
//   houseSprite.colorSpace = THREE.SRGBColorSpace;
//   const material = new THREE.SpriteMaterial({ map: houseSprite });
//   const sprite = new THREE.Sprite(material);
//   sprite.position.y = 0.55;
//   sprite.position.x = 0.25;
//   sprite.scale.set(5, 2.5, 0);
//   return sprite;
// };

const house = async () => {
  const houseSprite = await gltfLoader.loadAsync('./models/house.glb');
  const model = houseSprite.scene;
  model.position.y = 1;
  model.rotation.y = Math.PI * 0.5;
  model.scale.set(0.5, 0.5, 0.5);

  return model;
};

export default house;
