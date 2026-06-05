import { Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// 13 columns spread across the full viewport width
const STREAM_COUNT = 13;
const PARTICLES_PER_STREAM = 15;
// Milliseconds of inactivity before animation freezes
const IDLE_TIMEOUT_MS = 150;
// Scroll px needed to unlock each successive column after the first
const SCROLL_PER_COLUMN = 250;

/**
 * Shared scroll state passed down to Three.js streams.
 * - delta: pixels scrolled since last frame (drives speed)
 * - isScrolling: true only while user is actively scrolling
 * - totalScrolled: cumulative downward scroll distance (drives column reveal)
 */
interface ScrollState {
  delta: number;
  isScrolling: boolean;
  lastScrollY: number;
  totalScrolled: number;
  visibleCount: number;
}

interface StreamProps {
  xPos: number;
  phaseOffset: number;
  scrollStateRef: React.MutableRefObject<ScrollState>;
  streamIndex: number;
  // each stream tracks its own accumulated y-offset so it freezes cleanly
  accRef: React.MutableRefObject<number[]>;
  // per-stream fade-in progress ref: 0 = fully hidden, 1 = fully visible
  fadeRef: React.MutableRefObject<number[]>;
}

function DataStream({
  xPos,
  phaseOffset,
  scrollStateRef,
  streamIndex,
  accRef,
  fadeRef,
}: StreamProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Fixed binary digit per slot, seeded by stream + index
  const glyphData = useMemo(
    () =>
      Array.from({ length: PARTICLES_PER_STREAM }, (_, i) => ({
        // stagger initial positions evenly so columns look full on first scroll
        initialOffset: i / PARTICLES_PER_STREAM + ((streamIndex * 0.17) % 1),
        char: ((streamIndex * 31 + i * 7) % 3 === 0 ? "0" : "1") as "0" | "1",
        isRed: (i + streamIndex) % 3 !== 0,
      })),
    [streamIndex],
  );

  const textRefs = useRef<(THREE.Object3D | null)[]>([]);

  useFrame((_, dt) => {
    const { delta, isScrolling, visibleCount } = scrollStateRef.current;

    // --- Fade-in logic: smoothly interpolate toward target opacity scale ---
    const targetFade = streamIndex < visibleCount ? 1 : 0;
    const currentFade = fadeRef.current[streamIndex] ?? 0;
    // ~0.3s fade: lerp speed ~3.5 per second
    const newFade =
      currentFade + (targetFade - currentFade) * Math.min(1, dt * 3.5);
    fadeRef.current[streamIndex] = newFade;

    // If still fully transparent, skip all updates
    if (newFade < 0.005) return;

    // Only advance positions when actively scrolling
    if (isScrolling && delta > 0) {
      // Convert pixel delta to normalised scene units
      // ~600px of scroll = full column height (2 units)
      const advance = (delta / 600) * 2;
      accRef.current[streamIndex] =
        (accRef.current[streamIndex] ?? 0) + advance;
    }

    const acc = accRef.current[streamIndex] ?? 0;

    if (groupRef.current) {
      groupRef.current.position.x = xPos;
    }

    textRefs.current.forEach((obj, i) => {
      if (!obj) return;
      const { initialOffset } = glyphData[i];
      // Each glyph starts at a staggered position and wraps in [−1, 1]
      const raw =
        initialOffset + acc * (0.9 + (i % 3) * 0.05) + phaseOffset * 0.08;
      const normalised = raw % 1; // 0..1
      // Map to y: starts at top (+1) flows to bottom (−1)
      const y = 1 - normalised * 2;
      obj.position.y = y;

      // Pulse brightness based on y position — brighter near centre
      const brightness = 1 - Math.abs(y) * 0.5;
      const baseOpacity = isScrolling
        ? 0.18 + brightness * 0.12
        : 0.08 + brightness * 0.07; // dimmer when frozen
      // @ts-expect-error: Text mesh material may not be typed exactly
      const mat = obj.material as THREE.MeshBasicMaterial | undefined;
      if (mat) mat.opacity = baseOpacity * newFade;
    });
  });

  return (
    <group ref={groupRef}>
      {glyphData.map(({ char, isRed }, i) => (
        <Text
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static array, positions never reorder
          key={`g-${streamIndex}-${i}`}
          ref={(el: THREE.Object3D | null) => {
            textRefs.current[i] = el;
          }}
          position={[0, 0, 0]}
          fontSize={0.052}
          color={isRed ? "#e63030" : "#e0e0e0"}
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          material-transparent={true}
          material-opacity={0.5}
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
  scrollStateRef: React.MutableRefObject<ScrollState>;
  accRef: React.MutableRefObject<number[]>;
  fadeRef: React.MutableRefObject<number[]>;
}

function FlowScene({ scrollStateRef, accRef, fadeRef }: SceneProps) {
  // Spread 13 streams from x = −1.1 to +1.1 (wider than before to fill viewport)
  const streams = useMemo(
    () =>
      Array.from({ length: STREAM_COUNT }, (_, i) => ({
        xPos: -1.1 + (i / (STREAM_COUNT - 1)) * 2.2,
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
          scrollStateRef={scrollStateRef}
          streamIndex={s.index}
          accRef={accRef}
          fadeRef={fadeRef}
        />
      ))}
    </>
  );
}

export default function ScrollDataFlow() {
  const scrollStateRef = useRef<ScrollState>({
    delta: 0,
    isScrolling: false,
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
    totalScrolled: 0,
    // Column 1 (index 0) is always visible from the start
    visibleCount: 1,
  });

  // Per-stream accumulated y-offsets — lives here so it survives re-renders
  const accRef = useRef<number[]>(
    Array.from({ length: STREAM_COUNT }, () => 0),
  );

  // Per-stream fade-in progress (0→1) — drives smooth opacity reveal
  const fadeRef = useRef<number[]>(
    // Column 0 starts fully visible; the rest start hidden
    Array.from({ length: STREAM_COUNT }, (_, i) => (i === 0 ? 1 : 0)),
  );

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const currentY = window.scrollY;
      const rawDelta = currentY - scrollStateRef.current.lastScrollY;
      const absDelta = Math.abs(rawDelta);

      // Accumulate only downward scroll for the reveal counter
      const prevTotal = scrollStateRef.current.totalScrolled;
      const newTotal = rawDelta > 0 ? prevTotal + rawDelta : prevTotal;

      // Each column after the first unlocks after SCROLL_PER_COLUMN more px
      // Column 0: always visible (threshold = 0)
      // Column 1: threshold = SCROLL_PER_COLUMN
      // Column n: threshold = n * SCROLL_PER_COLUMN
      const newVisibleCount = Math.min(
        STREAM_COUNT,
        1 + Math.floor(newTotal / SCROLL_PER_COLUMN),
      );

      scrollStateRef.current = {
        delta: absDelta,
        isScrolling: true,
        lastScrollY: currentY,
        totalScrolled: newTotal,
        visibleCount: newVisibleCount,
      };

      // Reset idle timer on every scroll event
      if (idleTimer !== null) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        scrollStateRef.current = {
          ...scrollStateRef.current,
          delta: 0,
          isScrolling: false,
        };
      }, IDLE_TIMEOUT_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer !== null) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      className="data-flow-canvas"
      aria-hidden="true"
      data-ocid="scroll_data_flow.canvas_target"
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        dpr={[1, 1.2]}
        style={{ width: "100%", height: "100%" }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <FlowScene
          scrollStateRef={scrollStateRef}
          accRef={accRef}
          fadeRef={fadeRef}
        />
      </Canvas>
    </div>
  );
}
