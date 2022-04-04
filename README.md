# vue2-admin

vue2开发框架，提取自 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)，稍微做了修改和更新

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 环境

```
node v14.18.3 (npm v6.14.15)
```

### Variable '' is already declared in the upper scope.

```
'vue/no-template-shadow':'off',
```

## iconfont

### 引入

下载的文件，放`assets`-`iconfont`目录下面

### 配置

在`main.js`里面配置

```
import "@/assets/iconfont/iconfont.css"
```

### 使用

xxx是图标名称

```
<i class='iconfont xxx' />
```