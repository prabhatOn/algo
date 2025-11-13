import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path'; // 👈 Add this

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 Use '@' to refer to /src
    },
  },
});
