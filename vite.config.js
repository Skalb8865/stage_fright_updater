import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'html/about.html'), 
        tours: resolve(__dirname, 'html/tour.html'), 
        merch: resolve(__dirname, 'html/merch.html'), 
        music: resolve(__dirname, 'html/music.html'), 
        contact: resolve(__dirname, 'html/contact.html'),  
        thankyou: resolve(__dirname, 'html/thankyou.html'),  
      },
    },
  },
})