// @ts-nocheck
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Model } from "@/components/Model/SantaClauss/Model";
import * as THREE from "three";
import Animated, {
  useSharedValue,
  withSpring,
  withDelay,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { useAnimatedSensor, SensorType } from "react-native-reanimated";

// function Test(props) {
//   const mesh = React.useRef();
//   useFrame((state, delta) => {
//     let { x, y, z } = props.animatedSensor.sensor.value;
//     x = ~~(x * 100) / 5000;
//     y = ~~(y * 100) / 5000;
//     mesh.current.rotation.x += x;
//     mesh.current.rotation.y += -y;
//   });

//   return (
//     <mesh {...props} ref={mesh}>
//       <Model rotation={[0.8, 1.565, 0]} scale={0.002} />
//     </mesh>
//   );
// }
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
  //   const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
  //     interval: 100,
  //   });
  const offset = useSharedValue(0);
  // const animatedStyles = useAnimatedStyle(() => ({
  //   transform: [{ translateX: (offset.value < 0 ? -offset.value : offset.value) * 100 }],
  // }));
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
        {/* <Animated.View
          style={[
            {
              top:0,
              left:0,
              backgroundColor: "black",
              height: 100,
              width: 100,
              position: "absolute",
            },
            animatedStyles,
          ]}
        /> */}
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />

          <Suspense fallback={null}>
            <AnimatedModel offset={offset} />
            {/* <Model rotation={[0.8, 1.565, 0]} scale={0.002} /> */}
          </Suspense>
        </Canvas>
      </Animated.View>
    </SafeAreaView>
  );
}
