import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const blockSide = Math.sqrt(assetConfig.statue.blockSize) * globalConfig.grid.cellSize;
const { plantsPlacementMinus } = assetConfig.global;

const statueTexture = textureLoader.load('./sprite/statues/statue-1.png');
statueTexture.colorSpace = THREE.SRGBColorSpace;
const statueMat = new THREE.SpriteMaterial({ map: statueTexture, depthWrite: false });

const statue = async (point) => {
  const sprite = new THREE.Sprite(statueMat.clone());
  sprite.scale.set(blockSide * 1.5, blockSide * 1.5, blockSide * 1.5);
  sprite.position.set(
    point.x + plantsPlacementMinus,
    blockSide * 0.75,
    point.z + plantsPlacementMinus
  );
  return sprite;
};

export default statue;
