// @ts-nocheck

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    require("@/assets/santa_clauss_sleigh/santa_clauss_sleigh.glb")
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sledge_low_sledge_0.geometry}
        material={materials.sledge}
        position={[406.238, -63.304, 0]}
        rotation={[1.571, 1.51, -1.571]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.gifts_low_gifts_0.geometry}
        material={materials.gifts}
        position={[-86.725, 213.604, 73.699]}
        rotation={[-Math.PI / 2, 0.002, 0]}
        scale={[38.633, 43.795, 43.795]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cloth_low_cloth_0.geometry}
        material={materials.cloth}
        position={[-174.828, 185.526, -57.183]}
        rotation={[-Math.PI / 2, -0.449, 0]}
        scale={[94.553, 85.303, 94.553]}
      />
    </group>
  );
}

useGLTF.preload(
  require("@/assets/santa_clauss_sleigh/santa_clauss_sleigh.glb")
);
