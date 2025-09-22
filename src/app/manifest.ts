import { MetadataRoute } from 'next';
import { APP_DESCRIPTION, APP_NAME, APP_NAME_SHORT } from '~/utils/constants';
import { IMAGES_DIR } from '~/utils/images';

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    description: APP_DESCRIPTION,
    display: 'standalone',
    icons: [
      {
        purpose: 'maskable',
        sizes: '192x192',
        src: `${IMAGES_DIR}/web-app-manifest-192x192.png`,
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: `${IMAGES_DIR}/web-app-manifest-512x512.png`,
        type: 'image/png',
      },
      {
        sizes: '100x100',
        src: `${IMAGES_DIR}/logo.png`,
        type: 'image/png',
      },
      {
        sizes: '100x100',
        src: `${IMAGES_DIR}/logo.svg`,
        type: 'image/svg+xml',
      },
      {
        sizes: '100x100',
        src: `${IMAGES_DIR}/logo-no-text.png`,
        type: 'image/png',
      },
    ],
    name: APP_NAME,
    short_name: APP_NAME_SHORT,
    start_url: '/',
    theme_color: '#ffffff',
  };
}
