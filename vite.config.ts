import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL?.trim();

  return {
    plugins: [react()],
    server: apiBaseUrl
      ? {
          proxy: {
            "/__moodmap_api": {
              target: apiBaseUrl,
              changeOrigin: true,
              secure: true,
              rewrite: (path) => path.replace(/^\/__moodmap_api/, ""),
            },
          },
        }
      : undefined,
  };
});
