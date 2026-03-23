import * as THREE from 'three';
import fbxLoader from '@/utils/loader/fbxLoader';
import { config as globalConfig } from '@/config/config';
import state from '@/store/state';

const { startingPosition } = globalConfig.character;
export const torchLight = new THREE.PointLight(0xffa733, 1.6, 4, 2);

const BASE_PATH = './models/character_2/';

const character = async () => {
  const model = await fbxLoader.loadAsync(`${BASE_PATH}char-with-slash.fbx`);

  console.log(model);

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
  torchLight.position.y = 1.1;
  torchLight.position.x = 0.51;
  torchLight.intensity = state.isDay ? 0 : 1.5;
  torchLight.distance = 8;
  torchLight.decay = 1;
  model.add(torchLight);

  const mixer = new THREE.AnimationMixer(model);
  const clips = [...model.animations];

  const slashClip = clips.find((c) => c.name === 'mixamo.com');
  if (slashClip) slashClip.name = 'slash';

  const [idleFbx, walkFbx] = await Promise.all([
    fbxLoader.loadAsync(`${BASE_PATH}idle.fbx`),
    fbxLoader.loadAsync(`${BASE_PATH}walking.fbx`),
  ]);

  for (const clip of idleFbx.animations) {
    clip.name = 'idle';
    clips.push(clip);
  }
  for (const clip of walkFbx.animations) {
    clip.name = 'walk';
    clips.push(clip);
  }

  console.log(
    'Character animations:',
    clips.map((c) => c.name)
  );

  return { model, mixer, clips };
};

export default character;
