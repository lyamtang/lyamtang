"use client";

import type { CSSProperties } from 'react';
import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

type HoverBehavior = 'speedUp' | 'slowDown' | 'pause' | 'goBonkers' | null;

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: HoverBehavior;
  className?: string;
  size?: number;
  radius?: number;
}

type CircularStyleVars = CSSProperties & Record<`--${string}`, string | number>;

const baseContainerStyle: CSSProperties = {
  margin: 0,
  borderRadius: '50%',
  position: 'relative',
  color: 'var(--ct-color)',
  fontWeight: 900,
  textAlign: 'center',
  cursor: 'pointer',
  transformOrigin: '50% 50%',
  WebkitTransformOrigin: '50% 50%',
};

const baseLetterStyle: CSSProperties = {
  position: 'absolute',
  display: 'inline-block',
  left: '50%',
  top: '50%',
  fontSize: 'var(--ct-letter-size)',
  letterSpacing: '0.02em',
  color: 'var(--ct-color)',
  lineHeight: 1,
  userSelect: 'none',
  transition: 'all 0.5s cubic-bezier(0, 0, 0, 1)',
};

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300
  }
});

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  size = 96,
  radius = 38
}: CircularTextProps) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | {
      rotate: { type: 'spring'; damping: number; stiffness: number };
      scale: { type: 'spring'; damping: number; stiffness: number };
    };
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{
        ...baseContainerStyle,
        rotate: rotation,
        width: 'var(--ct-size)',
        height: 'var(--ct-size)',
        '--ct-size': `${size}px`,
        '--ct-radius': `${radius}px`,
        '--ct-letter-size': '0.62rem',
        '--ct-color': 'var(--muted-foreground)',
      } as CircularStyleVars}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const transform = `translate(-50%, -50%) rotate(${rotationDeg}deg) translateY(calc(var(--ct-radius) * -1))`;

        return (
          <span
            key={i}
            style={{
              ...baseLetterStyle,
              transform,
              WebkitTransform: transform,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
