'use client';

import { useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  Sky,
  SoftShadows,
  Sparkles,
} from '@react-three/drei';
import { Bloom, EffectComposer, N8AO, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { School } from '@/data/types';

/**
 * High-fidelity isometric dioramas rendered with the same pipeline as the
 * philosopher busts, plus a full post-processing stack: N8AO ambient
 * occlusion, mipmap bloom on emissive surfaces, PCSS soft shadows, vignette,
 * procedural canvas textures (marble veining, fluting bump, sandy ground)
 * and lightformer-based environment reflections. Slow auto-rotation invites
 * the visitor to spin the diorama like a museum model.
 */

// ── Procedural canvas textures (created once, shared across scenes) ──────────

function makeTexture(size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

let marbleTex: THREE.CanvasTexture | null = null;
function getMarbleTexture(): THREE.CanvasTexture {
  if (marbleTex) return marbleTex;
  marbleTex = makeTexture(512, (ctx, s) => {
    ctx.fillStyle = '#f6f3ec';
    ctx.fillRect(0, 0, s, s);
    // Soft tonal patches
    for (let i = 0; i < 40; i++) {
      const g = ctx.createRadialGradient(
        Math.random() * s, Math.random() * s, 0,
        Math.random() * s, Math.random() * s, 40 + Math.random() * 110,
      );
      const tone = 225 + Math.floor(Math.random() * 22);
      g.addColorStop(0, `rgba(${tone},${tone - 3},${tone - 9},0.30)`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
    }
    // Veins: meandering random walks
    for (let v = 0; v < 26; v++) {
      let x = Math.random() * s;
      let y = Math.random() * s;
      let angle = Math.random() * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const steps = 60 + Math.random() * 80;
      for (let i = 0; i < steps; i++) {
        angle += (Math.random() - 0.5) * 0.9;
        x += Math.cos(angle) * 5;
        y += Math.sin(angle) * 5;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(105,108,122,${0.05 + Math.random() * 0.10})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.4;
      ctx.stroke();
    }
  });
  marbleTex.colorSpace = THREE.SRGBColorSpace;
  return marbleTex;
}

let fluteTex: THREE.CanvasTexture | null = null;
/** Vertical stripe bump map that fakes column fluting at zero geometry cost. */
function getFluteBump(): THREE.CanvasTexture {
  if (fluteTex) return fluteTex;
  fluteTex = makeTexture(256, (ctx, s) => {
    for (let x = 0; x < s; x++) {
      const v = 128 + Math.sin((x / s) * Math.PI * 2 * 24) * 110;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, 0, 1, s);
    }
  });
  return fluteTex;
}

let roofTex: THREE.CanvasTexture | null = null;
/** Terracotta roof-tile texture: course lines + staggered tile joints. */
function getRoofTexture(): THREE.CanvasTexture {
  if (roofTex) return roofTex;
  roofTex = makeTexture(256, (ctx, s) => {
    ctx.fillStyle = '#c9744a';
    ctx.fillRect(0, 0, s, s);
    const rows = 10;
    const rh = s / rows;
    for (let r = 0; r < rows; r++) {
      // Course shadow line
      ctx.fillStyle = 'rgba(90,40,22,0.45)';
      ctx.fillRect(0, r * rh, s, 2.5);
      // Highlight just under the lip
      ctx.fillStyle = 'rgba(255,200,160,0.25)';
      ctx.fillRect(0, r * rh + 2.5, s, 2);
      // Staggered vertical joints
      const offset = (r % 2) * (rh * 1.0);
      for (let x = offset; x < s; x += rh * 2) {
        ctx.fillStyle = 'rgba(90,40,22,0.28)';
        ctx.fillRect(x, r * rh, 1.6, rh);
      }
      // Per-tile tonal variation
      for (let x = offset; x < s; x += rh * 2) {
        if (Math.random() > 0.6) {
          ctx.fillStyle = `rgba(${150 + Math.random() * 60},${70 + Math.random() * 30},40,0.18)`;
          ctx.fillRect(x, r * rh, rh * 2, rh);
        }
      }
    }
  });
  roofTex.colorSpace = THREE.SRGBColorSpace;
  roofTex.repeat.set(3, 2);
  return roofTex;
}

function RoofMat() {
  const map = useMemo(getRoofTexture, []);
  return <meshStandardMaterial map={map} color="#d8825a" roughness={0.75} />;
}

let groundTex: THREE.CanvasTexture | null = null;
function getGroundTexture(): THREE.CanvasTexture {
  if (groundTex) return groundTex;
  groundTex = makeTexture(512, (ctx, s) => {
    ctx.fillStyle = '#c9bb9c';
    ctx.fillRect(0, 0, s, s);
    // Soft green patches of worn grass
    for (let i = 0; i < 26; i++) {
      const g = ctx.createRadialGradient(
        Math.random() * s, Math.random() * s, 0,
        Math.random() * s, Math.random() * s, 30 + Math.random() * 80,
      );
      g.addColorStop(0, `rgba(${110 + Math.random() * 30},${135 + Math.random() * 25},80,0.28)`);
      g.addColorStop(1, 'rgba(120,140,80,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
    }
    for (let i = 0; i < 9000; i++) {
      const shade = Math.random();
      ctx.fillStyle = shade > 0.5
        ? `rgba(170,155,120,${0.12 + Math.random() * 0.2})`
        : `rgba(235,225,200,${0.1 + Math.random() * 0.18})`;
      const r = 0.6 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.arc(Math.random() * s, Math.random() * s, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  groundTex.colorSpace = THREE.SRGBColorSpace;
  groundTex.repeat.set(7, 7);
  return groundTex;
}

// ── Materials ─────────────────────────────────────────────────────────────────

function MarbleMat({ color = '#f3efe6', fluted = false }: { color?: string; fluted?: boolean }) {
  const map = useMemo(getMarbleTexture, []);
  const bump = useMemo(getFluteBump, []);
  return (
    <meshPhysicalMaterial
      color={color}
      map={map}
      bumpMap={fluted ? bump : undefined}
      bumpScale={fluted ? 0.6 : 0}
      roughness={0.42}
      clearcoat={0.25}
      clearcoatRoughness={0.6}
      sheen={0.25}
      sheenColor="#fff6e0"
    />
  );
}

// ── Deterministic scatter rng ─────────────────────────────────────────────────

function seededRng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Primitives ────────────────────────────────────────────────────────────────

function Column({ position, height = 2.85 }: { position: [number, number, number]; height?: number }) {
  const r = 0.16;
  const shaft = height - 0.5;
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[r * 1.6, r * 1.75, 0.12, 24]} />
        <MarbleMat color="#ebe7dd" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
        <torusGeometry args={[r * 1.15, r * 0.32, 12, 28]} />
        <MarbleMat color="#efebe1" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft / 2, 0]}>
        <cylinderGeometry args={[r * 0.84, r, shaft, 36]} />
        <MarbleMat fluted />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft + 0.08, 0]}>
        <torusGeometry args={[r * 0.92, r * 0.22, 12, 28]} />
        <MarbleMat color="#efebe1" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.2 + shaft + 0.22, 0]}>
        <boxGeometry args={[r * 3.6, 0.14, r * 3.6]} />
        <MarbleMat color="#ece8de" />
      </mesh>
    </group>
  );
}

/** Fallen, broken column drums — instant "ancient ruin" storytelling. */
function RuinedColumn({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.17, 0.6, 24]} />
        <MarbleMat fluted color="#e6e1d4" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.55, 0.14, 0.18]} rotation={[Math.PI / 2, 0, 0.5]}>
        <cylinderGeometry args={[0.14, 0.14, 0.55, 24]} />
        <MarbleMat fluted color="#ddd7c8" />
      </mesh>
      <mesh castShadow receiveShadow position={[1.15, 0.12, 0.5]} rotation={[Math.PI / 2, 0.3, 0.9]}>
        <cylinderGeometry args={[0.13, 0.13, 0.45, 24]} />
        <MarbleMat fluted color="#d6d0bf" />
      </mesh>
    </group>
  );
}

function Platform() {
  return (
    <group>
      {[
        { y: 0.14, w: 9.4, d: 7.0, h: 0.28, c: '#beb4a0' },
        { y: 0.42, w: 8.6, d: 6.2, h: 0.28, c: '#cdc4b1' },
        { y: 0.7, w: 7.8, d: 5.4, h: 0.28, c: '#dcd4c3' },
        { y: 0.98, w: 7.0, d: 4.6, h: 0.28, c: '#ece7da' },
      ].map(({ y, w, d, h, c }, i) => (
        <mesh key={i} castShadow receiveShadow position={[0, y, 0]}>
          <boxGeometry args={[w, h, d]} />
          <MarbleMat color={c} />
        </mesh>
      ))}
    </group>
  );
}

function CypressTree({ position, scale = 1, seed = 1 }: { position: [number, number, number]; scale?: number; seed?: number }) {
  const layers = useMemo(() => {
    const rng = seededRng(seed * 97);
    return Array.from({ length: 7 }, (_, i) => {
      const f = i / 6;
      return {
        y: 0.7 + f * 2.7,
        r: (0.72 - f * 0.55) * (0.92 + rng() * 0.16),
        h: 0.85 - f * 0.25,
        c: ['#24452e', '#2a5237', '#305c3e', '#356545', '#3c704d', '#447a55', '#4e865f'][i],
        dx: (rng() - 0.5) * 0.08,
        dz: (rng() - 0.5) * 0.08,
      };
    });
  }, [seed]);
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 0.7, 8]} />
        <meshStandardMaterial color="#5e4429" roughness={0.95} />
      </mesh>
      {layers.map(({ y, r, h, c, dx, dz }, i) => (
        <mesh key={i} castShadow position={[dx, y, dz]}>
          <coneGeometry args={[r, h, 9]} />
          <meshStandardMaterial color={c} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** Olive tree: gnarled trunk + cloud of silvery-green foliage blobs. */
function OliveTree({ position, scale = 1, seed = 5 }: { position: [number, number, number]; scale?: number; seed?: number }) {
  const blobs = useMemo(() => {
    const rng = seededRng(seed * 131);
    return Array.from({ length: 7 }, () => ({
      x: (rng() - 0.5) * 1.5,
      y: 1.5 + rng() * 0.8,
      z: (rng() - 0.5) * 1.3,
      r: 0.4 + rng() * 0.4,
      c: rng() > 0.5 ? '#6f8458' : '#7d9166',
    }));
  }, [seed]);
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.55, 0]} rotation={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.1, 0.2, 1.2, 8]} />
        <meshStandardMaterial color="#6b5238" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0.25, 1.15, 0.1]} rotation={[0.2, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.1, 0.7, 7]} />
        <meshStandardMaterial color="#6b5238" roughness={0.95} />
      </mesh>
      {blobs.map(({ x, y, z, r, c }, i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <dodecahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color={c} roughness={0.92} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Brazier({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.045, 0.11, 0.85, 10]} />
        <meshStandardMaterial color="#7a5526" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh castShadow position={[0, 0.56, 0]}>
        <sphereGeometry args={[0.2, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b9802f" metalness={0.8} roughness={0.25} />
      </mesh>
      <Flame position={[0, 0.66, 0]} />
    </group>
  );
}

/** Flickering emissive flame — the bloom pass turns it into real glow. */
function Flame({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const f = 1 + Math.sin(clock.elapsedTime * 11) * 0.13 + Math.sin(clock.elapsedTime * 23) * 0.07;
    if (ref.current) ref.current.scale.set(f, 1.25 * f, f);
    if (light.current) light.current.intensity = 2.6 * f;
  });
  return (
    <group position={position}>
      <mesh ref={ref} position={[0, 0.12, 0]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial color="#ffb340" emissive="#ff9020" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, 0.22, 0]} intensity={2.6} distance={6} decay={2} color="#ff9a3d" />
      <Sparkles position={[0, 0.45, 0]} count={10} scale={0.5} size={3} speed={1.1} color="#ffc46a" />
    </group>
  );
}

function Urn({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.08, 18]} />
        <meshStandardMaterial color="#a8623d" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 0]} scale={[1, 0.9, 1]}>
        <sphereGeometry args={[0.2, 20, 14]} />
        <meshStandardMaterial color="#b86f45" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.08, 18]} />
        <meshStandardMaterial color="#a8623d" roughness={0.6} />
      </mesh>
      {/* Black-figure band */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.201, 0.201, 0.1, 20, 1, true]} />
        <meshStandardMaterial color="#2c1f16" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Scattered grass tufts and stones around the platform, seeded per scene. */
function GroundLife({ seed }: { seed: number }) {
  const items = useMemo(() => {
    const rng = seededRng(seed * 7919);
    const tufts: { pos: [number, number, number]; s: number; rot: number }[] = [];
    const stones: { pos: [number, number, number]; s: number; rot: number }[] = [];
    let guard = 0;
    while (tufts.length < 110 && guard++ < 800) {
      const x = (rng() - 0.5) * 19;
      const z = (rng() - 0.5) * 15;
      if (Math.abs(x) < 5.2 && Math.abs(z) < 4.0) continue;
      tufts.push({ pos: [x, 0.1, z], s: 0.6 + rng() * 0.9, rot: rng() * Math.PI });
    }
    guard = 0;
    while (stones.length < 14 && guard++ < 200) {
      const x = (rng() - 0.5) * 17;
      const z = (rng() - 0.5) * 13;
      if (Math.abs(x) < 5.4 && Math.abs(z) < 4.2) continue;
      stones.push({ pos: [x, 0.06, z], s: 0.1 + rng() * 0.22, rot: rng() * Math.PI });
    }
    return { tufts, stones };
  }, [seed]);

  return (
    <>
      <Instances range={items.tufts.length} castShadow>
        <coneGeometry args={[0.07, 0.34, 5]} />
        <meshStandardMaterial color="#71924f" roughness={0.92} />
        {items.tufts.map(({ pos, s, rot }, i) => (
          <Instance key={i} position={pos} scale={s} rotation={[0.07, rot, -0.05]} />
        ))}
      </Instances>
      <Instances range={items.stones.length} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#a59a85" roughness={0.95} flatShading />
        {items.stones.map(({ pos, s, rot }, i) => (
          <Instance key={i} position={pos} scale={s} rotation={[rot, rot * 1.7, 0]} />
        ))}
      </Instances>
    </>
  );
}

/** Still reflecting pool — mirrors the building for the money shot. */
function Pool({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[size[0] + 0.5, 0.2, size[1] + 0.5]} />
        <MarbleMat color="#ddd6c6" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
        <planeGeometry args={size} />
        <MeshReflectorMaterial
          blur={[160, 60]}
          resolution={512}
          mixBlur={0.7}
          mixStrength={9}
          roughness={0.25}
          depthScale={0.4}
          minDepthThreshold={0.6}
          maxDepthThreshold={1.4}
          color="#39576a"
          metalness={0.35}
          mirror={0.75}
        />
      </mesh>
    </group>
  );
}

/** Flat triangular gable face built from a THREE.Shape. */
function GableTriangle({ z, y, width, height }: { z: number; y: number; width: number; height: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(0, height);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [width, height]);
  const map = useMemo(getMarbleTexture, []);
  return (
    <mesh castShadow geometry={geometry} position={[0, y, z]}>
      <meshPhysicalMaterial color="#efe9dc" map={map} roughness={0.42} clearcoat={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Scenes ────────────────────────────────────────────────────────────────────

const BASE = 1.12;

function Temple({ accent, columns }: { accent: string; columns: 3 | 4 | 5 }) {
  const SPAN = 5.0;
  const xs = Array.from({ length: columns }, (_, i) => -SPAN / 2 + (SPAN / (columns - 1)) * i);
  const COL_H = 2.85;
  const ROOF = BASE + COL_H + 0.42;

  return (
    <group>
      <Platform />
      {xs.map((cx) => (
        <group key={cx}>
          <Column position={[cx, BASE, 1.72]} height={COL_H} />
          <Column position={[cx, BASE, -1.72]} height={COL_H} />
        </group>
      ))}
      {[-0.9, 0.9].map((z) => (
        <group key={z}>
          <Column position={[-SPAN / 2, BASE, z]} height={COL_H} />
          <Column position={[SPAN / 2, BASE, z]} height={COL_H} />
        </group>
      ))}
      {/* Cella with door */}
      <mesh castShadow receiveShadow position={[0, BASE + COL_H / 2, 0]}>
        <boxGeometry args={[4.0, COL_H, 3.0]} />
        <MarbleMat color="#e9e4d8" />
      </mesh>
      <mesh position={[0, BASE + 0.95, 1.52]}>
        <boxGeometry args={[0.85, 1.9, 0.06]} />
        <meshStandardMaterial color="#191512" roughness={0.9} />
      </mesh>
      {/* Entablature + accent frieze */}
      <mesh castShadow receiveShadow position={[0, ROOF - 0.17, 0]}>
        <boxGeometry args={[6.5, 0.34, 4.2]} />
        <MarbleMat color="#ede8de" />
      </mesh>
      <mesh position={[0, ROOF + 0.04, 0]}>
        <boxGeometry args={[6.52, 0.2, 4.22]} />
        <meshStandardMaterial color={accent} roughness={0.55} />
      </mesh>
      {/* Triglyphs along the frieze */}
      {Array.from({ length: 9 }, (_, i) => -2.9 + i * 0.73).map((x) => (
        <mesh key={x} position={[x, ROOF + 0.04, 2.13]}>
          <boxGeometry args={[0.22, 0.2, 0.03]} />
          <MarbleMat color="#f2eee4" />
        </mesh>
      ))}
      {/* Pediment: front gable + sloped roof slabs */}
      <mesh castShadow receiveShadow position={[0, ROOF + 0.15, 0]}>
        <boxGeometry args={[6.6, 0.12, 4.3]} />
        <MarbleMat color="#e8e3d6" />
      </mesh>
      {[1, -1].map((side) => (
        <mesh
          key={side}
          castShadow
          receiveShadow
          position={[side * 1.62, ROOF + 0.78, 0]}
          rotation={[0, 0, side * -Math.PI / 4.9]}
        >
          <boxGeometry args={[3.85, 0.14, 4.5]} />
          <RoofMat />
        </mesh>
      ))}
      {/* Ridge beam capping the roofline */}
      <mesh castShadow position={[0, ROOF + 1.42, 0]}>
        <boxGeometry args={[0.3, 0.16, 4.55]} />
        <meshStandardMaterial color="#a85a36" roughness={0.7} />
      </mesh>
      {/* Gable triangles closing the pediment front and back */}
      {[2.13, -2.13].map((z) => (
        <GableTriangle key={z} z={z} y={ROOF + 0.21} width={6.4} height={1.32} />
      ))}
      {/* Accent medallion on the front gable */}
      <mesh position={[0, ROOF + 0.85, 2.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 28]} />
        <meshStandardMaterial color={accent} metalness={0.65} roughness={0.2} emissive={accent} emissiveIntensity={0.35} />
      </mesh>
      <Pool position={[0, 0, 4.9]} size={[5.6, 1.7]} />
      <RuinedColumn position={[-5.9, 0, 2.4]} rotation={0.7} />
      <CypressTree position={[-7.0, 0, 0.4]} scale={1.15} seed={2} />
      <CypressTree position={[6.6, 0, 1.4]} scale={0.95} seed={3} />
      <OliveTree position={[6.4, 0, -2.4]} scale={1.05} seed={4} />
      <Urn position={[-2.3, BASE + 0.02, 2.0]} />
      <Urn position={[2.3, BASE + 0.02, 2.0]} />
      <Brazier position={[-3.9, BASE + 0.02, 1.9]} />
      <Brazier position={[3.9, BASE + 0.02, 1.9]} />
    </group>
  );
}

function Stoa({ accent }: { accent: string }) {
  const COL_H = 3.0;
  const colXs = [-4.2, -2.5, -0.8, 0.9, 2.6, 4.3];

  return (
    <group>
      <Platform />
      <mesh castShadow receiveShadow position={[0, BASE + 1.8, -1.7]}>
        <boxGeometry args={[9.4, 3.6, 0.45]} />
        <MarbleMat color="#e9e4d8" />
      </mesh>
      {/* Painted fresco panels (Stoa Poikile) */}
      {[-3.4, -1.2, 1.0, 3.2].map((x, i) => (
        <mesh key={x} position={[x, BASE + 2.0, -1.44]}>
          <boxGeometry args={[1.7, 1.5, 0.04]} />
          <meshStandardMaterial color={['#9a4a5a', accent, '#5b7fb9', '#7a9a59'][i]} roughness={0.65} />
        </mesh>
      ))}
      {colXs.map((cx) => (
        <Column key={cx} position={[cx, BASE, 1.62]} height={COL_H} />
      ))}
      <mesh castShadow receiveShadow position={[0, BASE + COL_H + 0.2, 0]}>
        <boxGeometry args={[9.6, 0.36, 3.8]} />
        <MarbleMat color="#ede8de" />
      </mesh>
      {/* Terracotta shed roof, tilted so the tiled surface faces the camera */}
      <mesh castShadow receiveShadow position={[0, BASE + COL_H + 0.66, -0.2]} rotation={[0.34, 0, 0]}>
        <boxGeometry args={[9.8, 0.14, 3.7]} />
        <RoofMat />
      </mesh>
      <mesh castShadow position={[0, BASE + COL_H + 1.26, -1.95]}>
        <boxGeometry args={[9.85, 0.16, 0.28]} />
        <meshStandardMaterial color="#a85a36" roughness={0.7} />
      </mesh>
      {/* Bench + scrolls */}
      <mesh castShadow receiveShadow position={[0.5, BASE + 0.3, 0.9]}>
        <boxGeometry args={[3.5, 0.22, 0.45]} />
        <MarbleMat color="#e9e4d8" />
      </mesh>
      {[-0.6, 0.2, 1.1].map((x, i) => (
        <mesh key={x} castShadow position={[x, BASE + 0.47, 0.95]} rotation={[Math.PI / 2, 0, i * 0.6]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
          <meshStandardMaterial color="#e9ddbe" roughness={0.7} />
        </mesh>
      ))}
      <RuinedColumn position={[5.6, 0, 2.6]} rotation={2.4} />
      <CypressTree position={[-6.6, 0, 1.6]} scale={1.1} seed={6} />
      <OliveTree position={[6.6, 0, 0.2]} scale={1.0} seed={7} />
      <Urn position={[4.0, BASE + 0.02, 1.8]} />
      <Brazier position={[-4.4, BASE + 0.02, 1.9]} />
    </group>
  );
}

function Observatory({ accent }: { accent: string }) {
  return (
    <group>
      <Platform />
      <mesh castShadow receiveShadow position={[0, BASE + 1.7, 0]}>
        <cylinderGeometry args={[2.1, 2.45, 3.4, 36]} />
        <MarbleMat color="#e3ded2" />
      </mesh>
      {/* Door + star-chart band */}
      <mesh position={[0, BASE + 0.95, 2.28]}>
        <boxGeometry args={[0.8, 1.9, 0.1]} />
        <meshStandardMaterial color="#15131c" roughness={0.9} />
      </mesh>
      <mesh position={[0, BASE + 2.85, 0]}>
        <cylinderGeometry args={[2.17, 2.17, 0.45, 36, 1, true]} />
        <meshStandardMaterial color={accent} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* Balcony + upper drum */}
      <mesh castShadow receiveShadow position={[0, BASE + 3.6, 0]}>
        <cylinderGeometry args={[2.55, 2.75, 0.4, 36]} />
        <MarbleMat color="#ece7da" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, BASE + 4.35, 0]}>
        <cylinderGeometry args={[1.75, 2.05, 1.1, 36]} />
        <MarbleMat color="#efeadd" />
      </mesh>
      {/* Dome */}
      <mesh castShadow position={[0, BASE + 4.9, 0]}>
        <sphereGeometry args={[1.5, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={accent} metalness={0.45} roughness={0.3} />
      </mesh>
      {/* Gold meridian ribs on the dome */}
      {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rot) => (
        <mesh key={rot} position={[0, BASE + 4.9, 0]} rotation={[0, rot, 0]}>
          <torusGeometry args={[1.51, 0.022, 10, 40, Math.PI]} />
          <meshStandardMaterial color="#d9ad4f" metalness={0.85} roughness={0.18} />
        </mesh>
      ))}
      <mesh castShadow position={[0, BASE + 6.5, 0]}>
        <sphereGeometry args={[0.13, 14, 14]} />
        <meshStandardMaterial color="#ffd56e" metalness={0.95} roughness={0.06} emissive="#d9ad4f" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* Floating armillary sphere */}
      <Float floatIntensity={0.5} speed={1.3} rotationIntensity={0.5}>
        <group position={[3.6, BASE + 3.3, 1.6]}>
          {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rot, i) => (
            <mesh key={i} rotation={[0, rot, Math.PI / 7]}>
              <torusGeometry args={[0.7, 0.026, 14, 48]} />
              <meshStandardMaterial color="#d9ad4f" metalness={0.9} roughness={0.12} emissive="#d9ad4f" emissiveIntensity={0.5} />
            </mesh>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.7, 0.026, 14, 48]} />
            <meshStandardMaterial color="#d9ad4f" metalness={0.9} roughness={0.12} emissive="#d9ad4f" emissiveIntensity={0.5} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.13, 18, 18]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
          <pointLight intensity={1.6} distance={5} color={accent} />
          <Sparkles count={16} scale={1.8} size={2.4} speed={0.4} color="#e8c87a" />
        </group>
        {/* Pedestal under the sphere */}
      </Float>
      <mesh castShadow receiveShadow position={[3.6, BASE + 1.1, 1.6]}>
        <cylinderGeometry args={[0.14, 0.2, 2.2, 14]} />
        <MarbleMat color="#e6e1d4" />
      </mesh>
      <Column position={[-2.9, BASE, 1.9]} height={2.6} />
      <RuinedColumn position={[-5.6, 0, 2.6]} rotation={1.9} />
      <CypressTree position={[-6.8, 0, 0.6]} scale={1.05} seed={8} />
      <CypressTree position={[6.6, 0, -1.2]} scale={0.9} seed={9} />
      <OliveTree position={[6.2, 0, 2.2]} scale={0.95} seed={10} />
      <Brazier position={[-3.6, BASE + 0.02, 2.3]} />
    </group>
  );
}

function Cafe({ accent }: { accent: string }) {
  return (
    <group>
      <Platform />
      {/* Building with two floors */}
      <mesh castShadow receiveShadow position={[0.3, BASE + 2.2, -0.5]}>
        <boxGeometry args={[6.4, 4.4, 4.0]} />
        <MarbleMat color="#e9e2d2" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.3, BASE + 4.65, -0.5]}>
        <boxGeometry args={[6.6, 0.5, 4.2]} />
        <meshStandardMaterial color="#3e4450" roughness={0.6} />
      </mesh>
      {/* Mansard roof */}
      <mesh castShadow receiveShadow position={[0.3, BASE + 5.4, -0.5]}>
        <boxGeometry args={[5.8, 1.0, 3.4]} />
        <meshStandardMaterial color="#525a6a" roughness={0.55} metalness={0.2} />
      </mesh>
      {/* Dormer windows */}
      {[-1.4, 0.3, 2.0].map((x) => (
        <mesh key={x} position={[x, BASE + 5.4, 1.22]}>
          <boxGeometry args={[0.55, 0.55, 0.1]} />
          <meshStandardMaterial color="#f5d98b" emissive="#f5c96a" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      ))}
      {/* Door + glowing windows */}
      <mesh position={[-1.6, BASE + 1.05, 1.52]}>
        <boxGeometry args={[0.75, 2.1, 0.08]} />
        <meshStandardMaterial color="#37251a" roughness={0.7} />
      </mesh>
      {[0.0, 1.5].map((wx) => (
        <mesh key={wx} position={[wx + 0.4, BASE + 1.35, 1.53]}>
          <boxGeometry args={[1.0, 1.5, 0.06]} />
          <meshStandardMaterial color="#f5d98b" emissive="#f5c96a" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      ))}
      {/* Second-floor windows with shutters */}
      {[-1.8, -0.2, 1.4].map((wx) => (
        <group key={wx} position={[wx + 0.3, BASE + 3.4, 1.52]}>
          <mesh>
            <boxGeometry args={[0.7, 1.1, 0.06]} />
            <meshStandardMaterial color="#2c3242" roughness={0.4} metalness={0.2} />
          </mesh>
          {[-0.48, 0.48].map((sx) => (
            <mesh key={sx} position={[sx, 0, 0]}>
              <boxGeometry args={[0.22, 1.1, 0.04]} />
              <meshStandardMaterial color={accent} roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Awning with scalloped stripes */}
      <mesh castShadow position={[0.4, BASE + 2.75, 2.1]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[5.6, 0.08, 1.4]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => -2.0 + i * 0.8).map((x, i) =>
        i % 2 === 0 ? (
          <mesh key={x} castShadow position={[x + 0.4, BASE + 2.76, 2.1]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.4, 0.1, 1.4]} />
            <meshStandardMaterial color="#f6f1e6" roughness={0.85} />
          </mesh>
        ) : null,
      )}
      {/* Café tables with marble tops */}
      {[
        [-3.3, 1.6],
        [-4.4, 2.6],
        [4.0, 1.8],
      ].map(([tx, tz], ti) => (
        <group key={ti} position={[tx, BASE + 0.02, tz]}>
          <mesh castShadow position={[0, 0.52, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.05, 22]} />
            <MarbleMat color="#f2eee4" />
          </mesh>
          <mesh castShadow position={[0, 0.27, 0]}>
            <cylinderGeometry args={[0.035, 0.05, 0.5, 10]} />
            <meshStandardMaterial color="#23262e" metalness={0.6} roughness={0.4} />
          </mesh>
          {[[-0.55, 0], [0.55, 0.1]].map(([cx, cz], ci) => (
            <group key={ci} position={[cx, 0, cz]}>
              <mesh castShadow position={[0, 0.24, 0]}>
                <cylinderGeometry args={[0.16, 0.16, 0.04, 14]} />
                <meshStandardMaterial color="#7a4a2a" roughness={0.8} />
              </mesh>
              <mesh castShadow position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.025, 0.035, 0.24, 8]} />
                <meshStandardMaterial color="#23262e" metalness={0.6} roughness={0.4} />
              </mesh>
              <mesh castShadow position={[0, 0.42, -0.13]}>
                <boxGeometry args={[0.3, 0.36, 0.03]} />
                <meshStandardMaterial color="#7a4a2a" roughness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
      {/* Lamppost */}
      <group position={[-5.6, 0.1, 2.3]}>
        <mesh castShadow position={[0, 1.75, 0]}>
          <cylinderGeometry args={[0.04, 0.09, 3.5, 10]} />
          <meshStandardMaterial color="#1e222c" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, 3.6, 0]}>
          <sphereGeometry args={[0.17, 18, 18]} />
          <meshStandardMaterial color="#ffe9b0" emissive="#f5c96a" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 3.6, 0]} intensity={2.4} distance={7} decay={2} color="#ffb95e" />
      </group>
      <CypressTree position={[6.4, 0, 0.0]} scale={0.85} seed={11} />
      <OliveTree position={[5.8, 0, 3.0]} scale={0.9} seed={12} />
    </group>
  );
}

function Library({ accent }: { accent: string }) {
  return (
    <group>
      <Platform />
      <mesh castShadow receiveShadow position={[0, BASE + 2.1, 0]}>
        <boxGeometry args={[6.8, 4.2, 4.4]} />
        <MarbleMat color="#e3ded2" />
      </mesh>
      {/* Engaged columns between glowing arched windows */}
      {[-2.9, -1.45, 0.05, 1.55, 3.0].map((x) => (
        <mesh key={x} castShadow position={[x, BASE + 1.9, 2.24]}>
          <cylinderGeometry args={[0.12, 0.14, 3.6, 18]} />
          <MarbleMat fluted />
        </mesh>
      ))}
      {[-2.2, -0.7, 0.8, 2.3].map((wx) => (
        <group key={wx} position={[wx, BASE + 1.85, 2.22]}>
          <mesh>
            <boxGeometry args={[0.8, 2.6, 0.06]} />
            <meshStandardMaterial color="#f5d98b" emissive="#f0bd5d" emissiveIntensity={1.3} toneMapped={false} />
          </mesh>
          <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.06, 20, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#f5d98b" emissive="#f0bd5d" emissiveIntensity={1.3} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* Entablature + drum + coffered dome */}
      <mesh castShadow receiveShadow position={[0, BASE + 4.4, 0]}>
        <boxGeometry args={[7.1, 0.4, 4.7]} />
        <MarbleMat color="#ece7da" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, BASE + 5.2, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 1.2, 36]} />
        <MarbleMat color="#efeadd" />
      </mesh>
      <mesh castShadow position={[0, BASE + 5.85, 0]}>
        <sphereGeometry args={[1.85, 36, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={accent} metalness={0.4} roughness={0.32} />
      </mesh>
      {/* Dome ribs */}
      {[0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].map((rot) => (
        <mesh key={rot} position={[0, BASE + 5.85, 0]} rotation={[0, rot, 0]}>
          <torusGeometry args={[1.86, 0.025, 10, 40, Math.PI]} />
          <meshStandardMaterial color="#d9ad4f" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Gold finial */}
      <mesh castShadow position={[0, BASE + 7.85, 0]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color="#ffd56e" metalness={0.95} roughness={0.06} emissive="#d9ad4f" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      {/* Grand staircase */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} castShadow receiveShadow position={[0, BASE - 0.1 - i * 0.16, 2.5 + i * 0.34]}>
          <boxGeometry args={[3.2 + i * 0.5, 0.16, 0.36]} />
          <MarbleMat color="#e6e1d4" />
        </mesh>
      ))}
      {/* Giant leaning books */}
      {[
        { x: -4.9, h: 2.5, w: 0.55, d: 1.3, color: accent, rot: -0.12 },
        { x: -4.15, h: 2.1, w: 0.46, d: 1.15, color: '#8a3a4a', rot: -0.04 },
        { x: -3.5, h: 1.75, w: 0.4, d: 1.0, color: '#4a6ba9', rot: 0.05 },
      ].map(({ x, h, w, d, color, rot }, i) => (
        <group key={i} position={[x, 0.1, 2.2]} rotation={[0, 0.25, rot]}>
          <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={color} roughness={0.62} />
          </mesh>
          {/* Page block */}
          <mesh position={[w * 0.18, h / 2, 0]}>
            <boxGeometry args={[w * 0.7, h * 0.94, d * 1.02]} />
            <meshStandardMaterial color="#f1e8d2" roughness={0.85} />
          </mesh>
        </group>
      ))}
      <RuinedColumn position={[5.4, 0, 2.8]} rotation={2.1} />
      <CypressTree position={[6.6, 0, 0.6]} scale={1.0} seed={13} />
      <OliveTree position={[-6.4, 0, 0.8]} scale={1.0} seed={14} />
      <Brazier position={[3.4, BASE + 0.02, 2.0]} />
    </group>
  );
}

// ── Stage: sky, lights, ground, postprocessing ───────────────────────────────

function Stage() {
  const ground = useMemo(getGroundTexture, []);
  return (
    <>
      <SoftShadows size={24} samples={14} focus={0.6} />
      <Sky sunPosition={[1, 0.5, 0.4]} turbidity={6.5} rayleigh={2.0} mieCoefficient={0.004} mieDirectionalG={0.85} />
      <ambientLight intensity={0.4} color="#fff6e4" />
      <hemisphereLight args={['#a8c8e8', '#cabb98', 0.5]} />
      <directionalLight
        position={[14, 20, 11]}
        intensity={2.4}
        castShadow
        color="#fff6d4"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-8, 5, -8]} intensity={0.3} color="#9db4dd" />
      {/* Lightformers give the clearcoat marble something real to reflect */}
      <Environment resolution={128}>
        <Lightformer intensity={1.6} position={[8, 7, 5]} scale={[6, 4, 1]} color="#fff3da" />
        <Lightformer intensity={0.8} position={[-7, 4, -4]} scale={[5, 3, 1]} color="#cfe0f5" />
        <Lightformer intensity={0.5} rotation-x={Math.PI / 2} position={[0, 10, 0]} scale={[12, 12, 1]} color="#fdf6e8" />
      </Environment>
      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={26} blur={2.8} far={9} />
      {/* Textured ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[48, 48]} />
        <meshStandardMaterial map={ground} color="#d6c9a8" roughness={0.95} />
      </mesh>
      {/* Drifting golden dust over the whole diorama */}
      <Sparkles position={[0, 4, 0]} count={50} scale={[16, 8, 12]} size={1.6} speed={0.18} color="#e8c87a" opacity={0.4} />
    </>
  );
}

function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <N8AO aoRadius={1.6} intensity={4.5} distanceFalloff={2.5} quality="performance" />
      <Bloom mipmapBlur luminanceThreshold={1.0} intensity={0.55} radius={0.75} />
      <Vignette eskil={false} offset={0.22} darkness={0.5} />
    </EffectComposer>
  );
}

// ── Scene map + canvas export ─────────────────────────────────────────────────

const SCENES: Record<School['scene'], (accent: string) => ReactNode> = {
  agora: (a) => <Temple accent={a} columns={3} />,
  academy: (a) => <Temple accent={a} columns={4} />,
  lyceum: (a) => <Temple accent={a} columns={5} />,
  stoa: (a) => <Stoa accent={a} />,
  observatory: (a) => <Observatory accent={a} />,
  cafe: (a) => <Cafe accent={a} />,
  library: (a) => <Library accent={a} />,
};

const SCENE_SEEDS: Record<School['scene'], number> = {
  agora: 1, academy: 2, lyceum: 3, stoa: 4, observatory: 5, cafe: 6, library: 7,
};

/** Per-scene framing: orthographic zoom + look-at height. */
const SCENE_CAM: Record<School['scene'], { zoom: number; y: number }> = {
  agora: { zoom: 27, y: 2.6 },
  academy: { zoom: 27, y: 2.6 },
  lyceum: { zoom: 27, y: 2.6 },
  stoa: { zoom: 28, y: 2.3 },
  observatory: { zoom: 27, y: 3.0 },
  cafe: { zoom: 26, y: 3.0 },
  library: { zoom: 25, y: 3.2 },
};

export default function IsometricScene3D({ scene, accent }: { scene: School['scene']; accent: string }) {
  const cam = SCENE_CAM[scene];
  return (
    <Canvas
      shadows
      orthographic
      camera={{ position: [20, 15, 20], zoom: cam.zoom, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: false }}
    >
      <fog attach="fog" args={['#dad3c2', 45, 110]} />
      <Stage />
      <GroundLife seed={SCENE_SEEDS[scene]} />
      {SCENES[scene](accent)}
      <Effects />
      {/* Rotate-only museum-model controls with a slow idle spin */}
      <OrbitControls
        target={[0, cam.y, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}
