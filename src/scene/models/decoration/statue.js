import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { assetConfig } from '@/config/assetConfig';
import { config as globalConfig } from '@/config/config';

const blockSide = Math.sqrt(assetConfig.statue.blockSize) * globalConfig.grid.cellSize;
const { plantsPlacementMinus } = assetConfig.global;

const statueTexture1 = textureLoader.load('./sprite/statues/statue-1.png');
statueTexture1.colorSpace = THREE.SRGBColorSpace;
const statueMat1 = new THREE.SpriteMaterial({ map: statueTexture1, depthWrite: false });

const statueTexture2 = textureLoader.load('./sprite/statues/statue-2.png');
statueTexture2.colorSpace = THREE.SRGBColorSpace;
const statueMat2 = new THREE.SpriteMaterial({ map: statueTexture2, depthWrite: false });

const statueTexture3 = textureLoader.load('./sprite/statues/statue-3.png');
statueTexture3.colorSpace = THREE.SRGBColorSpace;
const statueMat3 = new THREE.SpriteMaterial({ map: statueTexture3, depthWrite: false });

const statArr = [statueMat1, statueMat2, statueMat3];
console.log(statArr);

const statue = async (point, id = 1) => {
  const statueMat = statArr[id - 1];
  console.log(statueMat);
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
