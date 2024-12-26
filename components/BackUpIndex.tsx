// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Model } from "@/components/Models/SantaClauss/Model";
import Animated, {
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

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

export default function Index() {
  const firstLocation = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const swipe = Gesture.Fling()
    .onBegin((event) => {
      firstLocation.value = event.x;
    })
    .onFinalize((event) => {
      if (firstLocation.value - event.x > 0) {
        if (Math.floor(currentIndex.value) <= -1) return;
        currentIndex.value = withSpring(Math.floor(currentIndex.value) - 1);
        return;
      }
      if (Math.floor(currentIndex.value) >= 1) return;
      currentIndex.value = withSpring(Math.floor(currentIndex.value) + 1);
    }).runOnJS(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureDetector gesture={swipe}>
        <Animated.View className={"flex-1 flex "}>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />

            <Suspense fallback={null}>
              <AnimatedModel
                offset={currentIndex}
              />
            </Suspense>
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}
