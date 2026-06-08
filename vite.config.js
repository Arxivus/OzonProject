import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@herob191/vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
});