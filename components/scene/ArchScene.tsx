"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";

// --- Color Palette Constants ---
const COLOR_MAROON = new THREE.Color("#7B1E3A");
const COLOR_GOLD = new THREE.Color("#B8935A");
const COLOR_BLUSH = new THREE.Color("#E89DA2");
const COLOR_LEAF = new THREE.Color("#4A5D3A");
const COLOR_STONE = new THREE.Color("#6E655B");

// --- Component: Individual Arch Ring ---
function ArchRing({
  positionZ,
  width,
  height,
}: {
  positionZ: number;
  width: number;
  height: number;
}) {
  const curve = useMemo(() => {
    const halfW = width / 2;
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-halfW, -1, positionZ),
      new THREE.Vector3(-halfW * 0.95, height * 0.5, positionZ),
      new THREE.Vector3(-halfW * 0.5, height, positionZ),
      new THREE.Vector3(0, height * 1.05, positionZ),
      new THREE.Vector3(halfW * 0.5, height, positionZ),
      new THREE.Vector3(halfW * 0.95, height * 0.5, positionZ),
      new THREE.Vector3(halfW, -1, positionZ),
    ]);
  }, [positionZ, width, height]);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 48, 0.35, 10, false);
  }, [curve]);

  return (
    <mesh geometry={tubeGeo}>
      <meshStandardMaterial
        color={COLOR_STONE}
        roughness={0.88}
        metalness={0.08}
      />
    </mesh>
  );
}

// --- Component: Instanced Foliage & Blossoms along Archways ---
function FloralInstancedFoliage({ count = 450 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const { matrices, colors } = useMemo(() => {
    const matricesArr: THREE.Matrix4[] = [];
    const colorsArr: THREE.Color[] = [];

    const arches = [
      { z: 2, w: 6.2, h: 4.8 },
      { z: -4, w: 5.4, h: 4.4 },
      { z: -10, w: 4.6, h: 4.0 },
      { z: -16, w: 3.8, h: 3.6 },
    ];

    const dummy = new THREE.Object3D();
    const availableColors = [COLOR_MAROON, COLOR_GOLD, COLOR_BLUSH, COLOR_LEAF];

    let itemsCreated = 0;
    const perArchCount = Math.floor(count / arches.length);

    arches.forEach((arch) => {
      const halfW = arch.w / 2;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-halfW, -1, arch.z),
        new THREE.Vector3(-halfW * 0.95, arch.h * 0.5, arch.z),
        new THREE.Vector3(-halfW * 0.5, arch.h, arch.z),
        new THREE.Vector3(0, arch.h * 1.05, arch.z),
        new THREE.Vector3(halfW * 0.5, arch.h, arch.z),
        new THREE.Vector3(halfW * 0.95, arch.h * 0.5, arch.z),
        new THREE.Vector3(halfW, -1, arch.z),
      ]);

      const points = curve.getPoints(perArchCount);

      points.forEach((pt) => {
        if (itemsCreated >= count) return;

        const angle = Math.random() * Math.PI * 2;
        const radius = 0.35 + Math.random() * 0.45;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const offsetZ = (Math.random() - 0.5) * 0.8;

        dummy.position.set(pt.x + offsetX, pt.y + offsetY, pt.z + offsetZ);
        dummy.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        const scale = 0.08 + Math.random() * 0.18;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();

        matricesArr.push(dummy.matrix.clone());

        const colIndex = Math.floor(Math.random() * availableColors.length);
        colorsArr.push(availableColors[colIndex]);

        itemsCreated++;
      });
    });

    return { matrices: matricesArr, colors: colorsArr };
  }, [count]);

  React.useLayoutEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < matrices.length; i++) {
      meshRef.current.setMatrixAt(i, matrices[i]);
      meshRef.current.setColorAt(i, colors[i]);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [matrices, colors]);

  const geometry = useMemo(() => new THREE.DodecahedronGeometry(0.2, 1), []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, matrices.length]}
    >
      <meshStandardMaterial roughness={0.7} metalness={0.1} />
    </instancedMesh>
  );
}

// --- Component: Drifting Petals ---
function DriftingPetals({
  count = 120,
  reducedMotion = false,
}: {
  count?: number;
  reducedMotion?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const { dummy, petalData } = useMemo(() => {
    const dummyObj = new THREE.Object3D();
    const data = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: Math.random() * 6 - 1,
      z: Math.random() * -24 + 4,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedY: 0.2 + Math.random() * 0.4,
      swaySpeed: 0.8 + Math.random() * 1.2,
      swayAmp: 0.2 + Math.random() * 0.3,
      scale: 0.05 + Math.random() * 0.07,
      color: [COLOR_BLUSH, COLOR_MAROON, COLOR_GOLD][
        Math.floor(Math.random() * 3)
      ],
    }));

    return { dummy: dummyObj, petalData: data };
  }, [count]);

  React.useLayoutEffect(() => {
    if (!meshRef.current) return;
    petalData.forEach((p, i) => {
      meshRef.current.setColorAt(i, p.color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [petalData]);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();

    petalData.forEach((p, i) => {
      p.y -= delta * p.speedY;
      if (p.y < -1.2) {
        p.y = 5.5;
        p.x = (Math.random() - 0.5) * 8;
      }

      const currentX = p.x + Math.sin(time * p.swaySpeed + i) * p.swayAmp;
      const currentZ = p.z + Math.cos(time * p.swaySpeed * 0.7 + i) * (p.swayAmp * 0.5);

      dummy.position.set(currentX, p.y, currentZ);
      dummy.rotation.set(
        p.rotX + time * 0.5,
        p.rotY + time * 0.7,
        p.rotZ + time * 0.3
      );
      dummy.scale.set(p.scale, p.scale * 1.4, p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(0.15, 0.22), []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        roughness={0.6}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

// --- Component: Main Scene Content ---
function SceneContent({
  isMobile,
  reducedMotion,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const foliageCount = isMobile ? 140 : 450;
  const petalsCount = isMobile ? 35 : 120;
  const sparklesCount = isMobile ? 25 : 80;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={reducedMotion ? [0, 1.2, 7] : [0, 3.5, 15]}
        fov={45}
        near={0.1}
        far={50}
      />

      {/* GSAP Driven Camera Rig */}
      <CameraRig reducedMotion={reducedMotion} />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={["#F5E6D3", 4, 28]} />

      {/* Warm Ambient & Directional Lighting */}
      <ambientLight color="#FFDFA8" intensity={1.2} />
      <directionalLight
        position={[4, 8, 4]}
        color="#FFF0D4"
        intensity={1.4}
      />

      {/* Volumetric Glowing Light Source at Far End of Tunnel */}
      <pointLight position={[0, 1.8, -21]} color="#FFB852" intensity={8} distance={30} />
      <mesh position={[0, 2.0, -22]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#FFE2A8" transparent opacity={0.65} />
      </mesh>

      {/* Stone Arch Rings */}
      <ArchRing positionZ={2} width={6.2} height={4.8} />
      <ArchRing positionZ={-4} width={5.4} height={4.4} />
      <ArchRing positionZ={-10} width={4.6} height={4.0} />
      <ArchRing positionZ={-16} width={3.8} height={3.6} />

      {/* Instanced Floral Blossoms & Foliage */}
      <FloralInstancedFoliage count={foliageCount} />

      {/* Drifting Petals */}
      <DriftingPetals count={petalsCount} reducedMotion={reducedMotion} />

      {/* Golden Ambient Sparkles */}
      <Sparkles
        count={sparklesCount}
        scale={[10, 6, 25]}
        position={[0, 1.5, -8]}
        size={3.5}
        speed={reducedMotion ? 0 : 0.4}
        color="#FFB852"
      />

      {/* Receding Stone Path Ground */}
      <mesh position={[0, -1, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 36]} />
        <meshStandardMaterial
          color="#D4C7B5"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>
    </>
  );
}

// --- Main Export: ArchScene ---
export default function ArchScene({ onCreated }: { onCreated?: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    checkMobile();
    setReducedMotion(mediaMotion.matches);

    const handleResize = () => checkMobile();
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    window.addEventListener("resize", handleResize);
    mediaMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onCreated={() => {
          onCreated?.();
        }}
      >
        <SceneContent isMobile={isMobile} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
