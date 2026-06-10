'use client';

import { useEffect, type ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sky, Sparkles, ContactShadows, Float } from '@react-three/drei';
import type { School } from '@/data/types';

// ── Camera ───────────────────────────────────────────────────────────────────

function IsometricCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 3, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

// ── Shared material shorthands ────────────────────────────────────────────────

function Marble({ color = '#f0ece4' }: { color?: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.28} clearcoat={0.35} clearcoatRoughness={0.5} />;
}

// ── Primitive components ──────────────────────────────────────────────────────

function Column({ position, height = 2.85 }: { position: [number, number, number]; height?: number }) {
  const r = 0.155;
  const shaft = height - 0.52;
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[r * 1.55, r * 1.55, 0.2, 20]} />
        <Marble color="#ece8e0" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft / 2, 0]}>
        <cylinderGeometry args={[r * 0.85, r, shaft, 20]} />
        <Marble />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft + 0.13, 0]}>
        <cylinderGeometry args={[r * 1.8, r * 0.85, 0.26, 20]} />
        <Marble color="#ece8e0" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft + 0.28, 0]}>
        <boxGeometry args={[r * 3.8, 0.12, r * 3.8]} />
        <Marble color="#ece8e0" />
      </mesh>
    </group>
  );
}

function Platform() {
  return (
    <group>
      <mesh receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[9.2, 0.4, 6.8]} />
        <meshPhysicalMaterial color="#c0b8a8" roughness={0.75} clearcoat={0.04} />
      </mesh>
      <mesh receiveShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[7.6, 0.42, 5.4]} />
        <meshPhysicalMaterial color="#ccc4b4" roughness={0.7} clearcoat={0.07} />
      </mesh>
      <mesh receiveShadow castShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[6.3, 0.42, 4.1]} />
        <meshPhysicalMaterial color="#ede8de" roughness={0.6} clearcoat={0.12} />
      </mesh>
    </group>
  );
}

function CypressTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#7a5b3a" roughness={0.9} />
      </mesh>
      {(
        [
          { y: 1.0, r: 0.68, h: 1.4, c: '#2d5a3d' },
          { y: 1.85, r: 0.5, h: 1.2, c: '#336645' },
          { y: 2.55, r: 0.33, h: 0.95, c: '#3d7550' },
          { y: 3.12, r: 0.18, h: 0.65, c: '#488860' },
        ] as const
      ).map(({ y, r, h, c }, i) => (
        <mesh key={i} castShadow position={[0, y, 0]}>
          <coneGeometry args={[r, h, 8]} />
          <meshStandardMaterial color={c} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Brazier({ position, accent }: { position: [number, number, number]; accent: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#8a6030" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.18, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c08040" metalness={0.7} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0.95, 0]} intensity={1.4} distance={5} color="#f09a3f" />
      <Sparkles position={[0, 1.05, 0]} count={14} scale={0.65} size={2.8} speed={0.9} color="#f5c96a" />
    </group>
  );
}

function Urn({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.08, 16]} />
        <Marble color="#c8bead" />
      </mesh>
      <mesh castShadow position={[0, 0.28, 0]} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[0.18, 16, 12]} />
        <Marble color="#d4c9b8" />
      </mesh>
      <mesh castShadow position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.06, 16]} />
        <Marble color="#c8bead" />
      </mesh>
    </group>
  );
}

// ── Scene components ──────────────────────────────────────────────────────────

function Temple({ accent, columns }: { accent: string; columns: 3 | 4 | 5 }) {
  const SPAN = 5.0;
  const xs = Array.from({ length: columns }, (_, i) => -SPAN / 2 + (SPAN / (columns - 1)) * i);
  const BASE = 1.27;
  const COL_H = 2.85;
  const ROOF = BASE + COL_H + 0.4 + 0.12;

  return (
    <group>
      <Platform />
      <mesh receiveShadow castShadow position={[0, BASE + 0.03, 0]}>
        <boxGeometry args={[6.3, 0.05, 4.1]} />
        <meshPhysicalMaterial color="#f0ebe0" roughness={0.5} clearcoat={0.2} />
      </mesh>
      {xs.map((cx) => (
        <group key={cx}>
          <Column position={[cx, BASE + 0.05, 1.72]} height={COL_H} />
          <Column position={[cx, BASE + 0.05, -1.72]} height={COL_H} />
        </group>
      ))}
      {/* Side columns flanking the cella */}
      {[-0.9, 0.9].map((z) => (
        <group key={z}>
          <Column position={[-SPAN / 2, BASE + 0.05, z]} height={COL_H} />
          <Column position={[SPAN / 2, BASE + 0.05, z]} height={COL_H} />
        </group>
      ))}
      {/* Entablature */}
      <mesh castShadow receiveShadow position={[0, ROOF - 0.19, 0]}>
        <boxGeometry args={[6.5, 0.38, 4.22]} />
        <meshPhysicalMaterial color="#ede8de" roughness={0.55} clearcoat={0.1} />
      </mesh>
      {/* Frieze band with accent colour */}
      <mesh position={[0, ROOF + 0.01, 0]}>
        <boxGeometry args={[6.5, 0.22, 4.22]} />
        <meshStandardMaterial color={accent} roughness={0.6} transparent opacity={0.55} />
      </mesh>
      {/* Cella */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + COL_H / 2, 0]}>
        <boxGeometry args={[4.1, COL_H, 3.1]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.55} clearcoat={0.08} />
      </mesh>
      {/* Pediment front base */}
      <mesh castShadow receiveShadow position={[0, ROOF + 0.24, 2.12]}>
        <boxGeometry args={[6.5, 0.13, 0.24]} />
        <Marble color="#ece8e0" />
      </mesh>
      {/* Pediment sloped sides */}
      <mesh castShadow position={[-1.85, ROOF + 0.88, 2.12]} rotation={[0, 0, Math.PI / 5.6]}>
        <boxGeometry args={[4.35, 0.17, 0.22]} />
        <Marble color="#ece8e0" />
      </mesh>
      <mesh castShadow position={[1.85, ROOF + 0.88, 2.12]} rotation={[0, 0, -Math.PI / 5.6]}>
        <boxGeometry args={[4.35, 0.17, 0.22]} />
        <Marble color="#ece8e0" />
      </mesh>
      {/* Accent medallion */}
      <mesh position={[0, ROOF + 1.48, 2.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color={accent} metalness={0.55} roughness={0.28} />
      </mesh>
      <CypressTree position={[-4.8, 0, 3.0]} scale={1.1} />
      <CypressTree position={[4.8, 0, 3.0]} scale={0.92} />
      <Urn position={[-2.2, BASE + 0.05, 2.25]} />
      <Urn position={[2.2, BASE + 0.05, 2.25]} />
      <Brazier position={[-1.2, BASE + 0.05, 2.42]} accent={accent} />
      <Brazier position={[1.2, BASE + 0.05, 2.42]} accent={accent} />
    </group>
  );
}

function Stoa({ accent }: { accent: string }) {
  const BASE = 1.27;
  const COL_H = 3.0;
  const colXs: number[] = [-4.2, -2.5, -0.8, 0.9, 2.6, 4.3];

  return (
    <group>
      <Platform />
      {/* Back wall */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 1.8, -1.8]}>
        <boxGeometry args={[9.5, 3.6, 0.45]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.55} clearcoat={0.08} />
      </mesh>
      {/* Fresco band */}
      <mesh position={[0, BASE + 0.05 + 2.45, -1.56]}>
        <boxGeometry args={[9.4, 0.55, 0.05]} />
        <meshStandardMaterial color={accent} roughness={0.7} transparent opacity={0.5} />
      </mesh>
      {colXs.map((cx) => (
        <Column key={cx} position={[cx, BASE + 0.05, 1.72]} height={COL_H} />
      ))}
      {/* Entablature */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + COL_H + 0.2, 0]}>
        <boxGeometry args={[9.7, 0.38, 3.85]} />
        <meshPhysicalMaterial color="#ede8de" roughness={0.55} clearcoat={0.1} />
      </mesh>
      {/* Roof */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + COL_H + 0.6, 0]}>
        <boxGeometry args={[9.7, 0.22, 4.1]} />
        <meshStandardMaterial color={accent} roughness={0.65} transparent opacity={0.5} />
      </mesh>
      {/* Bench */}
      <mesh castShadow receiveShadow position={[0.5, BASE + 0.35, 1.1]}>
        <boxGeometry args={[3.5, 0.25, 0.4]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.5} clearcoat={0.15} />
      </mesh>
      {/* Scrolls */}
      {[-0.8, 0.0, 0.8].map((x) => (
        <mesh key={x} castShadow position={[x, BASE + 0.44, 1.28]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 16]} />
          <meshStandardMaterial color="#e9ddbe" roughness={0.7} />
        </mesh>
      ))}
      <CypressTree position={[-5.2, 0, 2.6]} scale={1.05} />
      <Urn position={[4.5, BASE + 0.05, 2.0]} />
      <Brazier position={[5.5, BASE + 0.05, 2.0]} accent={accent} />
    </group>
  );
}

function Observatory({ accent }: { accent: string }) {
  const BASE = 1.27;

  return (
    <group>
      <Platform />
      {/* Tower */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 2.5, 0]}>
        <boxGeometry args={[4.5, 5.0, 4.5]} />
        <meshPhysicalMaterial color="#e0dbd0" roughness={0.6} clearcoat={0.1} />
      </mesh>
      {/* Arched door */}
      <mesh position={[0, BASE + 0.05 + 1.1, 2.28]}>
        <boxGeometry args={[0.9, 2.2, 0.1]} />
        <meshStandardMaterial color="#1e2230" roughness={0.9} />
      </mesh>
      {/* Star chart band */}
      <mesh position={[0, BASE + 0.05 + 3.85, 2.27]}>
        <boxGeometry args={[4.4, 0.55, 0.06]} />
        <meshStandardMaterial color={accent} roughness={0.6} transparent opacity={0.5} />
      </mesh>
      {/* Upper tier */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 5.45, 0]}>
        <cylinderGeometry args={[2.8, 3.1, 0.5, 32]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.5} clearcoat={0.15} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 6.3, 0]}>
        <cylinderGeometry args={[2.2, 2.6, 1.4, 32]} />
        <meshPhysicalMaterial color="#ede8de" roughness={0.5} clearcoat={0.12} />
      </mesh>
      {/* Dome */}
      <mesh castShadow position={[0, BASE + 0.05 + 7.35, 0]}>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color={accent} roughness={0.35} clearcoat={0.3} metalness={0.12} transparent opacity={0.88} />
      </mesh>
      {/* Floating armillary sphere */}
      <Float floatIntensity={0.45} speed={1.2} rotationIntensity={0.35}>
        <group position={[0, BASE + 0.05 + 9.4, 0]}>
          {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rot, i) => (
            <mesh key={i} rotation={[0, rot, 0]}>
              <torusGeometry args={[0.85, 0.028, 16, 48]} />
              <meshStandardMaterial color={accent} metalness={0.82} roughness={0.14} />
            </mesh>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.85, 0.028, 16, 48]} />
            <meshStandardMaterial color={accent} metalness={0.82} roughness={0.14} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
          </mesh>
          <pointLight intensity={1.2} distance={4} color={accent} />
        </group>
      </Float>
      <Column position={[-2.0, BASE + 0.05, 2.0]} height={3.0} />
      <Column position={[2.0, BASE + 0.05, 2.0]} height={3.0} />
      <CypressTree position={[-4.8, 0, 2.8]} scale={1.0} />
      <CypressTree position={[4.8, 0, 2.8]} scale={0.88} />
      <Urn position={[-2.8, BASE + 0.05, 2.5]} />
      <Brazier position={[3.2, BASE + 0.05, 2.5]} accent={accent} />
    </group>
  );
}

function Cafe({ accent }: { accent: string }) {
  const BASE = 1.27;

  return (
    <group>
      <Platform />
      {/* Building */}
      <mesh castShadow receiveShadow position={[0.3, BASE + 0.05 + 2.3, -0.4]}>
        <boxGeometry args={[6.5, 4.6, 4.2]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.55} clearcoat={0.08} />
      </mesh>
      {/* Upper floor */}
      <mesh castShadow receiveShadow position={[0.3, BASE + 0.05 + 5.65, -0.4]}>
        <boxGeometry args={[6.5, 1.3, 4.2]} />
        <meshPhysicalMaterial color="#ede8de" roughness={0.5} clearcoat={0.1} />
      </mesh>
      {/* Door */}
      <mesh position={[-0.5, BASE + 0.05 + 1.2, 1.62]}>
        <boxGeometry args={[0.75, 2.4, 0.1]} />
        <meshStandardMaterial color="#4a3820" roughness={0.8} />
      </mesh>
      {/* Windows - warm glow */}
      {[1.2, 2.5].map((wx) => (
        <mesh key={wx} position={[wx, BASE + 0.05 + 2.4, 1.62]}>
          <boxGeometry args={[1.1, 1.4, 0.08]} />
          <meshStandardMaterial color={accent} roughness={0.3} transparent opacity={0.5} emissive={accent} emissiveIntensity={0.22} />
        </mesh>
      ))}
      {/* Awning */}
      <mesh castShadow position={[0.3, BASE + 0.05 + 3.85, 2.0]}>
        <boxGeometry args={[6.6, 0.12, 1.6]} />
        <meshStandardMaterial color={accent} roughness={0.85} />
      </mesh>
      {/* Awning stripes */}
      {Array.from({ length: 8 }, (_, i) => {
        const x = -3.0 + i * 0.88;
        return i % 2 === 0 ? (
          <mesh key={i} position={[x, BASE + 0.05 + 3.87, 2.0]}>
            <boxGeometry args={[0.42, 0.14, 1.6]} />
            <meshStandardMaterial color="#fff8f0" roughness={0.9} transparent opacity={0.65} />
          </mesh>
        ) : null;
      })}
      {/* Sidewalk tables */}
      {[-2.4, -0.8, 0.8].map((tx) => (
        <group key={tx} position={[tx + 4.0, BASE + 0.05, 2.8]}>
          <mesh castShadow position={[0, 0.52, 0]}>
            <cylinderGeometry args={[0.4, 0.06, 0.05, 16]} />
            <meshStandardMaterial color={accent} roughness={0.7} />
          </mesh>
          <mesh castShadow position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
            <meshStandardMaterial color="#3a3530" roughness={0.7} />
          </mesh>
          {(
            [
              [-0.44, 0],
              [0.44, 0],
              [0, -0.44],
              [0, 0.44],
            ] as [number, number][]
          ).map(([cx, cz], ci) => (
            <mesh key={ci} castShadow position={[cx, 0.25, cz]}>
              <cylinderGeometry args={[0.2, 0.04, 0.44, 8]} />
              <meshStandardMaterial color="#3a3530" roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Lamppost */}
      <group position={[-3.5, BASE + 0.05, 3.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.08, 3.5, 8]} />
          <meshStandardMaterial color="#2a2e38" metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh castShadow position={[0, 1.9, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#f5e8b0" roughness={0.2} emissive="#f5c96a" emissiveIntensity={0.8} />
        </mesh>
        <pointLight position={[0, 1.9, 0]} intensity={1.8} distance={5} color="#f09a3f" />
        <Sparkles position={[0, 1.9, 0]} count={8} scale={0.5} size={2} speed={0.6} color="#f5c96a" />
      </group>
      <CypressTree position={[4.8, 0, 3.2]} scale={0.88} />
    </group>
  );
}

function Library({ accent }: { accent: string }) {
  const BASE = 1.27;

  return (
    <group>
      <Platform />
      {/* Main hall */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 2.2, 0]}>
        <boxGeometry args={[7.0, 4.4, 4.8]} />
        <meshPhysicalMaterial color="#e0dbd0" roughness={0.6} clearcoat={0.1} />
      </mesh>
      {/* Tall arched windows with warm glow */}
      {[-2.2, -0.7, 0.8, 2.3].map((wx) => (
        <mesh key={wx} position={[wx, BASE + 0.05 + 2.0, 2.42]}>
          <boxGeometry args={[0.9, 3.0, 0.08]} />
          <meshStandardMaterial color={accent} roughness={0.3} transparent opacity={0.5} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
      ))}
      {/* Upper tier */}
      <mesh castShadow receiveShadow position={[0, BASE + 0.05 + 5.25, 0]}>
        <boxGeometry args={[5.5, 2.0, 3.6]} />
        <meshPhysicalMaterial color="#e8e4da" roughness={0.55} clearcoat={0.1} />
      </mesh>
      {/* Dome */}
      <mesh castShadow position={[0, BASE + 0.05 + 7.05, 0]}>
        <sphereGeometry args={[1.8, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={accent} roughness={0.38} metalness={0.15} transparent opacity={0.9} />
      </mesh>
      {/* Gold finial */}
      <mesh castShadow position={[0, BASE + 0.05 + 8.85, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#d4a843" metalness={0.92} roughness={0.08} />
      </mesh>
      {/* Leaning books */}
      {[
        { x: -4.8, z: 2.0, h: 2.6, w: 0.6, d: 1.4, color: accent, rot: -0.12 },
        { x: -4.0, z: 2.2, h: 2.2, w: 0.5, d: 1.2, color: '#9a4a5a', rot: -0.05 },
        { x: -3.3, z: 2.35, h: 1.8, w: 0.42, d: 1.0, color: '#5b7fb9', rot: 0.04 },
      ].map(({ x, z, h, w, d, color, rot }, i) => (
        <mesh key={i} castShadow position={[x, BASE + 0.05 + h / 2, z]} rotation={[0, 0, rot]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      ))}
      {/* Lectern */}
      <mesh castShadow position={[3.2, BASE + 0.05 + 0.7, 1.8]}>
        <boxGeometry args={[0.5, 1.4, 0.4]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[3.2, BASE + 0.05 + 1.52, 2.0]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.7, 0.06, 0.5]} />
        <meshStandardMaterial color="#f6efdd" roughness={0.6} />
      </mesh>
      <Brazier position={[4.5, BASE + 0.05, 2.8]} accent={accent} />
      <CypressTree position={[-5.2, 0, 3.0]} scale={1.0} />
    </group>
  );
}

// ── Shared stage (lighting, sky, ground) ─────────────────────────────────────

function Stage({ accent }: { accent: string }) {
  return (
    <>
      <Sky sunPosition={[1, 0.45, 0.35]} turbidity={7} rayleigh={2.2} mieCoefficient={0.004} mieDirectionalG={0.85} />
      <ambientLight intensity={0.45} color="#fff8e8" />
      <hemisphereLight args={['#87ceeb', '#d4c9ae', 0.55]} />
      <directionalLight
        position={[12, 18, 10]}
        intensity={2.2}
        castShadow
        color="#fff8d8"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-7, 4, -7]} intensity={0.28} color="#a0b8d8" />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={22} blur={3.2} far={8} />
      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#c8bc9e" roughness={0.95} />
      </mesh>
      {/* Subtle accent tint on ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color={accent} roughness={0.9} transparent opacity={0.07} />
      </mesh>
    </>
  );
}

// ── Scene map ─────────────────────────────────────────────────────────────────

const SCENES: Record<School['scene'], (accent: string) => ReactNode> = {
  agora: (a) => <Temple accent={a} columns={3} />,
  academy: (a) => <Temple accent={a} columns={4} />,
  lyceum: (a) => <Temple accent={a} columns={5} />,
  stoa: (a) => <Stoa accent={a} />,
  observatory: (a) => <Observatory accent={a} />,
  cafe: (a) => <Cafe accent={a} />,
  library: (a) => <Library accent={a} />,
};

// ── Canvas export ─────────────────────────────────────────────────────────────

export default function IsometricScene3D({ scene, accent }: { scene: School['scene']; accent: string }) {
  return (
    <Canvas
      shadows
      orthographic
      camera={{ position: [22, 22, 22], zoom: 38, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <IsometricCamera />
      <fog attach="fog" args={['#ddd8cc', 40, 100]} />
      <Stage accent={accent} />
      {SCENES[scene](accent)}
    </Canvas>
  );
}
