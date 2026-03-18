import * as THREE from 'three';

const bush = async () => {
  const bushMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
  const bushGeometry = new THREE.BoxGeometry(0.1, 0.25, 0.1);
  const bush = new THREE.Mesh(bushGeometry, bushMaterial);
  bush.position.y = 0;
  bush.position.x = 2.5;
  bush.position.z = -2;
  return bush;
};

export default bush;
