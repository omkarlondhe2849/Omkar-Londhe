import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CloudLandscape = () => {
  const terrainRef = useRef();
  const cloudsRef = useRef();
  const instancedMeshRef = useRef();
  const cloudCount = 600;

  // Terrain geometry
  const { positions, colors, indices } = useMemo(() => {
    const width = 180, length = 460;
    const cols = 55, rows = 155;
    const noiseScale = 0.1, noiseAmp = 10.0;
    const verts = [], colsArr = [], inds = [];
    
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols - 0.5) * width;
        const z = (r / rows) * -length + 40;
        
        const nx = x * noiseScale, nz = z * noiseScale;
        // Richer rolling terrain with more variation
        const y = (
          Math.sin(nx) * Math.cos(nz) * 1.2 +
          Math.sin(nx * 0.7 + 0.5) * 1.8 +
          Math.cos(nz * 1.2 - 0.3) * 1.3 +
          Math.sin(nx * 0.3 + nz * 0.5) * 2.0
        ) * noiseAmp * 0.35;
        verts.push(x, y - 14, z);
        
        // Richer color palette with deeper hues
        const c1 = new THREE.Color('#38bdf8'); // Bright sky blue
        const c2 = new THREE.Color('#f9a8d4'); // Warm pink
        const c3 = new THREE.Color('#c4b5fd'); // Soft lavender
        const c4 = new THREE.Color('#ffffff'); // White
        
        const t = (Math.sin(nx * 0.35) + Math.cos(nz * 0.25) + 2) / 4;
        
        let col;
        if (t < 0.33) {
          col = c1.clone().lerp(c2, t * 3);
        } else if (t < 0.66) {
          col = c2.clone().lerp(c3, (t - 0.33) * 3);
        } else {
          col = c3.clone().lerp(c4, (t - 0.66) * 3);
        }
        
        colsArr.push(col.r, col.g, col.b);
      }
    }
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tl = r * (cols + 1) + c;
        const tr = tl + 1;
        const bl = tl + (cols + 1);
        const br = bl + 1;
        inds.push(tl, bl, tr, tr, bl, br);
      }
    }
    return {
      positions: new Float32Array(verts),
      colors: new Float32Array(colsArr),
      indices: new Uint16Array(inds)
    };
  }, []);

  // Floating orbs — much larger and more visible
  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < cloudCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 50 + 8,
        (Math.random() * -460) + 40
      );
      // Larger sizes so they're actually visible
      const scale = Math.random() * 0.8 + 0.2;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 4;
      cloudsRef.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.15) * 3;
      cloudsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group>
      {/* Terrain */}
      <mesh ref={terrainRef}>
        <bufferGeometry onUpdate={self => self.computeVertexNormals()}>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.8} 
          metalness={0.1} 
          side={THREE.DoubleSide} 
          flatShading={false} 
        />
      </mesh>

      {/* Floating Orbs — visible glass spheres */}
      <group ref={cloudsRef}>
        <instancedMesh ref={instancedMeshRef} args={[null, null, cloudCount]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#e0f2fe"
            emissive="#bae6fd"
            emissiveIntensity={0.3}
            transparent 
            opacity={0.6}
            roughness={0.4}
          />
        </instancedMesh>
      </group>
      
      {/* Large atmospheric glow spheres */}
      <mesh position={[-40, 5, -20]}>
        <sphereGeometry args={[35, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} transparent opacity={0.18} />
      </mesh>
      <mesh position={[55, -5, -100]}>
        <sphereGeometry args={[40, 32, 32]} />
        <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={2.0} transparent opacity={0.18} />
      </mesh>
      <mesh position={[-35, 12, -180]}>
        <sphereGeometry args={[45, 32, 32]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2.0} transparent opacity={0.18} />
      </mesh>
      <mesh position={[30, 8, -260]}>
        <sphereGeometry args={[38, 32, 32]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2.0} transparent opacity={0.15} />
      </mesh>
      <mesh position={[-50, 10, -340]}>
        <sphereGeometry args={[42, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.8} transparent opacity={0.14} />
      </mesh>
      <mesh position={[40, 14, -400]}>
        <sphereGeometry args={[35, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.0} transparent opacity={0.16} />
      </mesh>
    </group>
  );
};
