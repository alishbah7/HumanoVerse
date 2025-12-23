---
id: gazebo-ros-control
title: Gazebo ROS Control
---

`gazebo_ros_control` is a package that provides a way to control your robot in Gazebo using ROS. It allows you to simulate the behavior of your robot's actuators and sensors in the Gazebo simulator.

## How it Works

`gazebo_ros_control` works by using a plugin that is loaded into Gazebo. This plugin reads a YAML file that defines the controllers for your robot. The controllers then communicate with the simulated actuators and sensors in Gazebo.

## Example Controller Configuration

Here is an example of a YAML file that defines a controller for a simple differential drive robot:

```yaml
type: "diff_drive_controller/DiffDriveController"
publish_rate: 50

left_wheel: 'left_wheel_joint'
right_wheel: 'right_wheel_joint'

wheel_separation: 0.4
wheel_radius: 0.1

# Odometry covariances for the encoder output of the robot base
pose_covariance_diagonal: [0.001, 0.001, 1000000.0, 1000000.0, 1000000.0, 0.03]
twist_covariance_diagonal: [0.001, 0.001, 1000000.0, 1000000.0, 1000000.0, 0.03]
```
