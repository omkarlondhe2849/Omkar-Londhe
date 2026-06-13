import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

export const EnvironmentScene = ({ scrollVelocityRef }) => {
  const lightRefBlue = useRef();
  const lightRefPurple = useRef();
  const lightRefCyan = useRef();
  const lightRefWarm = useRef();
  
  // Create a stable Vector2 for the offset that we can safely mutate in useFrame
  const chromOffset = useMemo(() => new THREE.Vector2(0.001, 0.001), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRefBlue.current) lightRefBlue.current.position.set(Math.sin(t * 0.5) * 25, 10, Math.cos(t * 0.3) * 25);
    if (lightRefPurple.current) lightRefPurple.current.position.set(Math.cos(t * 0.4) * 22, 8, Math.sin(t * 0.6) * 18 - 100);
    if (lightRefCyan.current) lightRefCyan.current.position.set(Math.sin(t * 0.7) * 20, 12, Math.cos(t * 0.5) * 15 - 200);
    if (lightRefWarm.current) lightRefWarm.current.position.set(Math.cos(t * 0.35) * 18, 10, Math.sin(t * 0.45) * 20 - 320);

    // Velocity based post processing (Speed Warp Effect)
    if (scrollVelocityRef) {
      // Map velocity to a distortion offset
      const velocity = Math.abs(scrollVelocityRef.current || 0);
      // Target offset increases with speed
      const targetVal = 0.001 + (velocity * 0.0005);
      
      // Smoothly lerp our memoized vector
      chromOffset.lerp(new THREE.Vector2(targetVal, targetVal), 0.1);
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={['#f0f4f8', 0.004]} />
      
      <ambientLight intensity={1.4} color="#ffffff" />
      <directionalLight 
        position={[15, 35, 10]} 
        intensity={2.5} 
        color="#fff5e6"
      />
      <directionalLight 
        position={[-10, 20, -50]} 
        intensity={1.0} 
        color="#e0e7ff"
      />

      {/* Orbiting colored point lights */}
      <pointLight ref={lightRefBlue} intensity={6} color="#bae6fd" distance={70} />
      <pointLight ref={lightRefPurple} intensity={5} color="#ddd6fe" distance={60} />
      <pointLight ref={lightRefCyan} intensity={5} color="#a7f3d0" distance={55} />
      <pointLight ref={lightRefWarm} intensity={4} color="#fde68a" distance={50} />

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={0.8} 
          mipmapBlur 
          intensity={0.8}
        />
        <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL} 
          offset={chromOffset} 
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
};
