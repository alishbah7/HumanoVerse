---
title: URDF Examples
---

The Unified Robot Description Format (URDF) is an XML file format used in ROS to describe the physical and kinematic properties of a robot. It represents the robot as a tree of links connected by joints.

## Core Components

A URDF file consists of several key tags:

-   `<robot>`: The root tag for the entire robot description.
-   `<link>`: Describes a rigid body part of the robot. It has properties like:
    -   `<inertial>`: Defines the mass and inertia.
    -   `<visual>`: Defines the 3D shape and appearance for visualization (e.g., in RViz).
    -   `<collision>`: Defines the geometry used for collision detection.
-   `<joint>`: Connects two links together. It has properties like:
    -   `<type>`: The type of joint (e.g., `revolute`, `continuous`, `prismatic`, `fixed`).
    -   `<parent>` and `<child>`: Specifies the two links being connected.
    -   `<origin>`: Defines the transform (position and orientation) of the child link relative to the parent link.
    -   `<axis>`: The axis of rotation or translation for the joint.

---

## Example: A Simple Two-Wheeled Robot

Here is a basic example of a URDF for a robot with a chassis and two wheels.

```xml
<?xml version="1.0"?>
<robot name="simple_bot">

  <!-- Base Link (Chassis) -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.3 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0.0 0.0 1.0 1.0"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.3 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="0.4" ixy="0.0" ixz="0.0" iyy="0.4" iyz="0.0" izz="0.2"/>
    </inertial>
  </link>

  <!-- Right Wheel -->
  <link name="right_wheel">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="white">
        <color rgba="1.0 1.0 1.0 1.0"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
    </inertial>
  </link>

  <!-- Left Wheel -->
  <link name="left_wheel">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="white"/>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
    </inertial>
  </link>

  <!-- Joint connecting Right Wheel to Base Link -->
  <joint name="base_to_right_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="right_wheel"/>
    <origin xyz="0 -0.175 0" rpy="1.5707 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <!-- Joint connecting Left Wheel to Base Link -->
  <joint name="base_to_left_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel"/>
    <origin xyz="0 0.175 0" rpy="1.5707 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

</robot>
```

### Explanation:

1.  **`base_link`**: This is the main body of the robot, represented as a blue box.
2.  **`right_wheel` & `left_wheel`**: These are two white cylinders that represent the wheels.
3.  **`base_to_right_wheel` & `base_to_left_wheel`**: These are `continuous` joints that allow the wheels to spin indefinitely around the specified axis. The `<origin>` tag positions and orients the wheels correctly relative to the chassis.

This URDF file can be loaded into ROS tools like RViz to visualize the robot's model.
