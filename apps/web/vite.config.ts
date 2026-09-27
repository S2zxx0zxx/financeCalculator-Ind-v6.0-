import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    target: "es2022",
    sourcemap: true,
    cssCodeSplit: true
  }
});
