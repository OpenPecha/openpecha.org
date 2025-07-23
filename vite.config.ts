import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Add this line - replace 'your-repo-name' with your actual repository name
  // If using a custom domain, you can set this to '/'
  base: '/', // Change this if needed
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
