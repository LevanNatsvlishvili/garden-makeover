import * as THREE from 'three';
import fbxLoader from '@/utils/loader/fbxLoader';
import { config as globalConfig } from '@/config/config';
import state from '@/store/state';

const { startingPosition } = globalConfig.character;
export const torchLight = new THREE.PointLight(0xffa733, 1.6, 4, 2);

const BASE_PATH = './models/character_2/';

const character = async () => {
  const model = await fbxLoader.loadAsync(`${BASE_PATH}char-with-slash.fbx`);

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  model.scale.set(0.001, 0.001, 0.001);
  model.rotation.y = Math.PI * 0.5;
  model.position.set(startingPosition.x, startingPosition.y - 0.1, startingPosition.z);

  torchLight.shadow.mapSize.set(512, 512);
  torchLight.shadow.radius = 2;
  torchLight.intensity = state.isDay ? 0 : 1.5;
  torchLight.distance = 8;
  torchLight.decay = 1;

  const mixer = new THREE.AnimationMixer(model);
  const clips = [...model.animations];

  const slashClip = clips.find((c) => c.name === 'mixamo.com');
  if (slashClip) slashClip.name = 'slash';

  const [idleFbx, walkFbx, swordFbx, lanternFbx] = await Promise.all([
    fbxLoader.loadAsync(`${BASE_PATH}idle.fbx`),
    fbxLoader.loadAsync(`${BASE_PATH}walking.fbx`),
    fbxLoader.loadAsync(`${BASE_PATH}sword.fbx`),
    fbxLoader.loadAsync(`${BASE_PATH}lantern.fbx`),
  ]);

  for (const clip of idleFbx.animations) {
    clip.name = 'idle';
    clips.push(clip);
  }
  for (const clip of walkFbx.animations) {
    clip.name = 'walk';
    clips.push(clip);
  }

  // swordPivot origin = hilt; sword mesh is offset inside it so the blade extends away
  const swordPivot = new THREE.Group();
  swordFbx.rotation.x = Math.PI * -0.5;
  swordFbx.rotation.y = Math.PI * 0.5;
  swordFbx.position.y = 20; // shift sword so hilt end sits at pivot origin
  swordFbx.position.z = -32; // shift sword so hilt end sits at pivot origin
  swordFbx.position.x = 10; // shift sword so hilt end sits at pivot origin
  swordFbx.scale.set(0.5, 0.5, 0.5);
  swordPivot.add(swordFbx);

  const rightHand = model.getObjectByName('RightHand');
  if (rightHand) {
    swordFbx.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    rightHand.add(swordPivot);
  } else {
    console.warn('Right hand bone not found — sword not attached');
  }

  // swordPivot origin = hilt; sword mesh is offset inside it so the blade extends away
  const lanternPivot = new THREE.Group();
  lanternFbx.rotation.x = Math.PI * -1;
  lanternFbx.rotation.y = Math.PI * 0.5;
  lanternFbx.position.y = 40; // shift sword so hilt end sits at pivot origin
  lanternFbx.position.x = -5; // shift sword so hilt end sits at pivot origin
  lanternFbx.scale.set(0.25, 0.25, 0.25);
  lanternPivot.add(lanternFbx);

  const lanternHand = model.getObjectByName('LeftHand');
  if (lanternHand) {
    lanternFbx.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
    torchLight.position.set(0, 30, 0);
    lanternPivot.add(torchLight);
    lanternHand.add(lanternPivot);
  } else {
    console.warn('Left hand bone not found — lantern not attached');
  }

  return { model, mixer, clips };
};

export default character;
