"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

export interface CameraRigProps {
  reducedMotion?: boolean;
  onTimelineCreated?: (tl: gsap.core.Timeline) => void;
}

export function CameraRig({ reducedMotion = false, onTimelineCreated }: CameraRigProps) {
  // Animatable state object for camera position and lookAt target
  const rigRef = useRef({
    camX: reducedMotion ? 0 : 0,
    camY: reducedMotion ? 1.2 : 3.5,
    camZ: reducedMotion ? 7 : 15,
    targetX: 0,
    targetY: 1.2,
    targetZ: -10,
  });

  const lookAtVec = useRef(new THREE.Vector3(0, 1.2, -10));

  useEffect(() => {
    if (reducedMotion) {
      rigRef.current = {
        camX: 0,
        camY: 1.2,
        camZ: 7,
        targetX: 0,
        targetY: 1.2,
        targetZ: -10,
      };
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      // Camera entrance push-in animation (2.5 seconds)
      tl.to(rigRef.current, {
        camX: 0,
        camY: 1.2,
        camZ: 7,
        targetX: 0,
        targetY: 1.2,
        targetZ: -10,
        duration: 2.5,
      });

      if (onTimelineCreated) {
        onTimelineCreated(tl);
      }
    });

    return () => ctx.revert();
  }, [reducedMotion, onTimelineCreated]);

  useFrame((state) => {
    const { camX, camY, camZ, targetX, targetY, targetZ } = rigRef.current;
    state.camera.position.set(camX, camY, camZ);

    lookAtVec.current.set(targetX, targetY, targetZ);
    state.camera.lookAt(lookAtVec.current);
  });

  return null;
}
