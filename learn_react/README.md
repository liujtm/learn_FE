# React 学习工程

这是一个给后端同学用的最小 React 学习项目。

目标不是做复杂页面，而是先把下面这条主线跑通：

`用户操作 -> 事件处理函数 -> setState -> 组件重新执行 -> React 更新 DOM`

## 1. 如何启动

先安装依赖：

```bash
npm install
```

本地开发启动：

```bash
npm run dev
```

默认会看到类似地址：

```bash
http://127.0.0.1:5173/
```

生产构建：

```bash
npm run build
```

本地预览构建产物：

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

你可以按这个顺序看：

1. `index.html`
   浏览器真正加载的 HTML 壳子，里面只有一个 `div#root`
2. `src/main.jsx`
   React 应用入口，负责把 `App` 挂到 `#root`
3. `src/App.jsx`
   当前示例页面的核心逻辑，最值得先看
4. `src/App.css`
   当前页面样式
5. `src/index.css`
   全局样式

## 3. 仓库结构和职责

```text
learn_react/
├── index.html          # 浏览器入口 HTML，提供 root 挂载点
├── package.json        # 依赖、脚本命令
├── src/
│   ├── main.jsx        # React 入口，把 App 挂载到 root
│   ├── App.jsx         # 主页面组件，演示 state/effect/memo
│   ├── App.css         # 页面局部样式
│   └── index.css       # 全局样式
└── public/             # 静态资源目录
```

## 4. 这份示例在讲什么

页面里主要演示了 4 件事：

1. `useState`
   管理组件自己的状态，比如 `count`、`step`、`name`
2. `useEffect`
   在渲染完成后执行副作用，这里用来记录日志
3. `useMemo`
   根据已有状态推导提示文案
4. JSX
   用接近 HTML 的语法写 UI，但本质上还是 JavaScript

## 4.1 给 Go 后端同学的 React 类比

如果你平时主要写 Go，可以先这样建立理解：

| React 概念 | 可以先粗略类比成什么 |
|---|---|
| `main.jsx` | `main.go`，负责启动应用 |
| `App()` 组件 | 一个根据当前状态返回响应内容的函数 |
| JSX | 组织返回内容的语法糖 |
| `useState` | 当前进程内的一块状态内存 |
| `setState` | 更新状态并触发重新计算 |
| `useMemo` | 根据已有字段做缓存型派生计算 |
| `useEffect` | 主渲染完成后执行的副作用 hook |
| `onClick` | 注册一个事件回调 |

但要注意，React 和 Go handler 有一个非常重要的差异：

- Go HTTP handler 常见模式是：请求进来，算完，返回，结束
- React 组件常见模式是：页面常驻内存，用户不断触发事件，组件不断基于新状态重新执行

## 5. 典型调用链路

以点击 `+step` 按钮为例：

1. 浏览器触发 `onClick`
2. 执行 `setCount((v) => v + step)`
3. React 标记当前组件状态发生变化
4. React 重新执行 `App()` 函数
5. JSX 重新计算，得到新的虚拟 UI 结果
6. React 对比前后差异，更新真实 DOM
7. `useEffect` 因依赖变化而再次执行，写入日志

如果你是后端开发，可以把它先粗略理解成：

- `App()` 像一个“根据当前状态生成页面描述”的函数
- `useState` 像进程内内存
- `setState` 像触发一次重新计算
- React 帮你把“新结果”同步到页面

再翻成 Go 语言一点的说法：

- JSX 像你在拼一个结构化响应体，只不过目标不是 JSON，而是页面结构
- `setCount(...)` 像你修改了内存中的业务字段，然后框架自动帮你刷新输出
- `useEffect` 像“主流程结束后再补一个日志/埋点/异步动作”

## 6. 如何 debug

### 方法一：直接看页面交互

最简单，先改这几个值观察页面变化：

- `count`
- `step`
- `name`
- `message`

### 方法二：打 `console.log`

比如在 `src/App.jsx` 里加：

```jsx
console.log('render App', { count, step, name })
```

你会发现：

- 初次加载会打印一次
- 每次 `setCount` / `setStep` / `setName` 后会再次打印

这有助于理解“状态变化会导致组件重新执行”

### 方法三：在事件和 effect 里分别打日志

你可以分别加在：

- 按钮的 `onClick`
- `useEffect`

这样能看清楚：

- 事件处理什么时候发生
- render 什么时候发生
- effect 又是什么时候发生

### 方法四：用浏览器 React DevTools

如果后面你准备深入学 React，建议装浏览器插件：

- React Developer Tools

它能看：

- 组件树
- props
- state
- 组件更新情况

## 7. 建议你按什么顺序读代码

### 第一步：只看 `src/main.jsx`

先明白一件事：

React 不是“自动接管整个网页”，而是把一个组件树挂到 `#root` 这个 DOM 节点上。

你可以把 `#root` 先理解成一个固定的输出挂载点。

### 第二步：看 `src/App.jsx` 的状态定义

先找这些变量：

- `count`
- `step`
- `name`
- `logs`

看懂“页面上显示的内容，其实都来自这些状态”。

### 第三步：看按钮点击事件

重点看：

```jsx
onClick={() => setCount((v) => v + step)}
```

这就是最经典的 React 交互入口。

### 第四步：看 `useEffect`

理解它不是“渲染页面”，而是“渲染完成后顺手做点额外工作”。

## 8. 你最容易混淆的点

### 1. React 不是直接改变量就刷新

下面这种写法不会工作：

```jsx
count = count + 1
```

React 要求你通过 `setCount(...)` 更新状态。

### 2. 组件函数会反复执行

`App()` 不是只执行一次。
每次状态变化，它都可能重新执行。

这个点对后端同学往往最反直觉，因为它不像“一次请求一个 handler”，更像“同一个 handler 围绕一份常驻状态被持续触发重新计算”。

### 3. JSX 不是模板引擎

它看起来像 HTML，但本质上是在 JavaScript 里描述 UI。

## 9. 下一步建议

你可以自己动手加这几个练习：

1. 增加一个“减 1”按钮
2. 增加一个“最大值限制”
3. 把日志改成对象数组，而不是字符串数组
4. 把 `lessonList` 提取成独立组件
5. 模拟一次异步请求，用 `useEffect + setTimeout`

当你做完这些，React 的基本感觉就会出来了。
