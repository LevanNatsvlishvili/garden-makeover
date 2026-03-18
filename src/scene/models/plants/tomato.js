import gui from '@/utils/gui';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const config = {
  shared: {
    position: {
      y: 0.125,
      z: 0,
      x: 2,
    },
    rotation: {
      y: Math.PI * -0.5,
    },
    scale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
  },
  blockSize: 4,
};

const tomato = async () => {
  const { shared } = config;
  const group = new THREE.Group();
  const ripeTexture = textureLoader.load('./sprite/tomato/ripe.png');
  ripeTexture.colorSpace = THREE.SRGBColorSpace;
  const ripeMaterial = new THREE.SpriteMaterial({ map: ripeTexture });
  const ripeSprite = new THREE.Sprite(ripeMaterial);

  const growingTexture = textureLoader.load('./sprite/tomato/growing.png');
  growingTexture.colorSpace = THREE.SRGBColorSpace;
  const growingMaterial = new THREE.SpriteMaterial({ map: growingTexture });
  const growingSprite = new THREE.Sprite(growingMaterial);

  // Ripe Tomato
  ripeSprite.scale.set(shared.scale.x, shared.scale.y, shared.scale.z);
  ripeSprite.position.y = shared.position.y;
  ripeSprite.rotation.y = Math.PI * -0.5;
  ripeSprite.position.x = shared.position.x;
  ripeSprite.position.z = shared.position.z;
  ripeSprite.visible = false;

  growingSprite.scale.set(shared.scale.x, shared.scale.y, shared.scale.z);
  growingSprite.position.y = shared.position.y;
  growingSprite.position.x = shared.position.x;
  growingSprite.position.z = shared.position.z;

  const actions = {
    switchTomato: () => {
      ripeSprite.visible = !ripeSprite.visible;
      growingSprite.visible = !growingSprite.visible;
    },
  };
  gui.add(actions, 'switchTomato').name('Switch Tomato');

  group.add(ripeSprite);
  group.add(growingSprite);
  return group;
};

export default tomato;
