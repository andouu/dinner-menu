import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useFBX } from '@react-three/drei';
import './Intro.css';
import { Mesh } from 'three';

const STARTING_TEXT = 'ANDOU'.split('');

interface CharProps {
  char: string;
  animateState: { variant: 'idle' } | { variant: 'exploding', explodes: boolean };
};

const Char: React.FC<CharProps> = (props: CharProps) => {
  const { char, animateState } = props;

  const shouldExplode = animateState.variant === 'exploding' && animateState.explodes;
  const randomDirection = { x: Math.cos(Math.random() * 360), y: Math.sin(Math.random() * 360) };
  const randomMovementVector = { x: randomDirection.x * 1000, y: randomDirection.y * 1000 };
  const variants = {
    idle: {},
    exploding: {
      rotateZ: shouldExplode ? Math.random() * 360 : undefined,
      x: shouldExplode ? randomMovementVector.x : undefined,
      y: shouldExplode ? randomMovementVector.y : undefined,
    },
  };
  
  return (
    <motion.p
      className="intro-text-char"
      initial="idle"
      animate={animateState.variant}
      variants={variants}
    >
      {char}
    </motion.p>
  );
};

const Cube = () => {
  const mesh = useRef<Mesh>(null);
  const viewport = useThree();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh
      position={[0, -4, 0]}
      ref={mesh}
    >
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export const Intro = () => {
  const bagelFBX = useFBX('src/assets/model.fbx');
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
};