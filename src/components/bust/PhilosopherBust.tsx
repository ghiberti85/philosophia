'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  MeshReflectorMaterial,
  OrbitControls,
  Sparkles,
  SpotLight,
  useGLTF,
} from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Group } from 'three';
import type { BustConfig } from '@/data/types';

/**
 * Museum-staged classical bust rendered with react-three-fiber.
 *
 * The stage is the wow factor: a volumetric spotlight cone, a reflective
 * dark-stone floor, drifting gold sparkles and warm rim light frame the
 * statue like an exhibit. The bust itself is procedural (config-driven),
 * with a GLB escape hatch for real photogrammetry scans — drop a scan in
 * /public/models and set `bust.modelPath` (see docs/3D-MODELS.md).
 */

function Marble({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.32}
      clearcoat={0.5}
      clearcoatRoughness={0.55}
      sheen={0.4}
      sheenColor="#fff6e0"
    />
  );
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
      {/* Pedestal: stepped base, fluted drum, gold ring */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.92, 1.02, 0.16, 64]} />
        <meshPhysicalMaterial color="#23272f" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.8, 0.88, 0.1, 64]} />
        <meshPhysicalMaterial color={pedestal} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <torusGeometry args={[0.74, 0.02, 16, 64]} />
        <meshPhysicalMaterial color="#d9ad4f" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.68, 0.42, 64]} />
        <Marble color={marble} />
      </mesh>
      {/* Draped shoulders, cut like a classical herm */}
      <mesh position={[0, 0.96, 0]} scale={[1.18, 0.66, 0.64]}>
        <sphereGeometry args={[0.66, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Marble color={marble} />
      </mesh>
      <mesh position={[0, 0.98, 0]} rotation={[Math.PI, 0, 0]} scale={[1.18, 0.28, 0.64]}>
        <sphereGeometry args={[0.66, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Marble color={marble} />
      </mesh>
      {/* Toga fold across the chest */}
      <mesh position={[0.18, 1.06, 0.3]} rotation={[0.5, 0.3, -0.7]} scale={[0.5, 0.12, 0.16]}>
        <sphereGeometry args={[1, 24, 16]} />
        <Marble color={marble} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.32, 32]} />
        <Marble color={marble} />
      </mesh>
      {/* Head, slightly tilted for life */}
      <group position={[0, 1.8, 0]} rotation={[0.04, 0.18, 0]}>
        <mesh scale={[headW, 0.76, 0.7]}>
          <sphereGeometry args={[1, 64, 48]} />
          <Marble color={marble} />
        </mesh>
        {/* Cheekbones */}
        <mesh position={[0.3, -0.1, 0.42]} scale={[0.18, 0.14, 0.12]}>
          <sphereGeometry args={[1, 24, 16]} />
          <Marble color={marble} />
        </mesh>
        <mesh position={[-0.3, -0.1, 0.42]} scale={[0.18, 0.14, 0.12]}>
          <sphereGeometry args={[1, 24, 16]} />
          <Marble color={marble} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.06, 0.64]} rotation={[Math.PI / 2.4, 0, 0]}>
          <coneGeometry args={[0.09, 0.32, 24]} />
          <Marble color={marble} />
        </mesh>
        {/* Brow ridge */}
        <mesh position={[0, 0.17, 0.52]} scale={[0.44, 0.08, 0.18]}>
          <sphereGeometry args={[1, 24, 16]} />
          <Marble color={marble} />
        </mesh>
        {/* Ears */}
        <mesh position={[headW * 0.95, -0.05, 0]} scale={[0.07, 0.16, 0.1]}>
          <sphereGeometry args={[1, 16, 12]} />
          <Marble color={marble} />
        </mesh>
        <mesh position={[-headW * 0.95, -0.05, 0]} scale={[0.07, 0.16, 0.1]}>
          <sphereGeometry args={[1, 16, 12]} />
          <Marble color={marble} />
        </mesh>
        {/* Hair cap */}
        {hair > 0.05 && (
          <mesh position={[0, 0.14, -0.06]} scale={[headW + 0.07, 0.64 + hair * 0.24, 0.74]}>
            <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.05]} />
            <Marble color={marble} />
          </mesh>
        )}
        {/* Beard */}
        {beard > 0.05 && (
          <mesh position={[0, -0.36 - beard * 0.18, 0.3]} scale={[headW * 0.8, 0.32 + beard * 0.5, 0.44]}>
            <sphereGeometry args={[1, 32, 24]} />
            <Marble color={marble} />
          </mesh>
        )}
      </group>
    </group>
  );
}

/** Slow turntable so the statue presents itself even before the user drags. */
function Turntable({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });
  return <group ref={group}>{children}</group>;
}

export default function PhilosopherBust({ config, label }: { config: BustConfig; label: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.4], fov: 36 }}
      dpr={[1, 2]}
      aria-label={label}
      role="img"
      className="touch-none"
    >
      <ambientLight intensity={0.18} />
      {/* Key: volumetric museum spotlight from above */}
      <SpotLight
        position={[0, 5.2, 1.6]}
        angle={0.5}
        penumbra={0.85}
        intensity={3}
        distance={9}
        attenuation={5.5}
        anglePower={4}
        color="#fff3da"
      />
      {/* Warm gold rim + cool fill */}
      <directionalLight position={[-5, 2, -3]} intensity={1.1} color="#e8c87a" />
      <directionalLight position={[5, 1, -2]} intensity={0.5} color="#9db4dd" />
      <Suspense fallback={null}>
        <Turntable>
          {config.modelPath ? <ScannedBust path={config.modelPath} /> : <ProceduralBust config={config} />}
        </Turntable>
        {/* Drifting gold dust */}
        <Sparkles count={70} scale={[3.6, 3.2, 3.6]} size={2.2} speed={0.25} color="#e8c87a" opacity={0.55} />
        {/* Polished dark-stone floor with real reflections */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
          <circleGeometry args={[3.6, 64]} />
          <MeshReflectorMaterial
            blur={[280, 80]}
            resolution={512}
            mixBlur={1}
            mixStrength={28}
            roughness={0.85}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.3}
            color="#11151f"
            metalness={0.55}
            mirror={0.6}
          />
        </mesh>
        <ContactShadows position={[0, -1.17, 0]} opacity={0.5} scale={6} blur={2.6} far={2.2} />
      </Suspense>
      {/* Rotation only — no zoom/pan, per the design brief. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.7}
        maxPolarAngle={Math.PI / 1.85}
      />
    </Canvas>
  );
}
