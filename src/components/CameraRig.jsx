import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { getTerrainHeight } from '../utils/terrainMath';

export const CameraRig = ({ scrollProgressRef }) => {
  const lookHelper = useRef(new THREE.Vector3(0, 0, 0));

  // We only define the 2D path (X, Z) here. Y will be calculated dynamically from the terrain.
  const path2D = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 30),
      new THREE.Vector3(15, 0, -60),
      new THREE.Vector3(-20, 0, -180),
      new THREE.Vector3(25, 0, -280),
      new THREE.Vector3(0, 0, -420)
    ]);
  }, []);

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current || 0;
    
    // Get baseline X, Z position on the curve based on scroll
    const target2D = path2D.getPointAt(progress);
    
    // Dynamically query the terrain height at this exact location
    // The terrain is shifted by -2 in CloudLandscape, so we account for that
    const terrainY = getTerrainHeight(target2D.x, target2D.z) - 2;
    
    // Camera flies at a consistent altitude over the mountains and valleys
    const altitude = 12; 
    const targetY = terrainY + altitude;
    
    // Get look-at target slightly ahead along the curve's tangent
    const tangent = path2D.getTangentAt(progress);
    const lookAheadDistance = 30; // Push lookAt forward in world space to prevent 90-degree flips
    const curveLookAt2D = target2D.clone().add(tangent.multiplyScalar(lookAheadDistance));
    const lookAtTerrainY = getTerrainHeight(curveLookAt2D.x, curveLookAt2D.z) - 2;
    
    // Mouse Parallax Effect (expert level sway)
    const pxOffset = state.pointer.x * 6;
    const pyOffset = state.pointer.y * 4;

    const finalCamPos = [
      target2D.x + pxOffset,
      targetY + pyOffset,
      target2D.z
    ];

    // Damp camera position for silky smooth flight mapping the terrain perfectly
    easing.damp3(state.camera.position, finalCamPos, 0.4, delta);

    // Look slightly downward at the terrain ahead
    easing.damp3(
      lookHelper.current,
      [curveLookAt2D.x, lookAtTerrainY + (altitude * 0.5), curveLookAt2D.z],
      0.3,
      delta
    );
    
    state.camera.lookAt(lookHelper.current);
    
    // Banking/rolling the camera based on corners
    const targetRotationZ = -(state.pointer.x * 0.1) - ((target2D.x - curveLookAt2D.x) * 0.015);
    easing.damp(state.camera.rotation, 'z', targetRotationZ, 0.4, delta);
  });

  return null;
};
