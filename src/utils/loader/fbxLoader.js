import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import loadingManager from './loadingManager';

const fbxLoader = new FBXLoader(loadingManager);

export default fbxLoader;
