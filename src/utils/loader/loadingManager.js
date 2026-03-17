import * as THREE from 'three';

const loadInfo = new Map();
let startTimeAll = null;

export const loadingManager = new THREE.LoadingManager();

// When an item starts loading
loadingManager.onStart = (url, loaded, total) => {
  if (!startTimeAll) startTimeAll = performance.now();
  loadInfo.set(url, {
    start: performance.now(),
    end: null,
    size: null,
  });
  console.log(`⏳ Start: ${url}`);
};

// When an item finishes
loadingManager.onLoad = () => {
  const totalTime = (performance.now() - startTimeAll).toFixed(2);
  console.log(`\n✅ ALL LOADED in ${totalTime} ms\n`);
};

// When each item finishes (progress)
loadingManager.onProgress = (url, loaded, total) => {
  const entry = loadInfo.get(url);
  if (!entry) return;

  entry.end = performance.now();

  const duration = (entry.end - entry.start).toFixed(2);

  fetch(url, { method: 'HEAD' })
    .then((res) => {
      const size = +res.headers.get('Content-Length');
      entry.size = size;

      const sizeKB = (size / 1024).toFixed(1);
      const sizeMB = (size / 1024 / 1024).toFixed(2);

      console.log(
        `📦 Loaded (${loaded}/${total}): ${url}\n` +
          `   ⏱ Time: ${duration} ms\n` +
          `   💾 Size: ${sizeKB} KB (${sizeMB} MB)\n`
      );
      console.log('________________________________________________');
    })
    .catch(() => {
      console.log(
        `📦 Loaded (${loaded}/${total}): ${url}\n` + `   ⏱ Time: ${duration} ms (size unknown)\n`
      );
    });
};

// If loading fails
loadingManager.onError = (url) => {
  console.error(`❌ Error loading: ${url}`);
};

export default loadingManager;
