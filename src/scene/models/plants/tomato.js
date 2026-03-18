import gui from '@/utils/gui';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const tomato = async (point) => {
  const blockSide = assetConfig.tomato.blockSize * globalConfig.grid.cellSize;
  const { plantsPlacementMinus } = assetConfig.global;

  const group = new THREE.Group();
  const ripeTexture = textureLoader.load('./sprite/tomato/ripe.png');
  ripeTexture.colorSpace = THREE.SRGBColorSpace;
  const ripeMaterial = new THREE.SpriteMaterial({ map: ripeTexture, depthWrite: false });
  const ripeSprite = new THREE.Sprite(ripeMaterial);

  ripeSprite.scale.set(blockSide, blockSide, blockSide);

  const growingTexture = textureLoader.load('./sprite/tomato/growing.png');
  growingTexture.colorSpace = THREE.SRGBColorSpace;
  const growingMaterial = new THREE.SpriteMaterial({ map: growingTexture, depthWrite: false });
  const growingSprite = new THREE.Sprite(growingMaterial);

  // Ripe Tomato
  ripeSprite.scale.set(blockSide, blockSide, blockSide);
  ripeSprite.position.set(
    point.x + plantsPlacementMinus,
    blockSide * 0.25,
    point.z + plantsPlacementMinus
  );
  ripeSprite.rotation.y = Math.PI * -0.5;
  ripeSprite.visible = false;

  console.log(blockSide);

  growingSprite.scale.set(blockSide, blockSide, blockSide);
  growingSprite.position.set(
    point.x + plantsPlacementMinus,
    blockSide * 0.25,
    point.z + plantsPlacementMinus
  );

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
