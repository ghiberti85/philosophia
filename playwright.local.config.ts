import baseConfig from './playwright.config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...baseConfig,
  projects: baseConfig.projects?.map((p) => ({
    ...p,
    use: { ...p.use, launchOptions: { executablePath: '/opt/pw-browsers/chromium' } },
  })),
});
