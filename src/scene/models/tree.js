// import gltfLoader from '@/utils/loader/gtlfLoader';
import * as THREE from 'three';

const tree = async () => {
  // const glb = await gltfLoader.loadAsync('./models/tree.glb');
  // const model = glb.scene;
  // model.traverse((child) => {
  //   if (child.isMesh) {
  //     // Dark grey color
  //     child.material.color.setHex(0x2f3a3b);
  //   }
  // });
  const model = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
  );
  // model.position.x = 3.75;
  // model.position.z = 5;

  // model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default tree;
