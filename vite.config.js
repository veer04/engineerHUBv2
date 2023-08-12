import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{                           //whenever needed to change
                                        // the port over the proxy or the server
  //   proxy:{
  //     '/': 'http://localhost:5170',
  //   }
  // }
  // base: "",
  // define: {
  //   global: {},
  //   "process.env": process.env,
  // },
});
