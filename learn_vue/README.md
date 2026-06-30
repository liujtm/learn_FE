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
├── index.html          # 浏览器入口 HTML，提供 app 挂载点
├── package.json        # 依赖、脚本命令
├── src/
│   ├── main.js         # Vue 应用入口
│   ├── App.vue         # 主页面组件，演示 ref/computed/watch/v-model
│   ├── style.css       # 全局样式
│   └── assets/         # 默认静态资源
└── public/             # 静态资源目录
```

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
