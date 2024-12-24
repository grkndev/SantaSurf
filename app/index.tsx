// @ts-nocheck
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import React, { Suspense } from "react";
import { Model } from "@/components/Model/SantaClauss/Model";

function Test(props) {
  const mesh = React.useRef();
  useFrame((state, delta) => {
    let { x, y, z } = props.animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += -y;
  });

  return (
    <mesh {...props} ref={mesh}>
      <Model rotation={[0.8, 1.565, 0]} scale={0.002} />
    </mesh>
  );
}
export default function Index() {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />

      <Suspense fallback={null}>
        <Test animatedSensor={animatedSensor} />
        {/* <Model rotation={[0.8, 1.565, 0]} scale={0.002} /> */}
      </Suspense>
    </Canvas>
  );
}
