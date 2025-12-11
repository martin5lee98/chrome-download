// software-config.js
// 软件配置文件 - 方便维护和扩展

export const SOFTWARE_CONFIG = {
  chrome: {
    name: 'Chrome Browser',
    category: 'browser',
    icon: '🌐',
    description: 'Fast, secure browser from Google',
    apiType: 'chrome-for-testing',
    apiUrl: 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json',
    cacheTime: 3600, // 1 hour
    needsMirror: true,
    mirrorDomain: 'storage.googleapis.com'
  },

  outline: {
    name: 'Outline VPN',
    category: 'vpn',
    icon: '🔒',
    description: 'Secure VPN by Jigsaw',
    apiType: 'dual-source', // Google Developers + GitHub
    staticLinks: {
      // From https://developers.google.com/outline/docs/download-links
      windows: 'https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/stable/Outline-Client.exe',
      macos: 'https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/stable/Outline-Client.dmg',
      linux: 'https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/stable/Outline-Client.AppImage',
      android: 'https://play.google.com/store/apps/details?id=org.outline.android.client',
      ios: 'https://itunes.apple.com/app/outline-app/id1356177741'
    },
    github: {
      owner: 'Jigsaw-Code',
      repo: 'outline-client'
    },
    cacheTime: 21600, // 6 hours
    needsMirror: true
  },

  'shadowsocks-windows': {
    name: 'Shadowsocks Windows',
    category: 'proxy',
    icon: '🪟',
    description: 'Shadowsocks client for Windows',
    apiType: 'github-releases',
    github: {
      owner: 'shadowsocks',
      repo: 'shadowsocks-windows'
    },
    platforms: ['windows'],
    cacheTime: 21600,
    needsMirror: true
  },

  'shadowsocks-ng': {
    name: 'ShadowsocksX-NG',
    category: 'proxy',
    icon: '🍎',
    description: 'Shadowsocks client for macOS',
    apiType: 'github-releases',
    github: {
      owner: 'shadowsocks',
      repo: 'ShadowsocksX-NG'
    },
    platforms: ['macos'],
    cacheTime: 21600,
    needsMirror: true
  },

  'shadowsocks-android': {
    name: 'Shadowsocks Android',
    category: 'proxy',
    icon: '🤖',
    description: 'Shadowsocks client for Android',
    apiType: 'github-releases',
    github: {
      owner: 'shadowsocks',
      repo: 'shadowsocks-android'
    },
    platforms: ['android'],
    cacheTime: 21600,
    needsMirror: true
  },

  'shadowsocks-libev': {
    name: 'Shadowsocks-libev',
    category: 'proxy',
    icon: '🐧',
    description: 'Lightweight Shadowsocks for Linux',
    apiType: 'github-releases',
    github: {
      owner: 'shadowsocks',
      repo: 'shadowsocks-libev'
    },
    platforms: ['linux'],
    cacheTime: 21600,
    needsMirror: true
  },

  'clash-verge': {
    name: 'Clash Verge',
    category: 'proxy',
    icon: '⚔️',
    description: 'Clash GUI client (continuation)',
    apiType: 'github-releases',
    github: {
      owner: 'clash-verge-rev',
      repo: 'clash-verge-rev'
    },
    platforms: ['windows', 'macos', 'linux'],
    cacheTime: 21600,
    needsMirror: true
  },

  'v2rayn': {
    name: 'v2rayN',
    category: 'proxy',
    icon: '✈️',
    description: 'V2Ray client for Windows',
    apiType: 'github-releases',
    github: {
      owner: '2dust',
      repo: 'v2rayN'
    },
    platforms: ['windows'],
    cacheTime: 21600,
    needsMirror: true
  },

  'qv2ray': {
    name: 'Qv2ray',
    category: 'proxy',
    icon: '🚀',
    description: 'Cross-platform V2Ray client',
    apiType: 'github-releases',
    github: {
      owner: 'Qv2ray',
      repo: 'Qv2ray'
    },
    platforms: ['windows', 'macos', 'linux'],
    cacheTime: 21600,
    needsMirror: true,
    note: 'Project may be discontinued, check for community forks'
  },

  'nekoray': {
    name: 'NekoRay',
    category: 'proxy',
    icon: '🐱',
    description: 'Qt-based cross-platform proxy client',
    apiType: 'github-releases',
    github: {
      owner: 'MatsuriDayo',
      repo: 'nekoray'
    },
    platforms: ['windows', 'linux'],
    cacheTime: 21600,
    needsMirror: true
  }
};

// 镜像配置
export const MIRROR_CONFIG = {
  github: {
    cloudflare: {
      name: 'Cloudflare',
      url: 'https://gh-proxy.org/',
      description: 'Fast and reliable',
      priority: 1
    },
    fastly: {
      name: 'Fastly CDN',
      url: 'https://cdn.gh-proxy.org/',
      description: 'Alternative option',
      priority: 2
    },
    edgeone: {
      name: 'EdgeOne (Tencent)',
      url: 'https://edgeone.gh-proxy.org/',
      description: 'Better for China users',
      priority: 3,
      recommended: ['CN', 'HK', 'TW', 'MO'] // ISO country codes
    }
  }
};

// 平台识别规则
export const PLATFORM_RULES = {
  windows: {
    keywords: ['.exe', 'windows', 'win', 'win32', 'win64', '.msi'],
    icon: '🪟',
    name: 'Windows'
  },
  macos: {
    keywords: ['.dmg', 'macos', 'darwin', 'osx', 'mac'],
    icon: '🍎',
    name: 'macOS'
  },
  linux: {
    keywords: ['.appimage', 'linux', '.deb', '.rpm', '.tar.gz', '.tar.bz2'],
    icon: '🐧',
    name: 'Linux'
  },
  android: {
    keywords: ['.apk', 'android'],
    icon: '🤖',
    name: 'Android'
  },
  ios: {
    keywords: ['ios', 'iphone', 'ipad'],
    icon: '🍎',
    name: 'iOS'
  }
};

// 架构识别规则
export const ARCH_RULES = {
  x64: ['x64', 'x86_64', 'amd64', 'x86-64'],
  x86: ['x86', 'i386', 'i686', 'win32'],
  arm64: ['arm64', 'aarch64', 'armv8'],
  arm: ['arm', 'armv7']
};
