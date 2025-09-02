// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  // 兼容性配置
  compatibilityDate: '2025-08-27',

  // 开发服务器配置
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Vite 配置
  vite: {
    server: {
      port: 3000,
      host: '0.0.0.0'
    }
  },

  // SSG 配置 - 纯静态网站生成
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/',
        '/admin',
        '/project/1',
        '/project/2',
        '/project/3',
        '/project/4',
        '/project/5',
        '/project/6',
        '/project/7',
        '/project/8'
      ],
      crawlLinks: true
    },
    publicAssets: [
      {
        baseURL: '/images',
        dir: 'public/images'
      }
    ]
  },

  // CSS 配置
  css: [
    'element-plus/dist/index.css',
    '~/assets/css/main.css'
  ],

  // 模块配置
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/google-fonts'
  ],

  // Element Plus 配置
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'css',
    themes: ['dark']
  },

  // Google Fonts 配置
  googleFonts: {
    families: {
      'Noto Sans SC': [400, 500, 600, 700],
      'Inter': [400, 500, 600, 700]
    },
    display: 'swap',
    preload: true
  },

  // 头部配置
  app: {
    head: {
      title: '毕业顺利 - 优质毕业设计作品',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '专为计算机专业大四学生提供优质毕业设计作品，涵盖各种技术栈和应用场景'
        },
        {
          name: 'keywords',
          content: '毕业设计,计算机专业,源码,Flask,Vue,React,Spring Boot,微信小程序,毕业顺利'
        },
        { name: 'author', content: '毕业顺利团队' },
        { property: 'og:title', content: '毕业顺利 - 优质毕业设计作品' },
        { property: 'og:description', content: '专为计算机专业大四学生提供优质毕业设计作品' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://biyeshunli.top' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://biyeshunli.top' }
      ]
    }
  },

  // 路由配置
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  // 实验性功能
  experimental: {
    payloadExtraction: false
  },

  // 构建配置
  build: {
    transpile: ['element-plus']
  }
})