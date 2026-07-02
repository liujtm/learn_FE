# Vue 学习工程

这是一个给后端同学用的最小 Vue 3 学习项目。

它想帮你先建立一个直觉：

`响应式数据变化 -> 模板重新取值 -> Vue 更新页面`

如果你刚从后端转过来看前端，这个项目最值得先看的是：

- `ref` 怎么保存状态
- `computed` 怎么做派生值
- `watch` 怎么处理副作用
- `v-model` 怎么做表单双向绑定

## 1. 如何启动

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认地址一般是：

```bash
http://127.0.0.1:5174/
```

构建生产包：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

如果你更习惯 Go 的视角，可以先这样记：

| 这里的命令 / 文件 | 可以先类比成 |
|---|---|
| `package.json` | `go.mod` + 一部分 `Makefile` |
| `npm install` | `go mod download` |
| `npm run dev` | `go run` 本地开发入口 |
| `npm run build` | `go build` |
| `npm run preview` | 本地检查构建产物 |

## 2. 入口在哪里

推荐按这个顺序看：

1. `index.html`
   整个页面的 HTML 壳子，里面提供 `div#app`
2. `src/main.js`
   Vue 应用入口，负责创建应用并挂到 `#app`
3. `src/App.vue`
   当前主页面，包含这份示例的核心逻辑
4. `src/style.css`
   全局样式

## 3. 仓库结构和职责

```text
learn_vue/
├── .gitignore          # Git 忽略规则
├── .nvmrc              # 建议使用的 Node 版本
├── .vscode/
│   └── extensions.json # VS Code 扩展推荐
├── index.html          # 浏览器入口 HTML，提供 app 挂载点
├── package.json        # 依赖、脚本命令
├── package-lock.json   # 依赖锁定文件，确保安装结果一致
├── vite.config.js      # Vite 配置
├── public/
│   ├── favicon.svg     # 浏览器页签图标
│   └── icons.svg       # 示例页面里复用的图标资源
├── src/
│   ├── main.js         # Vue 应用入口
│   ├── App.vue         # 主页面组件，演示 ref/computed/watch/v-model
│   ├── style.css       # 全局样式
│   ├── components/
│   │   └── HelloWorld.vue # Vite 脚手架默认示例组件
│   └── assets/
│       ├── hero.png    # 页面展示图片
│       ├── vue.svg     # Vue 标识资源
│       └── vite.svg    # Vite 标识资源
├── dist/               # build 产物目录，一般不手改
├── node_modules/       # 安装下来的依赖目录，一般不手改
└── 逐行带读.md          # 面向初学者的逐段讲解
```

## 3.1 每个关键文件是干什么的

### `.nvmrc`

内容是：

```text
22
```

表示这个项目建议使用 Node 22。

进入目录后执行：

```bash
nvm use
```

就会按这里的版本切换。

### `.vscode/extensions.json`

这是 VS Code 的扩展推荐文件。

当前内容是在推荐：

- `Vue.volar`

也就是 Vue 官方推荐的编辑器插件之一。

它的作用主要是：

- 提供 Vue 文件语法高亮
- 类型提示
- 组件/模板开发体验优化

### `vite.config.js`

这是 Vite 的配置文件。

当前内容很简单，核心就是：

- 引入 Vue 插件
- 告诉 Vite：这是一个 Vue 项目

如果后面你要改：

- 本地开发端口
- 打包配置
- 路径别名

通常都是从这里开始。

### `package.json`

这个文件可以先理解成：

- `go.mod`
- 加一部分 `Makefile`
- 再加一部分项目元数据

它主要负责：

- 记录依赖
- 定义脚本命令
- 描述项目基本信息

### `package-lock.json`

这是依赖锁定文件。

作用是固定具体依赖版本，避免同一个项目在不同机器、不同时间装出不一样的依赖树。

你可以先粗略类比成 `go.sum`。

### `index.html`

这是浏览器最先加载的入口 HTML。

它主要提供：

- `div#app`
- 对 `src/main.js` 的加载入口

Vue 最终会把应用挂到 `#app` 这个节点上。

### `src/main.js`

这是 Vue 应用代码入口。

它负责：

- 创建 Vue 应用实例
- 把 `App.vue` 挂到页面

你可以把它理解成这个前端项目里的 `main.go`。

### `src/App.vue`

这是当前学习示例最核心的文件。

里面同时包含：

- 状态定义
- 计算属性
- watch 逻辑
- 模板结构

如果你只想先抓主要矛盾，就优先看它。

### `src/style.css`

这是当前项目的全局样式文件。

它主要负责页面展示层，不负责业务逻辑。

### `src/components/HelloWorld.vue`

这是 Vite 创建 Vue 项目时带的默认示例组件。

在这份学习工程里，它不是主入口文件，更多是保留给你参考：

- Vue 单文件组件长什么样
- 一个子组件通常怎么组织

你后面如果想精简项目，也可以删掉它。

### `public/`

这是静态资源目录。

适合放：

- favicon
- 图标
- 不需要通过 JS import 的资源

### `src/assets/`

这里放的是通过源码 `import` 进来的资源。

当前包括：

- `hero.png`：页面展示图片
- `vue.svg`：Vue 图标
- `vite.svg`：Vite 图标

可以先把它和 `public/` 的区别理解成：

- `public/` 偏“原样静态文件”
- `src/assets/` 偏“参与源码依赖的资源”

### `dist/`

这是执行 `npm run build` 后生成的目录。

通常用于：

- 看最终产物
- 配合 `npm run preview` 本地预览

一般不手工改里面的文件。

### `node_modules/`

这是依赖安装目录。

特点是：

- 可删后重装
- 体积通常较大
- 平时不直接修改

### `逐行带读.md`

这是专门面向初学者的带读文档。

适合你在看完 README 总览后，再按顺序跟着代码读。

### 这个项目为什么没有 `.oxlintrc.json`

当前 Vue 项目还没有单独加 `oxlint` 或 `eslint` 配置文件。

这不代表 Vue 不能做静态检查，只是这份学习工程目前故意保持更轻，先把响应式、模板、交互主链路学明白。

## 4. 这份示例在讲什么

### `ref`

把一个普通值包成响应式数据。

比如：

- `name`
- `requestCount`
- `latency`
- `logs`

这些值一旦变化，模板会自动拿到新值。

### `computed`

用已有状态推导新值。

本项目里：

```js
const totalCost = computed(() => requestCount.value * latency.value)
```

它不需要你手工维护，只要依赖变了，它会自动重新计算。

### `watch`

监听数据变化，适合放日志、请求、埋点、副作用。

这里用来记录最近几次输入变化。

### `v-model`

处理输入框最常用。

你可以把它先理解成：

- 页面显示当前值
- 用户输入新值
- 框架自动把新值写回状态

## 4.1 给 Go 后端同学的 Vue 类比

如果你平时主要写 Go，可以先这样理解：

| Vue 概念 | 可以先粗略类比成什么 |
|---|---|
| `main.js` | `main.go`，负责启动应用 |
| `App.vue` | 一个页面级模块，里面放状态、逻辑、展示 |
| `ref` | 一块可变的内存状态 |
| `computed` | 根据已有字段推导出来的只读衍生字段 |
| `watch` | 数据变化后的 hook |
| `v-model` | “读当前值 + 写回新值”的绑定封装 |
| `template` | 最终响应内容模板 |

Vue 和 Go handler 的差异也一样值得先记住：

- Go 里你通常是自己控制“什么时候重新组织响应”
- Vue 里你更多是声明“哪些数据会影响页面”，然后由框架自动刷新相关部分

## 5. 典型调用链路

以修改“请求数”为例：

1. 用户在输入框里输入数字
2. `v-model.number` 把输入值写回 `requestCount`
3. Vue 发现响应式数据变化
4. `computed(totalCost)` 自动重新计算
5. 模板里依赖这些值的地方自动刷新
6. `watch([requestCount, latency])` 被触发，追加一条日志

如果你想用后端思维先类比：

- `ref` 像当前请求上下文里的可变状态
- `computed` 像根据已有字段算出来的衍生字段
- `watch` 像字段变动后的 hook
- 模板像最终响应体

再补一层更贴近 Go 的说法：

- `computed` 很像“不要重复存库，而是临时根据已有字段算出来”
- `watch` 很像“字段变化后顺手记日志、发请求、做埋点”
- `v-model` 很像把“解析请求参数 + 写回结构体字段”合成了一套简写

## 6. 如何 debug

### 方法一：最直接的方式是改值看页面

优先观察这几个量：

- `name`
- `requestCount`
- `latency`
- `totalCost`
- `logs`

### 方法二：在脚本里打日志

比如在 `src/App.vue` 里加：

```js
console.log('render-ish data', {
  name: name.value,
  requestCount: requestCount.value,
  latency: latency.value,
  totalCost: totalCost.value,
})
```

Vue 和 React 不同，`<script setup>` 不是每次都像 React 组件函数那样整段重跑来驱动视图；
更贴切的理解是：Vue 追踪了你哪些地方依赖了哪些响应式数据，然后在它们变化时更新相关部分。

这点可以理解成：

- React 更像“整个组件函数重新算一遍，再做差异更新”
- Vue 更像“谁依赖了这块数据，就重点更新谁”

### 方法三：在 `watch` 里看前后值

这份示例已经给了一个最简单版本。

你可以重点感受：

- 新值是怎么来的
- 旧值是怎么拿到的
- 为什么副作用适合放在 watch 里

### 方法四：浏览器 Vue DevTools

如果你要认真学 Vue，建议装：

- Vue.js devtools

它可以帮助你看：

- 组件树
- 响应式状态
- props
- 事件和更新

## 7. 建议你按什么顺序读代码

### 第一步：看 `src/main.js`

先理解 Vue 应用是怎么挂到 `#app` 上的。

### 第二步：看 `src/App.vue` 顶部的 `<script setup>`

这里就是当前页面的数据源和逻辑入口。

重点先看：

- `ref(...)`
- `computed(...)`
- `watch(...)`

如果按 Go 习惯来读，这一段可以近似当成“handler 里先定义状态和计算规则”。

### 第三步：再看 `<template>`

理解模板只是“如何展示这些响应式数据”。

### 第四步：看 `v-model` 和按钮点击

这是最常见的交互写法。

## 8. 你最容易混淆的点

### 1. `ref` 在脚本里要 `.value`

脚本里：

```js
requestCount.value
```

模板里：

```vue
{{ requestCount }}
```

模板会帮你自动解包。

### 2. `computed` 不应该拿来做副作用

它更适合“算值”，不适合发请求、写日志。
副作用更适合放 `watch`。

### 3. `v-model` 本质上还是数据绑定

不是魔法，只是把“读值 + 写值”这两件事帮你合并了。

## 9. 下一步建议

你可以自己做这几个小练习：

1. 新增一个错误率输入框，再算一个“总错误请求数”
2. 把日志改成对象数组，记录时间戳
3. 增加一个 `watchEffect` 版本，对比它和 `watch` 的区别
4. 把 summary 抽成独立组件
5. 模拟一次异步请求，把 loading 状态也加上

做完这些以后，Vue 的基本反应式思路就会顺很多。
