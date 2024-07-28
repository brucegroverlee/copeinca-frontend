import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

declare const __dirname: string; // Add this line to declare __dirname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@lib/*": path.resolve(__dirname, "./src/lib/*"),
    },
  },
});
