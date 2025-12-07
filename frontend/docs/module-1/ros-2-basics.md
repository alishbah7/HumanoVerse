---
title: ROS 2 Basics
---

## Introduction to ROS 2

The Robot Operating System (ROS) is a flexible framework for writing robot software. It's a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms. ROS 2 is the latest iteration, designed with improved real-time performance, security, and multi-robot system support.

### Key Concepts in ROS 2

ROS 2 organizes its functionalities around several core concepts:
*   **Nodes**: Executable processes that perform computation.
*   **Topics**: Named buses over which nodes exchange messages.
*   **Services**: Request/reply communication mechanisms for synchronous calls between nodes.
*   **Actions**: Long-running goal-based communication, extending services with feedback and cancellability.

## Nodes

A node is an executable that uses ROS to communicate with other nodes. Each node should be responsible for a single, modular purpose (e.g., a node for controlling a motor, a node for reading sensor data, a node for path planning).

### Example: A simple C++ Node

```cpp
#include "rclcpp/rclcpp.hpp"

class MyPublisher : public rclcpp::Node
{
public:
  MyPublisher()
  : Node("my_publisher"), count_(0)
  {
    publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
    timer_ = this->create_wall_timer(
      500ms, std::bind(&MyPublisher::timer_callback, this));
  }

private:
  void timer_callback()
  {
    auto message = std_msgs::msg::String();
    message.data = "Hello, ROS 2! " + std::to_string(count_++);
    RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", message.data.c_str());
    publisher_->publish(message);
  }
  rclcpp::TimerBase::SharedPtr timer_;
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MyPublisher>());
  rclcpp::shutdown();
  return 0;
}
```

### Example: A simple Python Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MyPublisher(Node):

    def __init__(self):
        super().__init__('my_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello, ROS 2! %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    my_publisher = MyPublisher()
    rclpy.spin(my_publisher)
    my_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```