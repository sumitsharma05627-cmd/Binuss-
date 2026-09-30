import React from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export const Success2D: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <div className="relative w-full h-[220px] flex flex-col items-center justify-center select-none">
      {/* Animated Ripple Waves */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut' }}
        className="absolute w-28 h-28 rounded-full border-2 border-emerald-400"
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.3, 1.6], opacity: [0.5, 0.2, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.6, ease: 'easeOut' }}
        className="absolute w-36 h-36 rounded-full border border-teal-400"
      />

      {/* Radiant Glowing Background */}
      <div
        className="absolute w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
        style={{
          background: themeConfig.primaryColor
        }}
      />

      {/* Main Checkmark Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`,
          boxShadow: `0 0 45px -8px ${themeConfig.primaryColor}80`
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <Check className="w-12 h-12 text-slate-950 stroke-[3]" />
        </motion.div>
      </motion.div>

      {/* Confetti Sparks */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-300"
      >
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span>Inquiry Logged into High-Priority Queue</span>
      </motion.div>
    </div>
  );
};
