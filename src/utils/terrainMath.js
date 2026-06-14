export const getTerrainHeight = (x, z) => {
  const noiseScale = 0.1;
  const noiseAmp = 10.0;
  
  const nx = x * noiseScale;
  const nz = z * noiseScale;
  
  const y = (
    Math.sin(nx) * Math.cos(nz) * 1.2 +
    Math.sin(nx * 0.7 + 0.5) * 1.8 +
    Math.cos(nz * 1.2 - 0.3) * 1.3 +
    Math.sin(nx * 0.3 + nz * 0.5) * 2.0
  ) * noiseAmp * 0.35;
  
  return y - 14;
};
