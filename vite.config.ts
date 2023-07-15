import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import path from "path";

const httpConfig = {
  plugins: [react()],
};
const httpsConfig = {
  server: { https: true },
  plugins: [react(), mkcert()],
};
const ryanHttpsConfig = {
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
