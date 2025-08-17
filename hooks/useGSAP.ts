'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GSAPType = typeof gsap;

export function useGSAP(
  callback: (gsap: GSAPType, ctx: gsap.Context) => void,
  dependencies: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap, ctx.current!);
    });

    return () => {
      ctx.current?.revert();
    };
  }, dependencies);

  return ctx;
}