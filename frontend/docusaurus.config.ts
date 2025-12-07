import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '𝙋𝙝𝙮𝙨𝙞𝙘𝙖𝙡 𝘼𝙄 & 𝙃𝙪𝙢𝙖𝙣𝙤𝙞𝙙 𝙍𝙤𝙗𝙤𝙩𝙞𝙘𝙨',
  tagline: '𝖳𝗁𝗂𝗌 𝗍𝖾𝗑𝗍𝖻𝗈𝗈𝗄 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝗌 𝖺 𝖼𝗈𝗇𝖼𝗂𝗌𝖾 𝗒𝖾𝗍 𝖼𝗈𝗆𝗉𝗋𝖾𝗁𝖾𝗇𝗌𝗂𝗏𝖾 𝗉𝖺𝗍𝗁𝗐𝖺𝗒 𝗂𝗇𝗍𝗈 𝖯𝗁𝗒𝗌𝗂𝖼𝖺𝗅 𝖠𝖨 𝖺𝗇𝖽 𝖧𝗎𝗆𝖺𝗇𝗈𝗂𝖽 𝖱𝗈𝖻𝗈𝗍𝗂𝖼𝗌, 𝗁𝖾𝗅𝗉𝗂𝗇𝗀 𝗋𝖾𝖺𝖽𝖾𝗋𝗌 𝗎𝗇𝖽𝖾𝗋𝗌𝗍𝖺𝗇𝖽 𝗁𝗈𝗐 𝗂𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝗍 𝗆𝖺𝖼𝗁𝗂𝗇𝖾𝗌 𝗉𝖾𝗋𝖼𝖾𝗂𝗏𝖾, 𝖽𝖾𝖼𝗂𝖽𝖾, 𝖺𝗇𝖽 𝗂𝗇𝗍𝖾𝗋𝖺𝖼𝗍 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗉𝗁𝗒𝗌𝗂𝖼𝖺𝗅 𝗐𝗈𝗋𝗅𝖽. 𝖳𝗁𝗋𝗈𝗎𝗀𝗁 𝗌𝗍𝗋𝗎𝖼𝗍𝗎𝗋𝖾𝖽 𝗆𝗈𝖽𝗎𝗅𝖾𝗌 𝖺𝗇𝖽 𝗉𝗋𝖺𝖼𝗍𝗂𝖼𝖺𝗅 𝖾𝗑𝖺𝗆𝗉𝗅𝖾𝗌, 𝗂𝗍 𝗌𝗂𝗆𝗉𝗅𝗂𝖿𝗂𝖾𝗌 𝖼𝗈𝗆𝗉𝗅𝖾𝗑 𝖼𝗈𝗇𝖼𝖾𝗉𝗍𝗌 𝖺𝗇𝖽 𝖾𝗊𝗎𝗂𝗉𝗌 𝗅𝖾𝖺𝗋𝗇𝖾𝗋𝗌 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖿𝗈𝗎𝗇𝖽𝖺𝗍𝗂𝗈𝗇𝖺𝗅 𝗌𝗄𝗂𝗅𝗅𝗌 𝗇𝖾𝖾𝖽𝖾𝖽 𝗍𝗈 𝖽𝖾𝗌𝗂𝗀𝗇, 𝖺𝗇𝖺𝗅𝗒𝗓𝖾, 𝖺𝗇𝖽 𝖻𝗎𝗂𝗅𝖽 𝗆𝗈𝖽𝖾𝗋𝗇 𝗁𝗎𝗆𝖺𝗇𝗈𝗂𝖽 𝗋𝗈𝖻𝗈𝗍𝗂𝖼 𝗌𝗒𝗌𝗍𝖾𝗆𝗌.',

  future: {
    v4: true,
  },

  url: 'https://alishbah7.github.io',
  baseUrl: '/',
  organizationName: 'alishbah7',
  projectName: 'HumanoVerse',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      respectPrefersColorScheme: false,
      defaultMode: 'light',
      disableSwitch: true, // 🔥 remove night-mode icon
    },

    navbar: {
      title: '𝐻𝓊𝓂𝒶𝓃𝑜𝒱𝑒𝓇𝓈𝑒',
      items: [
        {
          to: './working',
          label: 'Login',
          position: 'right',
          className: 'signup-button',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Book',
        },
      ],
    },


    footer: {
      style: 'light',
      links: [], // We will fully customize using CSS-only layout
      copyright: `
        <div class="footer-custom">
          <h2 class="footer-title">𝐻𝓊𝓂𝒶𝓃𝑜𝒱𝑒𝓇𝓈𝑒</h2>

          <div class="footer-social">
            <a class="social-icon">IG</a>
            <a class="social-icon">FB</a>
            <a class="social-icon">LN</a>
            <a class="social-icon">X</a>
          </div>

          <div class="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/docs">Read Book</a>
          </div>
        </div>
      `,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
