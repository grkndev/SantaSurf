import React from 'react';

export function Road({ width, length }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

