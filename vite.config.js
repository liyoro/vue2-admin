import { defineConfig, loadEnv } from 'vite'
// vite支持vue2
import { createVuePlugin } from 'vite-plugin-vue2'
// 将不符合eslint规则的信息提示到浏览器上，以及终端。
import eslintPlugin from 'vite-plugin-eslint'
import babel from 'vite-babel-plugin'
import fs from 'fs'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import styleImport from 'vite-plugin-style-import'

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

export default defineConfig(params => {
  // eslint-disable-next-line no-unused-vars
  const { mode, command } = params
  const env = loadEnv(mode, process.cwd())
  // mode === 'development'
  const PUBLIC_PATH = env.VITE_APP_PUBLIC_PATH
  // const BASE_API = env.VITE_APP_BASE_API

  return {
    base: `/${PUBLIC_PATH}/`, // 开发或生产环境服务的公共基础路径
    server: {
      host: '0.0.0.0', // 局域网+公网地址
      port: 3001,
      hmr: true
      // proxy: {
      //   [BASE_API]: {
      //     target: env.VITE_APP_PROVINCE_NODE_PATH, // 生产环境
      //     changeOrigin: true,
      //     rewrite: path => {
      //       const reg = new RegExp(`^${BASE_API}`, 'g')
      //       const pTath = path.replace(reg, '')
      //       console.log(`代理请求:::`, pTath)
      //       return pTath
      //     }
      //   }
      // }
    },
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      outDir: `./${PUBLIC_PATH}`, // 指定输出路径（相对于 项目根目录).
      assetsDir: 'assets', // 指定生成静态资源的存放路径（相对于 build.outDir）默认： assets
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。
      reportCompressedSize: true, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      sourcemap: false, // 构建后是否生成 source map 文件。
      cssTarget: 'chrome61', // 以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式。
      chunkSizeWarningLimit: 1000, // 规定触发警告的 chunk 大小。（以 kbs 为单位）
      rollupOptions: {
        // https://www.rollupjs.com/
        input: {
          index: path.resolve(path.resolve(), 'index.html')
        },
        output: {
          // 静态资源分类打包
          // chunkFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames(opitons) {
            // 修改js文件输出
            const { exports, facadeModuleId } = opitons
            if (exports[0] === 'default' && facadeModuleId) {
              const pathsrc = 'src'
              const pArr = facadeModuleId.split(pathsrc)
              const filepath = pArr[1].split('.')[0]
              // 按照开发的文件路径存放
              const newpath = `assets/js${filepath}_[hash].js`
              return newpath
            } else {
              return 'assets/js/vendor/[name]_[hash].js'
            }
          },
          entryFileNames: 'assets/js/[name]_[hash].js',
          assetFileNames(options) {
            // 修改css文件输出
            const { name } = options
            const reg = /\.(css)$/
            if (reg.test(name)) {
              const pathsrc = 'src/'
              const pArr = name.split(pathsrc)
              const filepath = pArr[pArr.length - 1].split('.')[0]
              const newpath = `assets/css/${filepath}_[hash].[ext]`
              return newpath
            } else {
              return 'assets/[ext]/[name]_[hash].[ext]'
            }
          },
          manualChunks(id) {
            // 静态资源分拆打包,例如：vue、vue-router
            if (id.includes('node_modules')) {
              return id.split('node_modules/')[1].split('/')[1]
            }
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // true 是关闭打印, false 是不关闭打印
          drop_debugger: mode !== 'production'
        }
      }
    },
    plugins: [
      createVuePlugin({
        jsx: true // 启用jsx
      }),
      // eslintPlugin(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue'],
        exclude: ['node_modules/**'],
        cache: false // 禁用 eslint 缓存
      }),
      babel(),
      Components({
        resolvers: []
      }),
      styleImport({
        libs: [
          {
            libraryName: 'element-ui',
            base: 'element-ui/lib/theme-chalk/index.css',
            styleLibraryName: 'theme-chalk',
            esModule: true,
            resolveStyle: name => {
              return `theme-chalk/${name}.css`
            }
          }
        ]
      })
    ],
    define: {
      'process.env': {},
      // 注入全局变量
      _APP_VERSION_: JSON.stringify(packageJson.version)
    },
    json: {
      namedExports: true, // 是否支持从 .json 文件中进行按名导入。
      stringify: true // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。 开启此项，则会禁用按名导入。
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      // 启用别名
      // alias: {
      //   '@': '/src'
      // }
      alias: [
        {
          find: /@\/.+/,
          replacement: val => {
            return val.replace(/^@/, path.resolve(__dirname, '/src'))
          }
        },
        {
          // this is required for the SCSS modules
          find: /^~(.*)$/,
          replacement: '$1'
        }
        /** 解决element-ui 内部找不到 async-validator 模块的问题*/
        // { find: 'async-validator', replacement: 'node_modules/async-validator/dist-web/index.js' }
      ]
    },
    css: {
      devSourcemap: false, // 在开发过程中是否启用 sourcemap。
      preprocessorOptions: {
        // 配置scss，自动引入指定的scss文件
        // @import "@/styles/mixin.scss";
        // @import "@/styles/variables.scss";
        scss: {
          additionalData: '@import "@/styles/mixin.scss"; @import "@/styles/variables.scss";'
          // additionalData: `
          //                 @use "@/styles/mixin.scss" as *;
          //                 @use "@/styles/variables.scss" as *;
          //               `
        }
      }
    }
  }
})
