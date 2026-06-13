import React from 'react';
import { CameraRig } from './CameraRig';
import { EnvironmentScene } from './Environment';
import { Gateway } from './zones/Gateway';
import { Nexus } from './zones/Nexus';
import { Nebula } from './zones/Nebula';
import { Terminal } from './zones/Terminal';

// We adjust the Z positions of each zone to spread them out along the scroll path
const ZONE_OFFSETS = {
  gateway: 0,
  nexus: -40,
  nebula: -80,
  terminal: -120,
};

export const Experience = () => {
  return (
    <>
      <CameraRig offsets={ZONE_OFFSETS} />
      <EnvironmentScene />
      
      <group>
        <Gateway position={[0, 0, ZONE_OFFSETS.gateway]} />
        <Nexus position={[0, 0, ZONE_OFFSETS.nexus]} />
        <Nebula position={[0, 0, ZONE_OFFSETS.nebula]} />
        <Terminal position={[0, 0, ZONE_OFFSETS.terminal]} />
      </group>
    </>
  );
};
