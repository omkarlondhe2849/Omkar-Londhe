import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

export const CameraRig = ({ scrollProgressRef }) => {
  const lookHelper = useRef(new THREE.Vector3(0, 0, 0));

  // Create a cinematic banking flight path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 4, 30),
      new THREE.Vector3(15, 8, -60),
      new THREE.Vector3(-20, 5, -180),
      new THREE.Vector3(25, 12, -280),
      new THREE.Vector3(0, 6, -420)
    ]);
  }, []);

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current || 0;
    
    // Get position on curve based on scroll
    const targetPosition = curve.getPointAt(progress);
    
    // Get look-at target slightly ahead on the curve
    const lookAheadProgress = Math.min(progress + 0.05, 1.0);
    const curveLookAt = curve.getPointAt(lookAheadProgress);
    
    // Mouse Parallax Effect (expert level sway)
    const pxOffset = state.pointer.x * 6;
    const pyOffset = state.pointer.y * 4;

    // We add the mouse offset to the curve position
    const finalCamPos = [
      targetPosition.x + pxOffset,
      targetPosition.y + pyOffset,
      targetPosition.z
    ];

    // Damp camera position for silky smooth flight
    easing.damp3(
      state.camera.position, 
      finalCamPos, 
      0.4, 
      delta
    );

    // Also damp the lookAt target to avoid snapping
    easing.damp3(
      lookHelper.current,
      [curveLookAt.x, curveLookAt.y - 2, curveLookAt.z],
      0.3,
      delta
    );
    
    state.camera.lookAt(lookHelper.current);
    
    // Expert touch: banking/rolling the camera based on X offset and mouse
    const targetRotationZ = -(state.pointer.x * 0.1) - ((targetPosition.x - curveLookAt.x) * 0.015);
    easing.damp(state.camera.rotation, 'z', targetRotationZ, 0.4, delta);
  });

  return null;
};
