import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'html/About/about.html'), 
        tours: resolve(__dirname, 'html/Tours/tour.html'), 
        merch: resolve(__dirname, 'html/Merch/merch.html'), 
        music: resolve(__dirname, 'html/Music/music.html'), 
        contact: resolve(__dirname, 'html/Contact/contact.html'),  
      },
    },
  },
})