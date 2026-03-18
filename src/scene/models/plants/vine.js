import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';
import gui from '@/utils/gui';

const vine = async (point) => {
  const blockSide = assetConfig.vine.blockSize * globalConfig.grid.cellSize;
  const { plantsPlacementMinus } = assetConfig.global;

  const group = new THREE.Group();

  const ripeTexture = textureLoader.load('./sprite/vine/ripe.png');
  ripeTexture.colorSpace = THREE.SRGBColorSpace;
  const ripeMaterial = new THREE.SpriteMaterial({ map: ripeTexture, depthWrite: false });
  const ripeSprite = new THREE.Sprite(ripeMaterial);

  const growingTexture = textureLoader.load('./sprite/vine/growing.png');
  growingTexture.colorSpace = THREE.SRGBColorSpace;
  const growingMaterial = new THREE.SpriteMaterial({ map: growingTexture, depthWrite: false });
  const growingSprite = new THREE.Sprite(growingMaterial);

  ripeSprite.scale.set(blockSide, blockSide, blockSide);
  ripeSprite.position.set(
    point.x + plantsPlacementMinus,
    blockSide * 0.25,
    point.z + plantsPlacementMinus
  );
  ripeSprite.rotation.y = Math.PI * -0.5;
  ripeSprite.visible = false;

  growingSprite.scale.set(blockSide, blockSide, blockSide);
  growingSprite.position.set(
    point.x + plantsPlacementMinus,
    blockSide * 0.25,
    point.z + plantsPlacementMinus
  );

  const actions = {
    switchVine: () => {
      ripeSprite.visible = !ripeSprite.visible;
      growingSprite.visible = !growingSprite.visible;
    },
  };
  // gui.add(actions, 'switchVine').name('Switch Vine');

  group.add(ripeSprite);
  group.add(growingSprite);
  return group;
};

export default vine;
