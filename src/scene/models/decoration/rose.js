import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const rose = async (point) => {
  const blockSide = Math.sqrt(assetConfig.rose.blockSize) * globalConfig.grid.cellSize;

  const roseTexture = textureLoader.load('./sprite/roses/rose-red.png');
  roseTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: roseTexture, depthWrite: false });
  const sprite = new THREE.Sprite(material);

  sprite.scale.set(blockSide * 1.5, blockSide * 1.5, blockSide * 1.5);
  sprite.position.set(point.x, 0.06, point.z);

  return sprite;
};

export default rose;
