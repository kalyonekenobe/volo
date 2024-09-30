import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      host: true,
      port: Number(process.env.VITE_FRONTEND_PORT || 3000),
    },
    preview: {
      host: true,
      port: Number(process.env.VITE_FRONTEND_PORT || 3000),
    },
  });
};