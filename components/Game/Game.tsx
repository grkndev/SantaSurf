// @ts-nocheck
import React, { useState } from "react";
import { View } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { GameScene } from "./GameScene";

export function Game() {
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
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={swipe}>
      <View style={{ flex: 1 }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
          <GameScene characterPosition={currentIndex} />
        </Canvas>
      </View>
    </GestureDetector>
  );
}
