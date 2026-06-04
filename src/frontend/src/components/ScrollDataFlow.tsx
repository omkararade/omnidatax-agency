import { Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const STREAM_COUNT = 5;
const PARTICLES_PER_STREAM = 12;

interface StreamProps {
  xPos: number;
  phaseOffset: number;
  scrollRef: React.MutableRefObject<number>;
  streamIndex: number;
}

function DataStream({
  xPos,
  phaseOffset,
  scrollRef,
  streamIndex,
}: StreamProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Fixed binary digit per slot, seeded by stream + index
  const glyphData = useMemo(
    () =>
      Array.from({ length: PARTICLES_PER_STREAM }, (_, i) => ({
        offset: i / PARTICLES_PER_STREAM,
        char: ((streamIndex * 31 + i * 7) % 3 === 0 ? "0" : "1") as "0" | "1",
        isRed: (i + streamIndex) % 3 !== 0,
      })),
    [streamIndex],
  );

  // Refs to Text mesh objects so we can mutate them in useFrame
  const textRefs = useRef<(THREE.Object3D | null)[]>([]);

  // Subtle horizontal sway per stream so they feel organic
  const swayFreq = 0.3 + streamIndex * 0.07;
  const swayAmp = 0.02 + streamIndex * 0.005;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Base speed increases with scroll
    const speed = 0.18 + scroll * 0.38;
    // Opacity ramps up as streams reveal with scroll
    const streamReveal = Math.max(0, scroll * STREAM_COUNT - streamIndex);
    const revealFactor = Math.min(streamReveal, 1);

    // Sway the whole stream slightly
    const sway = Math.sin(t * swayFreq + phaseOffset) * swayAmp;
    if (groupRef.current) {
      groupRef.current.position.x = xPos + sway;
    }

    // Update each glyph position and opacity
    textRefs.current.forEach((obj, i) => {
      if (!obj) return;
      const { offset } = glyphData[i];
      // travel from y=1 (top) to y=-1 (bottom), looping
      const y = 1 - ((t * speed + offset + phaseOffset * 0.5) % 1) * 2;
      obj.position.y = y;

      // Pulse brightness based on y position — brighter near center
      const brightness = 1 - Math.abs(y) * 0.5;
      const baseOpacity = 0.55 + brightness * 0.45;
      // @ts-expect-error: Text mesh material may not be typed exactly
      const mat = obj.material as THREE.MeshBasicMaterial | undefined;
      if (mat) {
        mat.opacity = baseOpacity * revealFactor;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Binary glyph rain — stable fixed-count array, index keys are safe */}
      {glyphData.map(({ char, isRed }, i) => (
        <Text
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static array, positions never reorder
          key={`g-${streamIndex}-${i}`}
          ref={(el: THREE.Object3D | null) => {
            textRefs.current[i] = el;
          }}
          position={[0, 0, 0]}
          fontSize={0.07}
          color={isRed ? "#e63030" : "#e0e0e0"}
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          material-transparent={true}
          material-opacity={0.7}
          material-blending={THREE.AdditiveBlending}
          material-depthWrite={false}
        >
          {char}
        </Text>
      ))}
    </group>
  );
}

interface SceneProps {
  scrollRef: React.MutableRefObject<number>;
}

function FlowScene({ scrollRef }: SceneProps) {
  // Evenly space streams across x: -0.8 to 0.8
  const streams = useMemo(
    () =>
      Array.from({ length: STREAM_COUNT }, (_, i) => ({
        xPos: -0.8 + (i / (STREAM_COUNT - 1)) * 1.6,
        phaseOffset: (i / STREAM_COUNT) * Math.PI * 2,
        index: i,
      })),
    [],
  );

  return (
    <>
      {streams.map((s) => (
        <DataStream
          key={s.index}
          xPos={s.xPos}
          phaseOffset={s.phaseOffset}
          scrollRef={scrollRef}
          streamIndex={s.index}
        />
      ))}
    </>
  );
}

export default function ScrollDataFlow() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="data-flow-canvas"
      aria-hidden="true"
      data-ocid="scroll_data_flow.canvas_target"
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 70 }}
        dpr={[1, 1.2]}
        style={{ width: "100%", height: "100%" }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <FlowScene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
