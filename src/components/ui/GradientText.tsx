'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import './GradientText.css';

type GradientVariant = 'linear' | 'flow' | 'conic';
type GradientDirection = 'horizontal' | 'vertical' | 'diagonal';

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
  variant?: GradientVariant;
  angle?: number;
  direction?: GradientDirection;
  scale?: number;
  yoyo?: boolean;
  glow?: number;
  showBorder?: boolean;
  borderWidth?: number;
  pauseOnHover?: boolean;
  followPointer?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface GradientSettings {
  colors: string[];
  speed: number;
  variant: GradientVariant;
  angle: number;
  scale: number;
  yoyo: boolean;
  pauseOnHover: boolean;
  followPointer: boolean;
}

interface GradientState {
  time: number;
  inside: boolean;
  visible: boolean;
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  pull: number;
}

type GradientRootStyle = CSSProperties & {
  '--gt-gradient': string;
  '--gt-border': string;
  '--gt-glow': number;
};

const ANGLES: Record<GradientDirection, number> = {
  horizontal: 90,
  vertical: 180,
  diagonal: 135,
};
const TAU = Math.PI * 2;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export default function GradientText({
  children,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  variant = 'linear',
  angle = 90,
  direction,
  scale = 3,
  yoyo = true,
  glow = 0,
  showBorder = false,
  borderWidth = 1.5,
  pauseOnHover = false,
  followPointer = false,
  className = '',
  style,
}: GradientTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const settingsRef = useRef<GradientSettings | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const palette =
    colors.length > 1 ? colors : [colors[0] ?? '#ffffff', colors[0] ?? '#ffffff'];

  useEffect(() => {
    const currentPalette =
      colors.length > 1 ? colors : [colors[0] ?? '#ffffff', colors[0] ?? '#ffffff'];
    settingsRef.current = {
      colors: currentPalette,
      speed: Math.max(0.2, animationSpeed),
      variant,
      angle: direction ? ANGLES[direction] ?? angle : angle,
      scale: clamp(scale, 1, 6),
      yoyo,
      pauseOnHover,
      followPointer,
    };
    wakeRef.current?.();
  }, [colors, animationSpeed, variant, angle, direction, scale, yoyo, pauseOnHover, followPointer]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state: GradientState = {
      time: 0,
      inside: false,
      visible: true,
      x: 0.5,
      y: 0.5,
      px: 0.5,
      py: 0.5,
      vx: 0,
      vy: 0,
      pull: 0,
    };
    let raf = 0;
    let last = 0;
    let alive = true;

    const paint = (): void => {
      const settings = settingsRef.current;
      if (!settings) return;

      const list = settings.colors;
      const cycle = state.time / settings.speed;
      let image: string;

      if (settings.variant === 'flow') {
        const blobs = list.map((color, index) => {
          const spin = cycle * TAU;
          const rate = 0.55 + ((index * 0.618) % 1) * 0.5;
          let x = 50 + 44 * Math.sin(spin * rate + index * 2.1);
          let y = 50 + 40 * Math.sin(spin * (rate * 0.83 + 0.21) + index * 1.3);
          if (index === 0) {
            x += (state.px * 100 - x) * state.pull;
            y += (state.py * 100 - y) * state.pull;
          }
          return `radial-gradient(ellipse ${(22 + 12 * settings.scale).toFixed(1)}% ${(60 + 30 * settings.scale).toFixed(1)}% at ${x.toFixed(2)}% ${y.toFixed(2)}%, ${color} 0%, transparent 100%)`;
        });
        image = `${blobs.join(', ')}, linear-gradient(${settings.angle}deg, ${list.join(', ')})`;
      } else if (settings.variant === 'conic') {
        const sway = settings.yoyo ? Math.sin(cycle * Math.PI) * 50 : cycle * 360;
        const centerX = 50 + (state.px * 100 - 50) * state.pull;
        const centerY = 260 + (state.py * 100 - 260) * state.pull;
        image = `repeating-conic-gradient(from ${(sway - 30).toFixed(2)}deg at ${centerX.toFixed(2)}% ${centerY.toFixed(2)}%, ${[...list, list[0]].map((color, index) => `${color} ${((index / list.length) * 60 * (3 / settings.scale)).toFixed(2)}deg`).join(', ')})`;
      } else {
        const loop = [...list, list[0]];
        const period = 100 * settings.scale;
        let offset: number;
        if (settings.yoyo) {
          const swing = cycle % 2;
          const t = swing < 1 ? swing : 2 - swing;
          offset = (0.5 - Math.cos(Math.PI * t) / 2) * (period - 100);
        } else {
          offset = (cycle % 1) * period;
        }
        offset += (state.px - 0.5) * period * 0.5 * state.pull;
        const stops = loop.map(
          (color, index) =>
            `${color} ${((index / (loop.length - 1)) * period - offset).toFixed(2)}%`,
        );
        image = `repeating-linear-gradient(${settings.angle}deg, ${stops.join(', ')})`;
      }

      root.style.setProperty('--gt-gradient', image);
    };

    const tick = (now: number): void => {
      raf = 0;
      if (!alive) return;

      const settings = settingsRef.current;
      if (!settings) return;

      const deltaTime = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const paused = reduceMotion || (settings.pauseOnHover && state.inside);
      if (!paused) state.time += deltaTime;
      const target = settings.followPointer && state.inside ? 1 : 0;
      state.pull += (target - state.pull) * (1 - Math.exp(-deltaTime * 6));
      const stiffness = 160;
      state.vx +=
        ((state.x - state.px) * stiffness - state.vx * 2 * Math.sqrt(stiffness)) * deltaTime;
      state.vy +=
        ((state.y - state.py) * stiffness - state.vy * 2 * Math.sqrt(stiffness)) * deltaTime;
      state.px += state.vx * deltaTime;
      state.py += state.vy * deltaTime;
      paint();

      const settling =
        Math.abs(state.pull - target) > 0.001 ||
        Math.abs(state.vx) + Math.abs(state.vy) > 0.001;
      if (!state.visible || (paused && !settling)) return;
      raf = requestAnimationFrame(tick);
    };

    const wake = (): void => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    wakeRef.current = () => {
      paint();
      wake();
    };

    const locate = (event: PointerEvent): void => {
      const rect = root.getBoundingClientRect();
      state.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      state.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    };

    const onEnter = (event: PointerEvent): void => {
      locate(event);
      if (!state.inside) {
        state.px = state.x;
        state.py = state.y;
      }
      state.inside = true;
      wake();
    };

    const onMove = (event: PointerEvent): void => {
      locate(event);
      wake();
    };

    const onLeave = (): void => {
      state.inside = false;
      wake();
    };

    const observer = new IntersectionObserver((entries) => {
      state.visible = entries.some((entry) => entry.isIntersecting);
      if (state.visible) wake();
    });
    observer.observe(root);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    paint();
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      wakeRef.current = null;
    };
  }, []);

  const loop = [...palette, palette[0] ?? '#ffffff'];
  const rootStyle: GradientRootStyle = {
    '--gt-gradient': `linear-gradient(${direction ? ANGLES[direction] ?? angle : angle}deg, ${loop.join(', ')})`,
    '--gt-border': `${borderWidth}px`,
    '--gt-glow': clamp(glow, 0, 1),
    ...style,
  };

  return (
    <span
      ref={rootRef}
      className={`gradient-text${showBorder ? ' gradient-text--border' : ''}${className ? ` ${className}` : ''}`}
      style={rootStyle}
    >
      <span className="gradient-text__inner">
        <span className="gradient-text__content">{children}</span>
        {glow > 0 ? (
          <span className="gradient-text__glow" aria-hidden="true">
            {children}
          </span>
        ) : null}
      </span>
    </span>
  );
}
