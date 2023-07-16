import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import path from "path";

const buildConfig = {
  build: {
    rollupOptions: {
      input: {
        panel: path.resolve(__dirname, "panel.html"),
      },
    },
  },
};

const httpConfig = {
  ...buildConfig,
  plugins: [react()],
};
const httpsConfig = {
  ...buildConfig,
  server: { https: true },
  plugins: [react(), mkcert()],
};
const ryanHttpsConfig = {
  ...buildConfig,
  server: { https: true },
  plugins: [react(), mkcert({ savePath: path.join(__dirname, ".mkcert") })],
};

const config =
  process.env.RYAN === "true"
    ? ryanHttpsConfig
    : process.env.NO_HTTPS === "true"
    ? httpConfig
    : httpsConfig;

export default defineConfig(config);
