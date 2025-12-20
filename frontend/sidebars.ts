import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction', 
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 Basics',
      items: [
        'module-1/introduction-to-ros',
        'module-1/ros-publisher-subscriber',
        'module-1/ros-2-basics',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Simulation',
      items: [
        'module-2/sdf-vs-urdf',
        'module-2/gazebo-ros-control',
        'module-2/gazebo-physics',
        'module-2/unity-environment',
        'module-2/sensors-simulation',
        'module-2/urdf-examples',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: NVIDIA Isaac',
      items: [
        'module-3/ros-navigation-stack',
        'module-3/slam-and-localization',
        'module-3/nvidia-isaac-sim',
        'module-3/isaac-ros',
        'module-3/nav2-path-planning',
        'module-3/autonomous-navigation',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Advanced Topics',
      items: [
        'module-4/reinforcement-learning-in-robotics',
        'module-4/human-robot-interaction',
        'module-4/voice-to-action',
        'module-4/cognitive-planning',
        'module-4/advanced-concepts',
      ],
    },
  ],
};

export default sidebars;
