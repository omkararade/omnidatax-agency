import { AnimatePresence, motion } from "motion/react";

interface DataScanOverlayProps {
  isVisible: boolean;
}

export function DataScanOverlay({ isVisible }: DataScanOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {/* Dark semi-transparent backdrop */}
          <div
            className="absolute inset-0 scanline-bg"
            style={{ background: "rgba(0,0,0,0.65)" }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "oklch(var(--primary))",
              boxShadow:
                "0 0 12px 2px oklch(var(--primary) / 0.8), 0 0 24px 4px oklch(var(--primary) / 0.4)",
            }}
            initial={{ top: "-2px" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.6, 1] }}
          />

          {/* Faint data text stream (decorative) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0.08] }}
            transition={{ duration: 0.38 }}
          >
            <span
              className="font-mono text-[10px] tracking-widest select-none"
              style={{
                color: "oklch(var(--primary))",
                letterSpacing: "0.3em",
                wordSpacing: "1rem",
              }}
            >
              INITIALIZING DATA STREAM... 0x4F4D4E49 LOADING PIPELINE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
