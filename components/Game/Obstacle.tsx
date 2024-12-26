import React from "react";

export function Obstacle({
  position,
  width,
  height,
  depth,
  scale,
}: ObstacleProps) {
  return (
    <mesh scale={scale} position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

type ObstacleProps = {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  scale: number;
};
