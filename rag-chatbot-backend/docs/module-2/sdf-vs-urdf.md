---
id: sdf-vs-urdf
title: SDF vs URDF
---

When working with robot models, you will encounter two main file formats: SDF (Simulation Description Format) and URDF (Unified Robot Description Format). While both are used to describe robots, they have different capabilities and are used in different contexts.

## URDF (Unified Robot Description Format)

- URDF is an XML format used in ROS to describe all elements of a robot.
- It is a tree structure, with the base of the robot being the root element.
- It is primarily used for kinematics and dynamics, but it has limited capabilities for describing the robot's environment.
- URDF is commonly used for visualization in RViz and for robot state publishing.

## SDF (Simulation Description Format)

- SDF is also an XML format, but it is designed specifically for simulation in Gazebo.
- It is a more comprehensive format that can describe not only robots, but also the entire simulation environment, including lighting, physics, and sensors.
- SDF is a superset of URDF, and you can often convert a URDF file to an SDF file.

## Key Differences

| Feature            | URDF                               | SDF                                         |
|--------------------|------------------------------------|---------------------------------------------|
| **Primary Use**    | Robot model description in ROS     | Simulation description in Gazebo            |
| **Structure**      | Tree structure                     | World description, including multiple models|
| **Environment**    | Limited support for environment    | Full support for environment description    |
| **Sensors**        | Limited sensor support             | Rich sensor support for simulation          |
| **Physics**        | Basic physics properties           | Detailed physics properties                 |
