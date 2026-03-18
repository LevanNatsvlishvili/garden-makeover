import gui from '@/utils/gui';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const tomato = async (point) => {
  const blockSide = assetConfig.tomato.blockSize * globalConfig.grid.cellSize;
  const { blockSizePlacementMinus } = assetConfig.global;

  const group = new THREE.Group();
  const ripeTexture = textureLoader.load('./sprite/tomato/ripe.png');
  ripeTexture.colorSpace = THREE.SRGBColorSpace;
  const ripeMaterial = new THREE.SpriteMaterial({ map: ripeTexture });
  const ripeSprite = new THREE.Sprite(ripeMaterial);

  ripeSprite.scale.set(blockSide, blockSide, blockSide);

  const growingTexture = textureLoader.load('./sprite/tomato/growing.png');
  growingTexture.colorSpace = THREE.SRGBColorSpace;
  const growingMaterial = new THREE.SpriteMaterial({ map: growingTexture });
  const growingSprite = new THREE.Sprite(growingMaterial);

  // Ripe Tomato
  ripeSprite.scale.set(blockSide, blockSide, blockSide);
  ripeSprite.position.set(
    point.x + blockSizePlacementMinus,
    blockSide * 0.25,
    point.z + blockSizePlacementMinus
  );
  ripeSprite.rotation.y = Math.PI * -0.5;
  ripeSprite.visible = false;

  console.log(blockSide);

  growingSprite.scale.set(blockSide, blockSide, blockSide);
  growingSprite.position.set(
    point.x + blockSizePlacementMinus,
    blockSide * 0.25,
    point.z + blockSizePlacementMinus
  );

  gui.add(growingSprite.position, 'y', -3, 3).name('Growing Tomato Position Y');
  gui.add(growingSprite.position, 'x', -3, 3).name('Growing Tomato Position X');
  gui.add(growingSprite.position, 'z', -3, 3).name('Growing Tomato Position Z');

  const actions = {
    switchTomato: () => {
      ripeSprite.visible = !ripeSprite.visible;
      growingSprite.visible = !growingSprite.visible;
    },
  };
  // gui.add(actions, 'switchTomato').name('Switch Tomato');

  group.add(ripeSprite);
  group.add(growingSprite);
  return group;
};

export default tomato;
