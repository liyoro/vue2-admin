# vue2-admin

vue2开发框架，提取自 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)，稍微做了修改和更新，自家用

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

## 代码总览

``` 
|-- public
	|-- data	// mock接口数据
|-- src
	|-- api	// 接口
	|-- assets	// 图片、字体、iconfont
    |-- components 	// 组件
    |-- config		// 全局配置文件
    |-- directive		// 指令
    |-- filters		// vue全局过滤器
    |-- layout		// 项目总体布局文件
    |-- plugins	// 主要是element配置
    |-- router		// 项目路由配置
    |-- store		// 项目vuex配置
    |-- styles 	// css配置
    |-- utils 		// 工具类、请求
    |-- views		//
        |-- bigscreen   // 大屏页面，响应式
|-- main.js    // 全局配置
```
