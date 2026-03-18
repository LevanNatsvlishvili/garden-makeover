import gltfLoader from '@/utils/loader/gltfLoader';

const well = async () => {
  const wellSprite = await gltfLoader.loadAsync('./models/well.glb');
  const model = wellSprite.scene;
  model.scale.set(0.25, 0.25, 0.25);
  model.position.y = 0.4;
  model.rotation.y = Math.PI * 0.5;
  model.position.x = 2;
  model.position.z = -1;
  return model;
};

export default well;
