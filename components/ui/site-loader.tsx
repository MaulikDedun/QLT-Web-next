"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : value + 5));
    }, 70);

    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[120] grid place-items-center bg-[#0d0d0d] text-white"
        >
          <div className="w-[min(86vw,460px)]">
            <p className="text-xs tracking-[0.28em] uppercase text-white/60">QuantaTechLabs</p>
            <h2 className="mt-4 text-4xl leading-[0.95] md:text-6xl">Loading cinematic systems</h2>
            <div className="mt-10 h-1.5 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-white"
                animate={{ width: `${progress}%` }}
                transition={{ ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
            <p className="mt-3 text-xs text-white/60">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
