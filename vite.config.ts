import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

const httpConfig = {
  plugins: [react()],
};
const httpsConfig = {
  server: { https: true },
  plugins: [react(), mkcert()],
};

const config = process.env.NO_HTTPS === "true" ? httpConfig : httpsConfig;

export default defineConfig(config);
