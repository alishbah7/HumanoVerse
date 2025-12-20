---
id: ros-navigation-stack
title: ROS Navigation Stack (Nav2)
---

The ROS Navigation Stack, now known as Nav2, is a collection of software packages that you can use to make a robot move from a starting point to a destination without hitting obstacles. It is a powerful tool for autonomous navigation.

## Key Components

- **Global Planner:** Creates a long-term plan for the robot to follow.
- **Local Planner:** Creates a short-term plan to avoid obstacles while following the global plan.
- **Costmap:** A map of the environment that is used by the planners to avoid obstacles. There are two costmaps: a global costmap and a local costmap.
- **AMCL (Adaptive Monte Carlo Localization):** A probabilistic localization system for a robot moving in 2D.

## How it Works

The navigation stack takes in information from odometry, sensor streams, and a goal pose and outputs safe velocity commands that are sent to a mobile base. The robot uses the costmaps to navigate the environment and avoid obstacles. The global planner creates a path from the robot's current position to the goal, and the local planner generates velocity commands to follow that path while avoiding obstacles detected by the sensors.
