"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatBlob({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.18;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x += 0.002;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.65, 8]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.7} transparent opacity={0.32} />
    </mesh>
  );
}

export function AmbientCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <Canvas camera={{ position: [0, 0, 5.5] }}>
        <ambientLight intensity={0.7} />
        <pointLight intensity={1.2} position={[3, 3, 2]} />
        <FloatBlob position={[-1.6, 0.7, -1]} color="#f5f5f5" />
        <FloatBlob position={[1.1, -0.4, -0.8]} color="#cfcfcf" />
      </Canvas>
    </div>
  );
}
