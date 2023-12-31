import * as THREE from 'three';
import { Loader, useAspect, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex, useFlexSize } from '@react-three/flex';
import { SupportedTextLanguage, Text } from './Text';
import { motion } from 'framer-motion';
import { GLTFDraco, GLTFMaterials, GLTFNodes } from '../types/models';
import './Scene.css';
import { useMeal } from '../hooks/useMeal';
import { mealToState } from '../data/SceneState';

// useGLTF.preload(state.content.map((content) => content.model.path));

const state = mealToState.breakfast;

interface HeightReporterProps {
  onReflow: (width: number, height: number) => any;
};

const HeightReporter: React.FC<HeightReporterProps> = (props: HeightReporterProps) => {
  const { onReflow } = props;
  const size = useFlexSize();
  useLayoutEffect(() => onReflow && onReflow(size[0], size[1]), [onReflow, size]);
  return null;
};

export interface PageProps {
  text: string;
  lang: SupportedTextLanguage;
  tag: string;
  images: string[];
  model: {
    path: string;
    compose: (nodes: GLTFNodes, materials: GLTFMaterials ) => { geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[] }[];
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
  }
  textScaleFactor: number;
  onReflow: HeightReporterProps['onReflow'];
  left: boolean;
};

const Page: React.FC<PageProps> = (props: PageProps) => {
  const { text, lang, tag, model, textScaleFactor, onReflow, left } = props;

  const { viewport } = useThree();
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 1,
    marginLeft: Number(left) * 1,
    marginRight: Number(!left) * 1,
    width: 'auto',
    height: 'auto',
    minWidth: 3,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 6,
  };

  const { nodes, materials } = useGLTF(model.path) as GLTFDraco;
  const modelInfo = model.compose(nodes, materials);

  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current !== null) {
      modelRef.current.rotation.z += left ? 0.001 : -0.001;
    }
  });

  return (
    <Box dir="column" align={left ? 'flex-start' : 'flex-end'} justify="flex-start" width="100%" height="auto" minHeight="100%">
      <HeightReporter onReflow={onReflow} />
      <Box dir="row" width="100%" height="auto" justify={left ? 'flex-end' : 'flex-start'} margin={0} grow={1} wrap="wrap">
        <Box {...boxProps}>
          <group dispose={null}>
            <group ref={modelRef} scale={model.scale} position={model.position} rotation={model.rotation}>
              {modelInfo.map(({ geometry, material }, i) => (
                <mesh
                  key={geometry.name + i}
                  geometry={geometry}
                  material={material}
                />
              ))}
            </group>
          </group>
        </Box>
      </Box>
      <Box marginLeft={1.5} marginRight={1.5} marginTop={2}>
        <Text position={[left ? -0.25 : 0.25, 2.5, 1]} fontSize={1.5 * textScaleFactor} lineHeight={1} letterSpacing={-0.05} maxWidth={(viewport.width / 4) * 3} lang="en">
          {tag}
          <meshBasicMaterial color="#FFC73B" toneMapped={false} />
        </Text>
      </Box>
      <Box marginLeft={left ? 1.5 : 1} marginRight={left ? 1 : 1.5} marginBottom={1}>
        <Text
          lang={lang}
          bold
          position={[left ? -0.5 : 0.5, 2, 0.5]}
          textAlign={left ? 'left' : 'right'}
          fontSize={2 * textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          color="#141414"
          maxWidth={(viewport.width / 4) * 3}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export interface LayercardProps {
  depth: number;
  text: string;
  lang: SupportedTextLanguage;
  boxWidth: number;
  boxHeight: number;
  map?: THREE.Texture;
  textColor: string;
  color?: string;
  textScaleFactor: number;
};

const Layercard: React.FC<LayercardProps> = ({ depth, boxWidth, boxHeight, text, lang, textColor, color, textScaleFactor }: LayercardProps) => {
  const ref = useRef<THREE.MeshBasicMaterial>(null);
  const { viewport, size } = useThree();
  const pageLerp = useRef(state.top / size.height);
  const currentMeal = useMeal();
  console.log(`${currentMeal} threshold: ${state.threshold}`);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15));
    const threshold = state.threshold;
    if (depth >= 0 && ref.current !== null) {
      ref.current.opacity = page < threshold * 1.7 ? 1.7 : 1 - (page - threshold * 1.7);
    }
  });

  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial ref={ref} color={color}  toneMapped={false} transparent opacity={1} />
      </mesh>
      <Text
        bold
        lang={lang}
        position={[boxWidth / 2, -boxHeight / 2, depth + 1.5]}
        maxWidth={viewport.width / 2}
        anchorX="center"
        anchorY="middle"
        fontSize={1 * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}
      >
        {text}
      </Text>
    </>
  );
};

interface ContentProps {
  onReflow: (arg: any) => any;
};

const Content = (props: ContentProps) => {
  const { onReflow } = props;

  const group = useRef<THREE.Group>(null);

  const { viewport, size } = useThree();
  const [bW, bH] = useAspect(1920, 1920, 0.5);

  const vec = new THREE.Vector3();
  const pageLerp = useRef(state.top / size.height);

  const totalPages = state.totalPages;

  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15));
    const y = page * viewport.height;
    const threshold = state.threshold;
    const sticky = threshold * viewport.height;
    if (group.current !== null) {
      group.current.position.lerp(vec.set(0, page < threshold ? y : sticky, page < threshold ? 0 : page * 1.25), 0.15);
    }
  });

  const handleReflow = useCallback((_: number, height: number) => onReflow((state.pages = height / viewport.height + 5.5)), [onReflow, viewport.height]);
  const sizesRef = useRef<number[]>([]);
  const scale = Math.min(1, viewport.width / 16);

  return (
    <group ref={group}>
      <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]} onReflow={handleReflow}>
        {state.content.map((props, i) => (
          <Page
            key={i}
            {...props}
            left={!(i % 2)}
            textScaleFactor={scale}
            onReflow={(_, height) => {
              sizesRef.current[i] = height;
              state.threshold = Math.max(totalPages, (totalPages / (15.8 * totalPages)) * sizesRef.current.reduce((acc, e) => acc + e, 0));
            }}
          />
        ))}
        <Box dir="row" width="100%" height="100%" align="center" justify="center">
          <Box>
            <Layercard {...state.depthbox[0]} text={state.depthbox[1].text} boxWidth={bW} boxHeight={bH} textScaleFactor={scale} />
          </Box>
        </Box>
      </Flex>
    </group>
  );
};

export const Scene = () => {
  const scrollArea = useRef<HTMLDivElement>(null);
  const onScroll = (e: Partial<React.UIEvent<HTMLDivElement>>) => (state.top = (e.target as HTMLDivElement).scrollTop);
  useEffect(() => {
    if (scrollArea.current !== null) {
      void onScroll({ target: scrollArea.current });
    }
  }, []);

  const [pages, setPages] = useState<number>(0);

  return (
    <motion.div
      id="scene-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 2 }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], far: 1000 }}
        // gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false, depth: false }}
        onCreated={({ gl }) => gl.setClearColor('#FFEAC7')}
        style={{ zIndex: -1 }}
      >
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <ambientLight intensity={10} />
        <spotLight
          castShadow
          angle={0.3}
          penumbra={1}
          position={[0, 10, 20]}
          intensity={5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Content onReflow={setPages} />
        </Suspense>
      </Canvas>
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}
      >
        <div style={{ height: `${(pages) * 100}vh` }} />
      </div>
      <Loader />
    </motion.div>
  );
};