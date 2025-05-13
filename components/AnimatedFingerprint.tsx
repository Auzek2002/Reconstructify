import { motion } from 'framer-motion';

export function AnimatedFingerprint({ className }: { className?: string }) {
  // Rough fingerprint path data—feel free to tweak or replace with more detail
  const paths = [
    "M10 90 C 20 20, 80 20, 90 90",
    "M30 110 C 40 50, 60 50, 70 110",
    "M50 130 C 55 70, 65 70, 70 130"
  ];

  return (
    <motion.svg
      viewBox="0 0 100 150"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: i * 0.2,
            duration: 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.svg>
  );
}
