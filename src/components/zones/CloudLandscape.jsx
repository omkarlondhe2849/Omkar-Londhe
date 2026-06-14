import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getTerrainHeight } from '../../utils/terrainMath';

export const CloudLandscape = () => {
  const terrainRef = useRef();

  // Clean, lightweight tech-wireframe geometry
  const { positions, indices } = useMemo(() => {
    const width = 400, length = 800;
    // Ultra-lightweight resolution for integrated GPUs
    const cols = 25, rows = 50; 
    const verts = [], inds = [];
    
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols - 0.5) * width;
        const z = (r / rows) * -length + 40;
        const y = getTerrainHeight(x, z);
        verts.push(x, y, z);
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
      indices: new Uint16Array(inds)
    };
  }, []);

  return (
    <group>
      {/* Sleek architectural wireframe terrain */}
      <mesh ref={terrainRef} position={[0, -2, 0]}>
        <bufferGeometry onUpdate={self => self.computeVertexNormals()}>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial 
          color="#94a3b8" 
          wireframe={true}
          transparent={true}
          opacity={0.3}
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Optional faint solid base under the wireframe so it's not totally transparent */}
      <mesh position={[0, -2.1, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshBasicMaterial color="#f8fafc" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
