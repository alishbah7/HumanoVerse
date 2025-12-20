---
title: Sensors Simulation
---

Simulating sensors is a critical part of robotics development, allowing you to test algorithms for perception, localization, and navigation without needing a physical robot. Gazebo provides a rich set of plugins for simulating various common sensors.

## Camera Simulation

You can add a camera sensor to your robot model to simulate vision. The camera plugin publishes images to a ROS topic.

### URDF Example:

```xml
<gazebo reference="camera_link">
  <sensor type="camera" name="camera1">
    <update_rate>30.0</update_rate>
    <camera name="head">
      <horizontal_fov>1.3962634</horizontal_fov>
      <image>
        <width>800</width>
        <height>800</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.02</near>
        <far>300</far>
      </clip>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <alwaysOn>true</alwaysOn>
      <updateRate>0.0</updateRate>
      <cameraName>robot/camera1</cameraName>
      <imageTopicName>image_raw</imageTopicName>
      <cameraInfoTopicName>camera_info</cameraInfoTopicName>
      <frameName>camera_link</frameName>
      <hackBaseline>0.07</hackBaseline>
      <distortionK1>0.0</distortionK1>
      <distortionK2>0.0</distortionK2>
      <distortionK3>0.0</distortionK3>
      <distortionT1>0.0</distortionT1>
      <distortionT2>0.0</distortionT2>
    </plugin>
  </sensor>
</gazebo>
```

This snippet defines a camera sensor and uses the `libgazebo_ros_camera.so` plugin to publish the images to the `/robot/camera1/image_raw` topic.

## LiDAR Simulation

LiDAR (Light Detection and Ranging) is essential for mapping and obstacle avoidance. Gazebo can simulate both 2D and 3D LiDAR.

### URDF Example:

```xml
<gazebo reference="lidar_link">
  <sensor type="ray" name="head_hokuyo_sensor">
    <pose>0 0 0 0 0 0</pose>
    <visualize>false</visualize>
    <update_rate>40</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>720</samples>
          <resolution>1</resolution>
          <min_angle>-1.570796</min_angle>
          <max_angle>1.570796</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.10</min>
        <max>30.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="gazebo_ros_head_hokuyo_controller" filename="libgazebo_ros_laser.so">
      <topicName>/scan</topicName>
      <frameName>lidar_link</frameName>
    </plugin>
  </sensor>
</gazebo>
```
This XML configures a ray sensor to act as a laser scanner, publishing `sensor_msgs/LaserScan` messages on the `/scan` topic.

## IMU Simulation

An Inertial Measurement Unit (IMU) provides data about the robot's orientation and acceleration.

### URDF Example:

```xml
<gazebo reference="imu_link">
  <sensor name="imu_sensor" type="imu">
    <always_on>true</always_on>
    <update_rate>100</update_rate>
    <visualize>true</visualize>
    <plugin name="imu_plugin" filename="libgazebo_ros_imu_sensor.so">
      <topicName>imu</topicName>
      <bodyName>imu_link</bodyName>
      <updateRateHZ>100.0</updateRateHZ>
      <gaussianNoise>0.0</gaussianNoise>
      <xyzOffset>0 0 0</xyzOffset>
      <rpyOffset>0 0 0</rpyOffset>
      <frameName>imu_link</frameName>
    </plugin>
  </sensor>
</gazebo>
```
This code adds an IMU sensor using the `libgazebo_ros_imu_sensor.so` plugin, which will publish `sensor_msgs/Imu` data to the `/imu` topic.
