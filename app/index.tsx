// @ts-nocheck
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Model } from "@/components/Models/SantaClauss/Model";
import * as THREE from "three";
import Animated, {
  useSharedValue,
  withSpring,
  withDelay,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <mesh {...props} ref={mesh}>
      <Model rotation={[1, 1.6, 0]} scale={0.0018} />
    </mesh>
  );
}

export default function Index() {
  const offset = useSharedValue(0);
  const changeOffset = (value) => {
    offset.value = withSpring(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex flex-col items-center justify-center">
        <View className="flex flex-row items-center justify-around w-full p-4">
          <TouchableOpacity
            onPress={() => {
              changeOffset(-1);
            }}
            className="py-3 px-6 bg-zinc-300 flex items-center justify-center rounded-xl"
          >
            <Text>LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeOffset(0);
            }}
            className="py-3 px-6 bg-zinc-300 flex items-center justify-center rounded-xl"
          >
            <Text>CENTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeOffset(1);
            }}
            className="py-3 px-6 bg-zinc-300 flex items-center justify-center rounded-xl"
          >
            <Text>RIGHT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View className={"flex-1 flex "}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />

          <Suspense fallback={null}>
            <AnimatedModel offset={offset} />
          </Suspense>
        </Canvas>
      </Animated.View>
    </SafeAreaView>
  );
}
