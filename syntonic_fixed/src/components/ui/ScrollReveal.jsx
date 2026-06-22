import { motion } from 'motion/react';

const presets = {
  'fade-up':    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  'fade-down':  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  'fade-left':  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
  'fade':       { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  'scale':      { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
};

export default function ScrollReveal({
  children,
  direction = 'fade-up',
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
}) {
  const { hidden, visible } = presets[direction] || presets['fade-up'];

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
