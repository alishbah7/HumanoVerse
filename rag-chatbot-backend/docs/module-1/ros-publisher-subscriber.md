---
id: ros-publisher-subscriber
title: ROS Publisher and Subscriber
---

In ROS, nodes communicate with each other by publishing messages to topics. A node that publishes messages is called a **publisher**, and a node that receives messages is called a **subscriber**. This publisher/subscriber model is one of the fundamental concepts in ROS.

## Creating a Publisher

A publisher is created using the `create_publisher()` function. You need to specify the message type and the topic name.

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MyPublisher(Node):
    def __init__(self):
        super().__init__('my_publisher')
        self.publisher_ = self.create_publisher(String, 'my_topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1
```

## Creating a Subscriber

A subscriber is created using the `create_subscription()` function. You need to specify the message type, the topic name, and a callback function to process the received messages.

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MySubscriber(Node):
    def __init__(self):
        super().__init__('my_subscriber')
        self.subscription = self.create_subscription(
            String,
            'my_topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
```
