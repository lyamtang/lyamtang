'use client';

import * as React from 'react';
import styled from 'styled-components';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = mounted && resolvedTheme === 'light';

  const handleToggle = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <StyledWrapper>
      <label className="switch" aria-label="Toggle theme" title="Toggle theme">
        {!mounted && <span className="switch-placeholder" aria-hidden="true" />}
        <input
          id="checkbox"
          type="checkbox"
          suppressHydrationWarning
          disabled={!mounted}
          checked={isLight}
          onChange={handleToggle}
          aria-checked={isLight}
          role="switch"
        />
        <span className="slider" aria-hidden="true">
          <div className="star star_1" />
          <div className="star star_2" />
          <div className="star star_3" />
          <svg viewBox="0 0 16 16" className="cloud_1 cloud">
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            />
          </svg>
        </span>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 4em;
    height: 2.2em;
    border-radius: 30px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);
    border: 1px solid color-mix(in oklab, var(--border) 85%, transparent);
    vertical-align: middle;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch-placeholder {
    position: absolute;
    inset: 0;
    border-radius: 30px;
    background-color: color-mix(in oklab, #6eb8e6 74%, #dff3ff);
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: color-mix(in oklab, var(--muted) 72%, #131a28);
    transition: 0.35s;
    border-radius: 30px;
    overflow: hidden;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 1.16em;
    width: 1.16em;
    border-radius: 20px;
    left: 0.54em;
    bottom: 0.5em;
    transition: 0.35s;
    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  .switch input:checked + .slider {
    background-color: color-mix(in oklab, #6eb8e6 74%, #dff3ff);
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.72em);
    box-shadow: inset 15px -4px 0px 15px #f2c979;
  }

  .switch input:not(:checked) + .slider:before {
    box-shadow: inset 10px -4px 0px 0px #fff;
  }

  .switch input:focus-visible + .slider {
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--ring) 72%, transparent);
  }

  .star {
    background-color: rgba(255, 255, 255, 0.82);
    border-radius: 50%;
    position: absolute;
    width: 4px;
    transition: all 0.35s;
    height: 4px;
  }

  .star_1 {
    left: 2.45em;
    top: 0.52em;
  }

  .star_2 {
    left: 2.18em;
    top: 1.18em;
  }

  .star_3 {
    left: 2.9em;
    top: 0.9em;
  }

  .switch input:checked ~ .slider .star {
    opacity: 0;
  }

  .cloud {
    width: 3.45em;
    position: absolute;
    bottom: -1.35em;
    left: -1.08em;
    opacity: 0;
    transition: all 0.35s;
    filter: saturate(0.85) brightness(0.95);
  }

  .switch input:checked ~ .slider .cloud {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .slider,
    .slider:before,
    .star,
    .cloud {
      transition: none !important;
    }
  }

  @media (min-width: 768px) {
    .switch {
      font-size: 15px;
    }
  }
`;
