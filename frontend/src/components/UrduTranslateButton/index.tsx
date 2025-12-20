// import React from 'react';
import { useSession } from '../../lib/auth-client';
import { useHistory, useLocation } from '@docusaurus/router';
import GlobeIcon from '@site/static/img/globe.svg'; // Assuming you have a globe icon
import styles from './styles.module.css';

const UrduTranslateButton = () => {
  const { data: session } = useSession();
  const history = useHistory();
  const location = useLocation();

  const handleTranslate = async () => {
    if (session?.user) {
      const contentElement = document.querySelector('.markdown');
      if (contentElement) {
        const originalContent = contentElement.innerHTML;
        try {
          const response = await fetch('https://api-humanoverse.up.railway.app/api/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: originalContent,
              targetLang: 'ur',
            }),
          });
          const translated = await response.json();
          if (translated.translatedText) {
            contentElement.innerHTML = translated.translatedText;
          }
        } catch (error) {
          console.error('Translation failed:', error);
          alert('Translation failed. Please try again later.');
        }
      }
    } else {
      history.push('/signup');
    }
  };

  // Only show the button on the book page (adjust the path as needed)
  if (!location.pathname.startsWith('/docs')) {
    return null;
  }

  return (
    <button
      onClick={handleTranslate}
      className={styles.navbarUrduButton}
    >
      <GlobeIcon className={styles.navbarUrduIcon} />
      <span>اردو</span>
    </button>
  );
};

export default UrduTranslateButton;
