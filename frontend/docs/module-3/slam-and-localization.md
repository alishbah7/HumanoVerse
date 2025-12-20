---
id: slam-and-localization
title: SLAM and Localization
---

SLAM (Simultaneous Localization and Mapping) is a technique used by robots and autonomous vehicles to build a map of an unknown environment while simultaneously keeping track of their location within that map. Localization is the problem of determining the robot's position and orientation in a known map.

## How SLAM Works

SLAM algorithms work by using sensor data, such as from a lidar or a camera, to create a map of the environment. The algorithm then uses this map to estimate the robot's position. This process is iterative, with the map and the robot's position being continuously updated as the robot moves and collects more sensor data.

## Popular SLAM Algorithms

- **GMapping:** A popular laser-based SLAM algorithm.
- **Cartographer:** A real-time SLAM library developed by Google.
- **ORB-SLAM:** A versatile and accurate SLAM solution for monocular, stereo, and RGB-D cameras.

## Localization with AMCL

AMCL (Adaptive Monte Carlo Localization) is a probabilistic localization system for a robot moving in 2D. It is often used in conjunction with a pre-existing map to localize a robot. AMCL uses a particle filter to track the pose of a robot against a known map.
