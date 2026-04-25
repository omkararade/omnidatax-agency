import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DataScanOverlay } from "./DataScanOverlay";

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const prevKeyRef = useRef(routeKey);
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prevKeyRef.current !== routeKey) {
      prevKeyRef.current = routeKey;
      setShowOverlay(true);
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 420);
    }
    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    };
  }, [routeKey]);

  return (
    <>
      <DataScanOverlay isVisible={showOverlay} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{
            duration: 0.35,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
