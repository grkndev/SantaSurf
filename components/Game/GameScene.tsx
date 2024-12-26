// @ts-nocheck
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber/native";
import { Character } from "./Character";
import { Road } from "./Roads";
import { Obstacle } from "./Obstacle";
import { gameConfig } from "./GameConfig";

export function GameScene({ characterPosition }) {
  const [obstacles, setObstacles] = useState([]);
  const lanes = [-.2, 0, .2];
  const lastSpawnTime = useRef(0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Move existing obstacles
    setObstacles((prevObstacles) => {
      const movedObstacles = prevObstacles.map((obs) => ({
        ...obs,
        z: obs.z + delta * gameConfig.obstacle.speed,
      }));

      // Remove obstacles that have moved past the character
      const filteredObstacles = movedObstacles.filter((obs) => obs.z < 10);

      // Spawn new obstacles
      if (time - lastSpawnTime.current > gameConfig.obstacle.spawnInterval) {
        lastSpawnTime.current = time;

        const newLanes = [...lanes];
        const blockedLanes = [];
        for (let i = 0; i < 2; i++) {
          if (newLanes.length > 0) {
            const index = Math.floor(Math.random() * newLanes.length);
            blockedLanes.push(newLanes[index]);
            newLanes.splice(index, 1);
          }
        }
        blockedLanes.forEach((lane) => {
          filteredObstacles.push({
            x: lane,
            z: -gameConfig.sceneDepth,
            width: gameConfig.obstacle.width,
            height: gameConfig.obstacle.height,
            depth: gameConfig.obstacle.depth,
            scale: gameConfig.obstacle.scale,
          });
        });
      }

      return filteredObstacles;
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Character position={characterPosition} />
      <Road width={gameConfig.laneWidth * 3} length={gameConfig.sceneDepth} />
      {obstacles.map((obstacle, index) => (
        <Obstacle
          key={index}
          position={[obstacle.x, 0, obstacle.z]}
          width={obstacle.width}
          height={obstacle.height}
          depth={obstacle.depth}
        />
      ))}
    </>
  );
}
