import type {ReactNode} from 'react';
// import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContainer}>
        
        {/* LEFT SIDE IMAGE */}
        <div className={styles.heroImageWrapper}>
          <img src="/img/heroimg.jpg" alt="Hero" className={styles.heroImage} />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className={styles.heroContentRight}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

          <div className={styles.heroButtons}>
            <Link className={styles.readBookBtn} to="/docs/module-1/ros-2-basics">
              Read Book
            </Link>
            <Link className={styles.signUpBtn} to="/working">
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}


function HomepageModules() {
  const modules = [
    {
      title: 'Module 1: ROS 2 Basics',
      icon: '📘',
      description: 'Introduction to ROS 2, nodes, topics, and services.',
      link: '/docs/module-1/ros-2-basics',
      count: 'Read Now',
    },
    {
      title: 'Module 2: Simulation',
      icon: '🖥️',
      description: 'Exploring Gazebo physics, Unity environment, and sensors.',
      link: '/docs/module-2/gazebo-physics',
      count: 'Read Now',
    },
    {
      title: 'Module 3: NVIDIA Isaac',
      icon: '🤖',
      description: 'Deep dive into NVIDIA Isaac Sim, Isaac ROS, and Nav2.',
      link: '/docs/module-3/nvidia-isaac-sim',
      count: 'Read Now',
    },
    {
      title: 'Module 4: Advanced Topics',
      icon: '🧠',
      description: 'Voice-to-Action, Cognitive Planning, and Capstone Project.',
      link: '/docs/module-4/voice-to-action',
      count: 'Read Now',
    },
  ];

  return (
    <section className={styles.modulesSection}>
      <h2 className={styles.modulesHeading}>Next-Gen Education & Teaching Courses</h2>

      <div className={styles.modulesGrid}>
        {modules.map((m, i) => (
          <Link to={m.link} key={i} className={styles.moduleCard}>
            <div className={styles.moduleIcon}>{m.icon}</div>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
            <span className={styles.courseCount}>{m.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="Learn Physical AI and Humanoid Robotics with our comprehensive textbook."
    >
      <HomepageHeader />
      <main>
        <HomepageModules />
      </main>
    </Layout>
  );
}
