---
id: introduction-to-ros
title: Introduction to ROS
---

The Robot Operating System (ROS) is a flexible framework for writing robot software. It is a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms. In this chapter, you will learn the basic concepts of ROS.

## Core Concepts

- **Nodes:** A node is an executable that uses ROS to communicate with other nodes.
- **Topics:** Nodes can publish messages to a topic as well as subscribe to a topic to receive messages.
- **Messages:** Topics have a message type, which defines the data structure of the messages sent on that topic.
- **Services:** A request/reply communication model. One node offers a service, and another node can use that service.
- **Actions:** For long-running tasks, actions provide a way to send a request and receive feedback and a final result.
