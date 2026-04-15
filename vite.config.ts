import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL?.trim();
  const moodProxy = apiBaseUrl
    ? {
        "/__moodmap_api": {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/__moodmap_api/, ""),
        },
      }
    : undefined;

  return {
    plugins: [react()],
    server: moodProxy
      ? {
          proxy: moodProxy,
        }
      : undefined,
    preview: moodProxy
      ? {
          proxy: moodProxy,
        }
      : undefined,
  };
});
