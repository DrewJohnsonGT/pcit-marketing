export const IMAGES_DIR = `${process.env.NEXT_PUBLIC_MARKETING_URL}/images`;

export interface AppImage {
  height: number;
  src: string;
  width: number;
}

enum AppImageKey {
  Data = 'data',
  Drew = 'drew',
  Error = 'error',
  Families = 'families',
  Home = 'home',
  Logo = 'logo',
  Madeline = 'madeline',
  NotFound = 'notFound',
  Pdi = 'pdi',
  Report = 'report',
  Session = 'session',
}

export const IMAGES: Record<AppImageKey, AppImage> = {
  // Landing page product
  [AppImageKey.Data]: {
    height: 1071,
    src: `${IMAGES_DIR}/data.png`,
    width: 1800,
  },
  [AppImageKey.Error]: {
    height: 200,
    src: `${IMAGES_DIR}/error.svg`,
    width: 300,
  },
  [AppImageKey.NotFound]: {
    height: 300,
    src: `${IMAGES_DIR}/404.svg`,
    width: 300,
  },
  [AppImageKey.Home]: {
    height: 1074,
    src: `${IMAGES_DIR}/home.png`,
    width: 1800,
  },
  [AppImageKey.Pdi]: {
    height: 1075,
    src: `${IMAGES_DIR}/pdi.png`,
    width: 1800,
  },
  [AppImageKey.Session]: {
    height: 1073,
    src: `${IMAGES_DIR}/session.png`,
    width: 1800,
  },
  [AppImageKey.Report]: {
    height: 1072,
    src: `${IMAGES_DIR}/report.png`,
    width: 2000,
  },
  [AppImageKey.Families]: {
    height: 1071,
    src: `${IMAGES_DIR}/families.png`,
    width: 1800,
  },
  // other
  [AppImageKey.Drew]: {
    height: 500,
    src: `${IMAGES_DIR}/drew.webp`,
    width: 500,
  },
  [AppImageKey.Logo]: {
    height: 200,
    src: `${IMAGES_DIR}/logo.png`,
    width: 200,
  },
  [AppImageKey.Madeline]: {
    height: 609,
    src: `${IMAGES_DIR}/madeline.webp`,
    width: 410,
  },
};
