// @ts-nocheck
import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber/native";
import { useGLTF } from "@react-three/drei/native";
import { Model } from "../Models/SantaClauss/Model";
import { useSharedValue } from "react-native-reanimated";

export function Character({ position }) {
  return (
    <Suspense fallback={null}>
      <AnimatedModel offset={position} />
    </Suspense>
  );
}

function AnimatedModel(props) {
  const mesh = React.useRef();
  const currentOffset = useSharedValue(0);

  useFrame((state, delta) => {
    if (props.offset.value !== currentOffset.value) {
      mesh.current.position.x = props.offset.value;
      currentOffset.value = props.offset.value;
    }
  });
  return (
    <mesh scale={1} {...props} ref={mesh} position={[0, -1, 0]}>
      <Model rotation={[1, 1.6, 0]} scale={0.0018} />
    </mesh>
  );
}
