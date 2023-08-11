import { Mesh } from 'three';
import { useGLTF } from '@react-three/drei';

export type GLTF = ReturnType<typeof useGLTF>;

export type GLTFDraco = GLTF & { nodes: { [modelName: string]: Mesh } , materials: { [materialName: string]: THREE.Material } };

export type GLTFNodes = {
  [modelName: string]: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>;
};

export type GLTFMaterials = {
  [materialName: string]: THREE.Material;
};