import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';

import { CameraRig } from './components/CameraRig';
import { EnvironmentScene } from './components/Environment';
import { CloudLandscape } from './components/zones/CloudLandscape';
import { Overlay } from './components/ui/Overlay';

// Bridge native DOM scroll to R3F using a simple, crash-proof event listener
// Note: Lenis natively updates window.scrollY, so this still works perfectly.
const ScrollBridge = ({ scrollProgressRef, scrollVelocityRef }) => {
  useEffect(() => {
    let lastScroll = window.scrollY;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = maxScroll > 0 ? currentScroll / maxScroll : 0;
      
      // Calculate simple velocity
      const velocity = currentScroll - lastScroll;
      if (scrollVelocityRef) {
        scrollVelocityRef.current = velocity;
      }
      lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgressRef, scrollVelocityRef]);
  
  return null;
};

export default function App() {
  const [dpr, setDpr] = useState(1.5);
  const scrollProgressRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  return (
    <main className="app-container">
      {/* Fixed 3D Canvas Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Canvas
          camera={{ position: [0, 4, 30], fov: 60 }}
          dpr={dpr}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: false }} 
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
          <color attach="background" args={['#f8fafc']} />
          <Suspense fallback={null}>
            <ScrollBridge scrollProgressRef={scrollProgressRef} scrollVelocityRef={scrollVelocityRef} />
            <CameraRig scrollProgressRef={scrollProgressRef} />
            <EnvironmentScene scrollVelocityRef={scrollVelocityRef} />
            
            {/* Unified Massive Landscape */}
            <CloudLandscape />
          </Suspense>
        </Canvas>
      </div>

      {/* Natively Scrolling HTML Layer */}
      <Overlay />
    </main>
  );
}
