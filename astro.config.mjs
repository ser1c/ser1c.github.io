import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// https://astro.build/config
export default defineConfig({
    site: "https://sabinsubedi.com/",
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
          theme: "vitesse-light",
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        gfm: true,
    },
    image: {
        // Enable image optimization
        service: {
            entrypoint: 'astro/assets/services/sharp'
        },
        // Set reasonable defaults for image optimization
        defaults: {
            quality: 80,
            format: 'webp'
        }
    },
    integrations: [mdx(), tailwind(), solidJs()],
    output: 'static',
    build: {
        // Directory for build assets
        assets: '_assets',
        // Inline small CSS and JavaScript files
        inlineStylesheets: 'auto',
    },
    vite: {
        build: {
            // Enable CSS code splitting
            cssCodeSplit: true,
            // Enable minification
            minify: 'terser',
            // Configure chunk size optimization
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor': ['solid-js']
                    }
                }
            }
        }
    }
})
