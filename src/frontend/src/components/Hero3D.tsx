import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 80;
const CONNECTION_THRESHOLD = 0.35;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function DataNode({
  position,
  phase,
}: {
  position: [number, number, number];
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const s = 0.85 + 0.3 * Math.sin(t * 0.9 + phase);
    meshRef.current.scale.setScalar(s);
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.4 + 0.6 * Math.sin(t * 1.2 + phase);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.018, 8, 8]} />
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function ConnectionLines({
  positions,
}: {
  positions: [number, number, number][];
}) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, originalPositions } = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_THRESHOLD) {
          pts.push(...positions[i], ...positions[j]);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return { geometry: geom, originalPositions: pts.slice() };
  }, [positions]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.elapsedTime * 0.15;
    const posAttr = linesRef.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] =
        originalPositions[i] +
        0.008 * Math.sin(t * 0.7 + originalPositions[i] * 5);
      arr[i + 1] =
        originalPositions[i + 1] +
        0.008 * Math.cos(t * 0.9 + originalPositions[i + 1] * 5);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#ef4444" transparent opacity={0.18} />
    </lineSegments>
  );
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, phases } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const ph: number[] = [];

    // Fibonacci sphere distribution
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const r = 0.72 + Math.random() * 0.12;
      pos.push([
        r * radius * Math.cos(theta),
        r * y,
        r * radius * Math.sin(theta),
      ]);
      ph.push(Math.random() * Math.PI * 2);
    }

    // Add a handful of interior nodes for depth
    for (let i = 0; i < 18; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 0.25 + Math.random() * 0.35;
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
      ph.push(Math.random() * Math.PI * 2);
    }

    return { positions: pos, phases: ph };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.09;
    groupRef.current.rotation.x = lerp(
      groupRef.current.rotation.x,
      0.2 * Math.sin(t * 0.15),
      0.02,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere outline */}
      <mesh>
        <sphereGeometry args={[0.76, 28, 20]} />
        <meshStandardMaterial
          color="#333333"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Glowing core sphere */}
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#1a0a0a"
          emissive="#ef4444"
          emissiveIntensity={0.4}
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      <ConnectionLines positions={positions} />
      {positions.map((pos, i) => (
        // eslint-disable-next-line react/no-array-index-key -- positions array has no stable ids
        <DataNode
          key={`node-${pos[0].toFixed(4)}-${pos[1].toFixed(4)}`}
          position={pos}
          phase={phases[i]}
        />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#ef4444" />
      <pointLight position={[-2, -1, -1]} intensity={0.4} color="#ffffff" />
      <GlobeMesh />
    </>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.2], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
