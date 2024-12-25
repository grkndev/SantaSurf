import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

const options = {
  SIZE: 100,
  PADDING: 16,
  SCREEN_WIDTH: width,
  SCREEN_CENTER: width / 2,
};

const offsets = [
  0,
  options.SCREEN_CENTER - options.SIZE / 2 - options.PADDING,
  options.SCREEN_WIDTH - options.SIZE - 2 * options.PADDING,
];
export default function GesturePage() {
  const firstLocation = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const boxStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offsets[currentIndex.value + 1]) }],
    };
  });

  const swipe = Gesture.Fling()
    .onBegin((event) => {
      firstLocation.value = event.x;
    })
    .onFinalize((event) => {
      if (firstLocation.value - event.x > 0) {
        //LEFT
        // console.log("Swiped LEFT");
        if (currentIndex.value === -1) return;
        currentIndex.value -= 1;
        return;
      }
      //RIGHT
      // console.log("Swiped RIGHT");
      if (currentIndex.value === 1) return;
      currentIndex.value += 1;
    });
  return (
    <SafeAreaView style={{ flex: 1, padding: options.PADDING }}>
      <GestureDetector gesture={swipe}>
        <Animated.View
          style={[
            {
              backgroundColor: "#ef4444",
              height: options.SIZE,
              width: options.SIZE,
            },
            boxStyles,
          ]}
        />
      </GestureDetector>
    </SafeAreaView>
  );
}
