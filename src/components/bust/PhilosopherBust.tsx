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
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import type { BustConfig, BustLook } from '@/data/types';

/**
 * Stylized "animated character" busts: cel-shaded toon materials with crisp
 * dark outlines, expressive eyes and per-philosopher character design
 * (Nietzsche's walrus mustache, Marcus Aurelius' laurel wreath, Kant's
 * powdered wig, Beauvoir's turban…). The museum stage — volumetric
 * spotlight, reflective floor, drifting gold dust — frames each one like a
 * collectible figure. A GLB escape hatch remains for real scans.
 */

// ── Toon shading helpers ──────────────────────────────────────────────────────

let gradient: THREE.DataTexture | null = null;
/** Three-step grayscale ramp that gives MeshToonMaterial its cel bands. */
function getGradientMap(): THREE.DataTexture {
  if (gradient) return gradient;
  const steps = [110, 200, 255];
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((v, i) => {
    data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  });
  gradient = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  return gradient;
}

const OUTLINE = '#2b2117';

function Toon({ color }: { color: string; outline?: boolean }) {
  const gradientMap = useMemo(getGradientMap, []);
  return <meshToonMaterial color={color} gradientMap={gradientMap} />;
}

// ── Character pieces ──────────────────────────────────────────────────────────

function Eye({ side, skin }: { side: 1 | -1; skin: string }) {
  return (
    <group position={[side * 0.19, 0.04, 0.4]} rotation={[0, side * 0.12, 0]}>
      <mesh scale={[1, 1.2, 0.5]}>
        <sphereGeometry args={[0.085, 20, 14]} />
        <meshToonMaterial color="#fdfbf6" gradientMap={getGradientMap()} />
      </mesh>
      <mesh position={[0, -0.005, 0.05]} scale={[1, 1.15, 0.7]}>
        <sphereGeometry args={[0.044, 16, 12]} />
        <meshBasicMaterial color="#2a221c" />
      </mesh>
      <mesh position={[0.016, 0.022, 0.085]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Lower lid gives a calm, dignified gaze */}
      <mesh position={[0, -0.075, 0.045]} rotation={[0.5, 0, 0]} scale={[1, 0.35, 0.5]}>
        <sphereGeometry args={[0.085, 16, 10]} />
        <meshToonMaterial color={skin} gradientMap={getGradientMap()} />
      </mesh>
    </group>
  );
}

function Brow({ side, color }: { side: 1 | -1; color: string }) {
  return (
    <mesh position={[side * 0.19, 0.2, 0.41]} rotation={[0.15, side * 0.25, side * -0.12]}>
      <capsuleGeometry args={[0.028, 0.13, 6, 10]} />
      <meshToonMaterial color={color} gradientMap={getGradientMap()} />
    </mesh>
  );
}

function Hair({ look }: { look: BustLook }) {
  const { hair, hairstyle } = look;
  const curls = useMemo(() => {
    if (hairstyle !== 'curly') return [];
    const out: [number, number, number, number][] = [];
    for (let i = 0; i < 26; i++) {
      const phi = (i / 26) * Math.PI * 2;
      const band = i % 2 === 0 ? 0.18 : 0.42;
      const r = 0.47 * Math.cos(band) + 0.04;
      out.push([Math.cos(phi) * r, 0.5 * Math.sin(band) + 0.13, Math.sin(phi) * r, 0.11 + (i % 3) * 0.02]);
    }
    return out;
  }, [hairstyle]);

  switch (hairstyle) {
    case 'bald':
      // Horseshoe fringe around the back of the head
      return (
        <mesh position={[0, -0.06, -0.02]} rotation={[Math.PI / 2 - 0.18, 0, Math.PI]}>
          <torusGeometry args={[0.43, 0.12, 14, 28, Math.PI * 1.25]} />
          <Toon color={hair} />
        </mesh>
      );
    case 'short':
      return (
        <mesh position={[0, 0.1, -0.03]} scale={[1.04, 0.98, 1.02]}>
          <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
          <Toon color={hair} />
        </mesh>
      );
    case 'swept':
      return (
        <group>
          <mesh position={[0, 0.17, -0.12]} scale={[1.05, 0.85, 1.1]}>
            <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
            <Toon color={hair} />
          </mesh>
          {/* Sideburns */}
          {([1, -1] as const).map((s) => (
            <mesh key={s} position={[s * 0.45, -0.12, 0.12]} rotation={[0, 0, s * -0.1]} scale={[0.4, 1, 0.5]}>
              <capsuleGeometry args={[0.09, 0.16, 6, 10]} />
              <Toon color={hair} outline={false} />
            </mesh>
          ))}
        </group>
      );
    case 'curly':
      return (
        <group>
          <mesh position={[0, 0.1, -0.02]} scale={[1.05, 1, 1.04]}>
            <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
            <Toon color={hair} />
          </mesh>
          {curls.map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[r, 10, 8]} />
              <Toon color={hair} outline={false} />
            </mesh>
          ))}
        </group>
      );
    case 'long':
      return (
        <group>
          <mesh position={[0, 0.14, -0.03]} scale={[1.06, 0.92, 1.06]}>
            <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
            <Toon color={hair} />
          </mesh>
          {/* Curtains falling to the shoulders */}
          {([1, -1] as const).map((s) => (
            <mesh key={s} position={[s * 0.42, -0.3, -0.05]} rotation={[0, 0, s * 0.08]} scale={[0.55, 1, 0.7]}>
              <capsuleGeometry args={[0.16, 0.46, 8, 14]} />
              <Toon color={hair} />
            </mesh>
          ))}
          {/* Back panel */}
          <mesh position={[0, -0.25, -0.32]} scale={[1, 1, 0.55]}>
            <capsuleGeometry args={[0.3, 0.4, 8, 16]} />
            <Toon color={hair} outline={false} />
          </mesh>
        </group>
      );
    case 'wig':
      return (
        <group>
          <mesh position={[0, 0.12, -0.02]} scale={[1.08, 0.95, 1.05]}>
            <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <Toon color={hair} />
          </mesh>
          {/* Side rolls, stacked */}
          {([1, -1] as const).map((s) => (
            <group key={s}>
              {[-0.06, -0.22].map((y) => (
                <mesh key={y} position={[s * 0.46, y, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.09, 0.09, 0.26, 14]} />
                  <Toon color={hair} />
                </mesh>
              ))}
            </group>
          ))}
          {/* Queue tied at the back */}
          <mesh position={[0, -0.32, -0.42]} rotation={[0.5, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.3, 6, 12]} />
            <Toon color={hair} outline={false} />
          </mesh>
        </group>
      );
    case 'updo':
      return (
        <group>
          <mesh position={[0, 0.15, -0.05]} scale={[1.06, 0.95, 1.06]}>
            <sphereGeometry args={[0.5, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2.05]} />
            <Toon color={hair} />
          </mesh>
          {/* Swept-back volume + low chignon */}
          <mesh position={[0, 0.18, -0.3]} scale={[0.95, 0.8, 0.9]}>
            <sphereGeometry args={[0.4, 20, 14]} />
            <Toon color={hair} outline={false} />
          </mesh>
          <mesh position={[0, -0.05, -0.46]}>
            <sphereGeometry args={[0.2, 16, 12]} />
            <Toon color={hair} />
          </mesh>
        </group>
      );
  }
}

function Beard({ look }: { look: BustLook }) {
  const { hair, beard } = look;
  const curls = useMemo(() => {
    if (beard !== 'curly') return [];
    const out: [number, number, number][] = [];
    for (let i = 0; i < 11; i++) {
      const t = (i / 10) * Math.PI;
      out.push([Math.cos(t) * 0.36, -0.34 - Math.sin(t) * 0.12, 0.18 + Math.sin(t) * 0.18]);
    }
    return out;
  }, [beard]);

  switch (beard) {
    case 'none':
      return null;
    case 'trimmed':
      return (
        <mesh position={[0, -0.22, 0.06]} scale={[0.86, 0.72, 0.86]}>
          <sphereGeometry args={[0.5, 28, 14, 0, Math.PI * 2, Math.PI / 2.1, Math.PI / 2]} />
          <Toon color={hair} />
        </mesh>
      );
    case 'full':
      return (
        <group>
          <mesh position={[0, -0.18, 0.05]} scale={[0.92, 0.95, 0.92]}>
            <sphereGeometry args={[0.5, 28, 14, 0, Math.PI * 2, Math.PI / 2.2, Math.PI / 2]} />
            <Toon color={hair} />
          </mesh>
          <mesh position={[0, -0.52, 0.18]} scale={[0.62, 0.55, 0.5]}>
            <sphereGeometry args={[0.5, 20, 14]} />
            <Toon color={hair} />
          </mesh>
        </group>
      );
    case 'long':
      return (
        <group>
          <mesh position={[0, -0.18, 0.05]} scale={[0.94, 0.95, 0.94]}>
            <sphereGeometry args={[0.5, 28, 14, 0, Math.PI * 2, Math.PI / 2.2, Math.PI / 2]} />
            <Toon color={hair} />
          </mesh>
          <mesh position={[0, -0.62, 0.16]} rotation={[0.2, 0, 0]} scale={[0.62, 1, 0.55]}>
            <capsuleGeometry args={[0.26, 0.42, 8, 16]} />
            <Toon color={hair} />
          </mesh>
        </group>
      );
    case 'curly':
      return (
        <group>
          <mesh position={[0, -0.2, 0.05]} scale={[0.9, 0.85, 0.9]}>
            <sphereGeometry args={[0.5, 28, 14, 0, Math.PI * 2, Math.PI / 2.2, Math.PI / 2]} />
            <Toon color={hair} />
          </mesh>
          {curls.map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.1, 10, 8]} />
              <Toon color={hair} outline={false} />
            </mesh>
          ))}
        </group>
      );
    case 'goatee':
      return (
        <mesh position={[0, -0.46, 0.3]} rotation={[0.5, 0, 0]} scale={[0.7, 1, 0.7]}>
          <coneGeometry args={[0.09, 0.24, 12]} />
          <Toon color={hair} />
        </mesh>
      );
  }
}

function Mustache({ look }: { look: BustLook }) {
  if (look.mustache === 'none') return null;
  const grand = look.mustache === 'grand';
  const r = grand ? 0.095 : 0.04;
  const len = grand ? 0.26 : 0.11;
  return (
    <group position={[0, grand ? -0.22 : -0.18, grand ? 0.44 : 0.44]}>
      {([1, -1] as const).map((s) => (
        <mesh key={s} position={[s * (grand ? 0.15 : 0.08), grand ? -0.03 : 0, 0]} rotation={[0, 0, s * (grand ? 0.38 : 0.55)]}>
          <capsuleGeometry args={[r, len, 8, 12]} />
          <Toon color={look.hair} />
        </mesh>
      ))}
    </group>
  );
}

function Laurel() {
  const leaves = useMemo(() => {
    const out: { pos: [number, number, number]; rot: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const t = Math.PI * 0.15 + (i / 11) * Math.PI * 1.7;
      out.push({ pos: [Math.cos(t) * 0.6, 0.28 - Math.sin(t * 0.5) * 0.04, -Math.sin(t) * 0.6], rot: t });
    }
    return out;
  }, []);
  return (
    <group rotation={[0.12, 0, 0]}>
      <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2 + 0.12, 0, 0]}>
        <torusGeometry args={[0.6, 0.03, 10, 32]} />
        <meshStandardMaterial color="#e8bf5e" metalness={0.4} roughness={0.3} emissive="#8a6a1f" emissiveIntensity={0.5} />
      </mesh>
      {leaves.map(({ pos, rot }, i) => (
        <mesh key={i} position={pos} rotation={[0, -rot, 0.5]} scale={[1, 1.8, 0.45]}>
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color="#eec968" metalness={0.4} roughness={0.3} emissive="#8a6a1f" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Head({ look, headWidth }: { look: BustLook; headWidth: number }) {
  const w = 0.92 + (headWidth - 0.85) * 0.35;
  return (
    <group position={[0, 1.78, 0]} rotation={[0.02, 0.16, 0]}>
      <mesh scale={[w, 1.05, 0.94]}>
        <sphereGeometry args={[0.5, 48, 32]} />
        <Toon color={look.skin} />
      </mesh>
      {/* Ears */}
      {([1, -1] as const).map((s) => (
        <mesh key={s} position={[s * 0.47 * w, -0.02, 0.0]} scale={[0.45, 1, 0.7]}>
          <sphereGeometry args={[0.09, 12, 10]} />
          <Toon color={look.skin} outline={false} />
        </mesh>
      ))}
      {look.headband && look.hairstyle === 'updo' &&
        ([1, -1] as const).map((s) => (
          <mesh key={`ear-ring-${s}`} position={[s * 0.47 * w, -0.14, 0.0]}>
            <sphereGeometry args={[0.03, 10, 8]} />
            <meshStandardMaterial color="#d9ad4f" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}
      {/* Nose */}
      <mesh position={[0, -0.08, 0.46]} scale={[0.75, 1.05, 1]}>
        <sphereGeometry args={[0.075, 14, 12]} />
        <Toon color={look.skin} outline={false} />
      </mesh>
      <Eye side={1} skin={look.skin} />
      <Eye side={-1} skin={look.skin} />
      <Brow side={1} color={look.hair} />
      <Brow side={-1} color={look.hair} />
      {/* Mouth (hidden under full beards) */}
      {(look.beard === 'none' || look.beard === 'goatee') && (
        <mesh position={[0, -0.25, 0.43]} rotation={[0.35, 0, Math.PI]} scale={[1, 0.55, 0.45]}>
          <torusGeometry args={[0.07, 0.018, 8, 14, Math.PI]} />
          <meshToonMaterial color="#8c5347" gradientMap={getGradientMap()} />
        </mesh>
      )}
      <Hair look={look} />
      <Beard look={look} />
      <Mustache look={look} />
      {look.laurel && <Laurel />}
      {look.headband && (
        <mesh position={[0, 0.32, -0.04]} rotation={[Math.PI / 2 - 0.08, 0, 0]}>
          <torusGeometry args={[0.46, 0.055, 12, 32]} />
          <Toon color={look.clothAccent} />
        </mesh>
      )}
    </group>
  );
}

function Body({ look }: { look: BustLook }) {
  return (
    <group>
      {/* Herm-cut torso */}
      <mesh position={[0, 0.92, 0]} scale={[1.3, 0.92, 0.78]}>
        <sphereGeometry args={[0.62, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Toon color={look.cloth} />
      </mesh>
      <mesh position={[0, 0.93, 0]} rotation={[Math.PI, 0, 0]} scale={[1.3, 0.3, 0.78]}>
        <sphereGeometry args={[0.62, 36, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Toon color={look.cloth} />
      </mesh>
      {/* Toga sash across the chest */}
      <mesh position={[0.02, 1.12, 0.18]} rotation={[0.35, 0.15, -0.95]} scale={[1, 1, 0.55]}>
        <torusGeometry args={[0.52, 0.085, 12, 28, Math.PI * 0.85]} />
        <Toon color={look.clothAccent} />
      </mesh>
      {/* Shoulder pin */}
      <mesh position={[0.52, 1.38, 0.18]}>
        <sphereGeometry args={[0.06, 12, 10]} />
        <meshStandardMaterial color="#d9ad4f" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.17, 0.22, 0.34, 20]} />
        <Toon color={look.skin} />
      </mesh>
      {look.collar && (
        <group>
          {/* Flat 17th-century collar / cravat */}
          <mesh position={[0, 1.16, 0.08]} rotation={[0.25, 0, 0]} scale={[1.45, 0.14, 1.0]}>
            <cylinderGeometry args={[0.26, 0.3, 0.4, 20]} />
            <Toon color={look.clothAccent} />
          </mesh>
          <mesh position={[0, 1.04, 0.32]} scale={[0.55, 0.7, 0.4]}>
            <sphereGeometry args={[0.16, 12, 10]} />
            <Toon color={look.clothAccent} outline={false} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Pedestal({ pedestal }: { pedestal: string }) {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.92, 1.02, 0.16, 48]} />
        <Toon color="#2c2f38" />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.74, 0.84, 0.22, 48]} />
        <Toon color={pedestal} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <torusGeometry args={[0.68, 0.025, 12, 48]} />
        <meshStandardMaterial color="#d9ad4f" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.58, 0.64, 0.28, 48]} />
        <Toon color="#ece7da" />
      </mesh>
    </group>
  );
}

function CharacterBust({ config }: { config: BustConfig }) {
  const look: BustLook = config.look ?? {
    skin: '#ecbf96',
    hair: '#6e5639',
    cloth: config.marble,
    clothAccent: config.pedestal,
    hairstyle: config.hair > 0.4 ? 'short' : 'bald',
    beard: config.beard > 0.5 ? 'full' : config.beard > 0.1 ? 'trimmed' : 'none',
    mustache: config.beard > 0.1 ? 'normal' : 'none',
  };
  return (
    <group position={[0, -1.15, 0]}>
      <Pedestal pedestal={config.pedestal} />
      <Body look={look} />
      <Head look={look} headWidth={config.headWidth} />
    </group>
  );
}

function ScannedBust({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} position={[0, -1.1, 0]} />;
}

/** Slow turntable so the character presents itself even before the user drags. */
function Turntable({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
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
      {/* Toon shading wants a clear key light and decent ambient fill */}
      <ambientLight intensity={0.75} color="#fff4e0" />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff6da" />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#e8c87a" />
      <directionalLight position={[5, 1, -2]} intensity={0.35} color="#9db4dd" />
      {/* Volumetric museum spotlight, purely scenographic */}
      <SpotLight
        position={[0, 5.2, 1.6]}
        angle={0.5}
        penumbra={0.85}
        intensity={1.6}
        distance={9}
        attenuation={5.5}
        anglePower={4}
        color="#fff3da"
      />
      <Suspense fallback={null}>
        <Turntable>
          {config.modelPath ? <ScannedBust path={config.modelPath} /> : <CharacterBust config={config} />}
        </Turntable>
        <Sparkles count={60} scale={[3.6, 3.2, 3.6]} size={2.2} speed={0.25} color="#e8c87a" opacity={0.5} />
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
