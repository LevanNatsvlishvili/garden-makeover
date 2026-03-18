import * as THREE from 'three';
import { camera, renderer, scene } from './renderer';
import { config } from '../config/config';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const { cellSize, highlightColor, highlightOpacity, lineColor, lineOpacity } = config.grid;
const BLOCKED_COLOR = 0xff4444;
const groundSize = config.ground.size;
const halfGround = groundSize / 2;
const cellCount = Math.floor(groundSize / cellSize);

const occupiedCells = new Set();
const OCCUPIED_COLOR = 0xff8844;
const OCCUPIED_OPACITY = 0.25;

const occupiedGroup = new THREE.Group();
occupiedGroup.visible = false;
scene.add(occupiedGroup);

const occupiedMat = new THREE.MeshBasicMaterial({
  color: OCCUPIED_COLOR,
  transparent: true,
  opacity: OCCUPIED_OPACITY,
  side: THREE.DoubleSide,
  depthWrite: false,
});
const occupiedCellGeo = new THREE.PlaneGeometry(cellSize, cellSize);

const gridHelper = new THREE.GridHelper(groundSize, cellCount, lineColor, lineColor);
gridHelper.material.transparent = true;
gridHelper.material.opacity = lineOpacity;
gridHelper.position.y = 0.01;
gridHelper.visible = false;
scene.add(gridHelper);

const highlightGeo = new THREE.PlaneGeometry(1, 1);
const highlightMat = new THREE.MeshBasicMaterial({
  color: highlightColor,
  transparent: true,
  opacity: highlightOpacity,
  side: THREE.DoubleSide,
  depthWrite: false,
});
const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
highlightMesh.rotation.x = -Math.PI * 0.5;
highlightMesh.position.y = 0.02;
highlightMesh.visible = false;
scene.add(highlightMesh);

let active = false;
let groundMesh = null;
let spawnCallback = null;
let currentSide = 1;
let canPlace = true;

function cellKey(x, z) {
  return `${x.toFixed(4)},${z.toFixed(4)}`;
}

function getCellsForBlock(cx, cz, side) {
  const cells = [];
  const half = (side - 1) * cellSize * 0.5;
  for (let ix = 0; ix < side; ix++) {
    for (let iz = 0; iz < side; iz++) {
      const x = cx - half + ix * cellSize;
      const z = cz - half + iz * cellSize;
      cells.push(cellKey(x, z));
    }
  }
  return cells;
}

function isBlocked(cx, cz, side) {
  const cells = getCellsForBlock(cx, cz, side);
  return cells.some((key) => occupiedCells.has(key));
}

function markOccupied(cx, cz, side) {
  const half = (side - 1) * cellSize * 0.5;
  for (let ix = 0; ix < side; ix++) {
    for (let iz = 0; iz < side; iz++) {
      const x = cx - half + ix * cellSize;
      const z = cz - half + iz * cellSize;
      const key = cellKey(x, z);
      if (!occupiedCells.has(key)) {
        occupiedCells.add(key);
        const mesh = new THREE.Mesh(occupiedCellGeo, occupiedMat);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.position.set(x, 0.015, z);
        occupiedGroup.add(mesh);
      }
    }
  }
}

function setHighlightSize(blockSize) {
  const side = Math.sqrt(blockSize);
  currentSide = side;
  const worldSize = side * cellSize;
  highlightMesh.scale.set(worldSize, worldSize, 1);
}

function snapToGrid(value, side) {
  if (side % 2 === 0) {
    return Math.round(value / cellSize) * cellSize;
  }
  return Math.floor(value / cellSize) * cellSize + cellSize * 0.5;
}

function clampToGround(val, side) {
  const halfSpan = side * cellSize * 0.5;
  return Math.max(-halfGround + halfSpan, Math.min(halfGround - halfSpan, val));
}

function getGridPoint(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(groundMesh);
  if (hits.length === 0) return null;

  const p = hits[0].point;
  return {
    x: clampToGround(snapToGrid(p.x, currentSide), currentSide),
    y: 0,
    z: clampToGround(snapToGrid(p.z, currentSide), currentSide),
  };
}

function onPointerMove(event) {
  if (!active || !groundMesh) return;

  const snapped = getGridPoint(event);
  if (snapped) {
    highlightMesh.position.x = snapped.x;
    highlightMesh.position.z = snapped.z;
    highlightMesh.visible = true;

    canPlace = !isBlocked(snapped.x, snapped.z, currentSide);
    highlightMat.color.setHex(canPlace ? highlightColor : BLOCKED_COLOR);
    highlightMat.opacity = canPlace ? highlightOpacity : 0.45;
  } else {
    highlightMesh.visible = false;
  }
}

function onPointerDown(event) {
  if (!active || !groundMesh) return;

  const snapped = getGridPoint(event);
  if (snapped && spawnCallback && canPlace) {
    markOccupied(snapped.x, snapped.z, currentSide);
    spawnCallback(new THREE.Vector3(snapped.x, snapped.y, snapped.z));
  }
}

function showGrid(visible) {
  gridHelper.visible = visible;
  occupiedGroup.visible = visible;
  highlightMesh.visible = false;
  renderer.domElement.style.cursor = visible ? 'crosshair' : '';
}

export function activate(ground, callback, blockSize = 1) {
  active = true;
  groundMesh = ground;
  spawnCallback = callback;
  setHighlightSize(blockSize);
  showGrid(true);
}

export function deactivate() {
  active = false;
  groundMesh = null;
  spawnCallback = null;
  showGrid(false);
}

export function isActive() {
  return active;
}

renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('pointerdown', onPointerDown);
