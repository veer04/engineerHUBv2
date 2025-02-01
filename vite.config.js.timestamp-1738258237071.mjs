// vite.config.js
import { defineConfig } from "file:///F:/EHUBNEW/website/node_modules/vite/dist/node/index.js";
import react from "file:///F:/EHUBNEW/website/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { config } from "file:///F:/EHUBNEW/website/node_modules/dotenv/lib/main.js";
config();
var vite_config_default = defineConfig({
  plugins: [react()]
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxFSFVCTkVXXFxcXHdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXEVIVUJORVdcXFxcd2Vic2l0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovRUhVQk5FVy93ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XHJcblxyXG5jb25maWcoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIC8vIHNlcnZlcjp7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy93aGVuZXZlciBuZWVkZWQgdG8gY2hhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcG9ydCBvdmVyIHRoZSBwcm94eSBvciB0aGUgc2VydmVyXHJcbiAgLy8gICBwcm94eTp7XHJcbiAgLy8gICAgICcvJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTE3MCcsXHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG4gIC8vIGJhc2U6IFwiXCIsXHJcbiAgLy8gZGVmaW5lOiB7XHJcbiAgLy8gICBnbG9iYWw6IHt9LFxyXG4gIC8vICAgXCJwcm9jZXNzLmVudlwiOiBwcm9jZXNzLmVudixcclxuICAvLyB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TyxTQUFTLG9CQUFvQjtBQUMzUSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxjQUFjO0FBRXZCLE9BQU87QUFHUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVluQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
