import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const blockSide = Math.sqrt(assetConfig.rose.blockSize) * globalConfig.grid.cellSize;

const roseRedTexture = textureLoader.load('./sprite/roses/rose-red.png');
roseRedTexture.colorSpace = THREE.SRGBColorSpace;
const roseRedMat = new THREE.SpriteMaterial({ map: roseRedTexture, depthWrite: false });

const roseYellowTexture = textureLoader.load('./sprite/roses/rose-yellow.png');
roseYellowTexture.colorSpace = THREE.SRGBColorSpace;
const roseYellowMat = new THREE.SpriteMaterial({ map: roseYellowTexture, depthWrite: false });

const rose = async (point, color = 'red') => {
  const sprite = new THREE.Sprite(color === 'red' ? roseRedMat.clone() : roseYellowMat.clone());
  sprite.scale.set(blockSide * 1.5, blockSide * 1.5, blockSide * 1.5);
  sprite.position.set(point.x, 0.06, point.z);
  return sprite;
};

export default rose;
