import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';
import gui from '@/utils/gui';

const cucumber = async (point) => {
  const blockSide = assetConfig.cucumber.blockSize * globalConfig.grid.cellSize;
  const { blockSizePlacementMinus } = assetConfig.global;

  const group = new THREE.Group();

  const ripeTexture = textureLoader.load('./sprite/cucumber/ripe.png');
  ripeTexture.colorSpace = THREE.SRGBColorSpace;
  const ripeMaterial = new THREE.SpriteMaterial({ map: ripeTexture, depthWrite: false });
  const ripeSprite = new THREE.Sprite(ripeMaterial);

  const growingTexture = textureLoader.load('./sprite/cucumber/growing.png');
  growingTexture.colorSpace = THREE.SRGBColorSpace;
  const growingMaterial = new THREE.SpriteMaterial({ map: growingTexture, depthWrite: false });
  const growingSprite = new THREE.Sprite(growingMaterial);

  ripeSprite.scale.set(blockSide, blockSide, blockSide);
  ripeSprite.position.set(
    point.x + blockSizePlacementMinus,
    blockSide * 0.25,
    point.z + blockSizePlacementMinus
  );
  ripeSprite.rotation.y = Math.PI * -0.5;
  ripeSprite.visible = false;

  growingSprite.scale.set(blockSide, blockSide, blockSide);
  growingSprite.position.set(
    point.x + blockSizePlacementMinus,
    blockSide * 0.25,
    point.z + blockSizePlacementMinus
  );

  const actions = {
    switchCucumber: () => {
      ripeSprite.visible = !ripeSprite.visible;
      growingSprite.visible = !growingSprite.visible;
    },
  };
  gui.add(actions, 'switchCucumber').name('Switch Cucumber');

  group.add(ripeSprite);
  group.add(growingSprite);
  return group;
};

export default cucumber;
