'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import type { BustConfig } from '@/data/types';

/**
 * Classical marble bust rendered with react-three-fiber.
 *
 * By default the bust is generated procedurally from `BustConfig`, which keeps
 * the repository free of heavy binary assets while still giving each
 * philosopher a distinct silhouette (head width, hair, beard, colors).
 *
 * For production-grade realism, drop a photogrammetry scan (e.g. from the
 * Scan the World museum archive) into /public/models/<slug>.glb and set
 * `bust.modelPath` — the GLB then replaces the procedural mesh automatically.
 * See docs/3D-MODELS.md for step-by-step instructions.
 */

function Marble({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.4} clearcoatRoughness={0.6} />;
}

function ScannedBust({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} position={[0, -1.1, 0]} />;
}

function ProceduralBust({ config }: { config: BustConfig }) {
  const { marble, pedestal, headWidth, beard, hair } = config;
  const headW = 0.62 * (0.8 + headWidth * 0.4);

  return (
    <group position={[0, -1.15, 0]}>
      {/* Pedestal */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.78, 0.9, 0.24, 48]} />
        <meshPhysicalMaterial color={pedestal} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.62, 0.68, 0.4, 48]} />
        <Marble color={marble} />
      </mesh>
      {/* Shoulders / chest, cut like a classical herm bust */}
      <mesh position={[0, 0.92, 0]} scale={[1.15, 0.62, 0.62]}>
        <sphereGeometry args={[0.66, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Marble color={marble} />
      </mesh>
      <mesh position={[0, 0.94, 0]} rotation={[Math.PI, 0, 0]} scale={[1.15, 0.25, 0.62]}>
        <sphereGeometry args={[0.66, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Marble color={marble} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.21, 0.26, 0.34, 32]} />
        <Marble color={marble} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.78, 0]} scale={[headW, 0.74, 0.68]}>
        <sphereGeometry args={[1, 48, 32]} />
        <Marble color={marble} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 1.72, 0.62]} rotation={[Math.PI / 2.4, 0, 0]}>
        <coneGeometry args={[0.09, 0.3, 24]} />
        <Marble color={marble} />
      </mesh>
      {/* Brow ridge */}
      <mesh position={[0, 1.95, 0.5]} scale={[0.42, 0.07, 0.18]}>
        <sphereGeometry args={[1, 24, 16]} />
        <Marble color={marble} />
      </mesh>
      {/* Hair cap */}
      {hair > 0.05 && (
        <mesh position={[0, 1.92, -0.06]} scale={[headW + 0.06, 0.62 + hair * 0.22, 0.72]}>
          <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
          <Marble color={marble} />
        </mesh>
      )}
      {/* Beard */}
      {beard > 0.05 && (
        <mesh position={[0, 1.45 - beard * 0.18, 0.3]} scale={[headW * 0.78, 0.3 + beard * 0.5, 0.42]}>
          <sphereGeometry args={[1, 32, 24]} />
          <Marble color={marble} />
        </mesh>
      )}
    </group>
  );
}

export default function PhilosopherBust({ config, label }: { config: BustConfig; label: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 4.2], fov: 38 }}
      dpr={[1, 2]}
      aria-label={label}
      role="img"
      className="touch-none"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#e8c87a" />
      <Suspense fallback={null}>
        {config.modelPath ? <ScannedBust path={config.modelPath} /> : <ProceduralBust config={config} />}
        <ContactShadows position={[0, -1.18, 0]} opacity={0.45} scale={6} blur={2.4} far={2} />
      </Suspense>
      {/* Rotation only — no zoom/pan, gently auto-rotating as requested. */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
