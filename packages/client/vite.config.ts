import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  }, 
  test: {
    coverage: {
      provider: "istanbul",
      reportsDirectory: "coverage",
      reporter:[
        ["json-summary", { file: "coverage-summary-frontend.json" }],
        ["json", { file: "coverage-final-frontend.json" }]
      ],
      reportOnFailure: true,
      extension: [".ts", ".tsx"]
    }
  }
});
