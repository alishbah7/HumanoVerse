---
title: Gazebo Physics
---

## Introduction to Gazebo

Gazebo is an open-source 3D robot simulator. It's often used with ROS to simulate complex robot behaviors in realistic environments. Gazebo provides robust physics, high-quality graphics, and convenient programmatic interfaces.

### Key Features of Gazebo

*   **Physics Engine**: Supports various physics engines (ODE, Bullet, DART, Simbody) for accurate simulation of forces, friction, and collisions.
*   **Sensors**: Simulates a wide range of sensors including cameras, LIDAR, IMUs, force-torque sensors, and more.
*   **Models**: Allows importing and creating 3D models of robots and environments.
*   **Plugins**: Extensible architecture to add custom functionalities and integrate with external software like ROS.

### Simulating Physics

In Gazebo, you can define properties for your robot and environment models that influence their physical behavior:
*   **Mass and Inertia**: Essential for realistic dynamics.
*   **Friction**: Affects how objects slide or roll against each other.
*   **Restitution**: Determines the "bounciness" of collisions.

### Example: Simple Pendulum in SDF

Gazebo uses SDF (Simulation Description Format) to define environments and robots.

```xml
<?xml version="1.0" ?>
<sdf version="1.6">
  <model name="simple_pendulum">
    <link name="base_link">
      <pose>0 0 1 0 0 0</pose>
      <inertial>
        <mass>1.0</mass>
        <inertia>
          <ixx>0.01</ixx><ixy>0</ixy><ixz>0</ixz>
          <iyy>0.01</iyy><iyz>0</iyz>
          <izz>0.01</izz>
        </inertia>
      </inertial>
      <visual name="visual">
        <geometry>
          <box>
            <size>0.1 0.1 0.1</size>
          </box>
        </geometry>
      </visual>
      <collision name="collision">
        <geometry>
          <box>
            <size>0.1 0.1 0.1</size>
          </box>
        </geometry>
      </collision>
    </link>

    <link name="pendulum_link">
      <pose>0 0 0.5 0 0 0</pose>
      <inertial>
        <mass>0.5</mass>
        <inertia>
          <ixx>0.005</ixx><ixy>0</ixy><ixz>0</ixz>
          <iyy>0.005</iyy><iyz>0</iyz>
          <izz>0.005</izz>
        </inertia>
      </inertial>
      <visual name="visual">
        <geometry>
          <cylinder>
            <radius>0.02</radius>
            <length>1.0</length>
          </cylinder>
        </geometry>
      </visual>
      <collision name="collision">
        <geometry>
          <cylinder>
            <radius>0.02</radius>
            <length>1.0</length>
          </cylinder>
        </geometry>
      </collision>
    </link>

    <joint name="pendulum_joint" type="revolute">
      <parent>base_link</parent>
      <child>pendulum_link</child>
      <pose>0 0 0 0 0 0</pose>
      <axis>
        <xyz>0 1 0</xyz>
      </axis>
    </joint>
  </model>
</sdf>
```