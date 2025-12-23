---
title: Nav2 Path Planning
---

## Introduction to Nav2

Nav2 is the navigation stack for ROS 2, providing a full suite of tools for enabling a robot to autonomously navigate in its environment. It's the successor to the original ROS Navigation Stack and has been redesigned for ROS 2's architecture, offering improved performance, flexibility, and extensibility.

### Key Components of Nav2

Nav2 is built upon a modular architecture, consisting of several key components:

*   **Behavior Tree**: Orchestrates the high-level navigation behaviors, such as patrolling, exploring, or going to a specific pose.
*   **BT Navigator**: The main entry point for sending navigation goals, utilizing the behavior tree.
*   **Global Planner**: Generates a long-term path from the robot's current location to a goal location, avoiding static obstacles (e.g., A*, Dijkstra).
*   **Local Planner (Controller)**: Generates velocity commands to follow the global path and avoid dynamic obstacles in real-time (e.g., DWA, TEB).
*   **Costmap**: Represents the environment as a grid, indicating costs for traversability (e.g., obstacles, unknown areas). It has both a global and local costmap.
*   **Recovery Behaviors**: Strategies to help the robot recover from challenging situations (e.g., clearing the costmap, rotating in place).

### The Navigation Process

1.  **Localization**: The robot first needs to know its position in the map (e.g., using AMCL for 2D or other SLAM methods).
2.  **Goal Setting**: A navigation goal (target pose) is sent to the BT Navigator.
3.  **Global Path Planning**: The Global Planner computes a collision-free path to the goal using the global costmap.
4.  **Local Path Following**: The Local Planner continuously takes sensor data, updates the local costmap, and generates velocity commands to follow the global path while avoiding new obstacles.
5.  **Recovery**: If the robot gets stuck or cannot find a path, recovery behaviors are triggered.

### Example: Sending a Navigation Goal with ROS 2

Assuming you have Nav2 running on your robot or simulation (e.g., in Gazebo or Isaac Sim), you can send a navigation goal using the `nav2_simple_commander` library or directly via ROS 2 topics.

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_msgs.action import NavigateToPose
from rclpy.action import ActionClient

class GoalSender(Node):
    def __init__(self):
        super().__init__('goal_sender')
        self.action_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')
        self.action_client.wait_for_server()
        self.get_logger().info('Action server ready.')

    def send_goal(self, x, y, yaw):
        goal_msg = NavigateToPose.Goal()
        goal_msg.pose.header.frame_id = 'map'
        goal_msg.pose.pose.position.x = x
        goal_msg.pose.pose.position.y = y
        # Quaternion for yaw (assuming 2D navigation for simplicity)
        goal_msg.pose.pose.orientation.z = -0.707
        goal_msg.pose.pose.orientation.w = 0.707 # Roughly 90 degrees

        self.get_logger().info(f'Sending goal: x={x}, y={y}, yaw={yaw}')
        self.future = self.action_client.send_goal_async(goal_msg)
        self.future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')
        self.get_result_future = goal_handle.get_result_async()
        self.get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Goal reached: {result}')
        rclpy.shutdown()

def main(args=None):
    rclpy.init(args=args)
    goal_sender = GoalSender()
    # Example: send robot to (x=1.0, y=1.0) with an orientation (yaw approx 90 degrees)
    goal_sender.send_goal(1.0, 1.0, 1.57) # yaw in radians
    rclpy.spin(goal_sender)

if __name__ == '__main__':
    main()
```
This Python code demonstrates how to create a ROS 2 node that sends a navigation goal to the Nav2 stack. The robot will then attempt to reach the specified `(x, y)` coordinates with the given orientation.