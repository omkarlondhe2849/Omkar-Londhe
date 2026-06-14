import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const EnvironmentScene = () => {
  const lightRefBlue = useRef();
  const lightRefPurple = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRefBlue.current) lightRefBlue.current.position.set(Math.sin(t * 0.5) * 25, 10, Math.cos(t * 0.3) * 25);
    if (lightRefPurple.current) lightRefPurple.current.position.set(Math.cos(t * 0.4) * 22, 8, Math.sin(t * 0.6) * 18 - 100);
  });

  return (
    <>


      <ambientLight intensity={1.8} color="#ffffff" />
      <directionalLight
        position={[15, 35, 10]}
        intensity={1.5}
        color="#e2e8f0"
      />
      <directionalLight
        position={[-10, 20, -50]}
        intensity={0.8}
        color="#bae6fd"
      />

      {/* Orbiting colored point lights */}
      <pointLight ref={lightRefBlue} intensity={4} color="#3b82f6" distance={100} />
      <pointLight ref={lightRefPurple} intensity={3} color="#6366f1" distance={100} />
    </>
  );
};
