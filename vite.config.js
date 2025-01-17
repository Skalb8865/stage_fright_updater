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
        prometheus: resolve(__dirname, 'html/Music/Albums/Prometheus.html'), 
        logo_long_sleeve: resolve(__dirname, 'html/Merch/Apparel/long_sleeve.html'), 
        acantha_tshirt: resolve(__dirname, 'html/Merch/Apparel/acantha_T-shirt.html'), 
        acantha_hoodie: resolve(__dirname, 'html/Merch/Apparel/acantha_hoodie.html'), 
        nyx_vinyl: resolve(__dirname, 'html/Merch/Media/nyx_vinyl.html'), 
        prometheus_vinyl: resolve(__dirname, 'html/Merch/Media/prometheus_vinyl.html'), 
      },
    },
  },
})