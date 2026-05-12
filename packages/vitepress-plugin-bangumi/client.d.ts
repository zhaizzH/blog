/// <reference types="vite/client" />

declare module 'vitepress-plugin-bangumi/client' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
