# learn_fe

这是一个给后端工程师准备的前端学习仓库。

目前包含两个最小学习项目：

- `learn_react`
- `learn_vue`

目标不是一上来做复杂业务，而是先把前端最基础的运行模型搞明白：

- 页面怎么启动
- 数据怎么驱动界面
- 用户点击之后，代码链路怎么走
- React 和 Vue 在思路上分别偏什么

## 给 Go 后端同学的总类比

如果你平时主要写 Go，可以先用下面这套不严格但很好用的映射建立直觉：

| 前端概念 | 可以先粗略类比成什么 |
|---|---|
| 页面 / 组件 | 一个会持续响应用户操作的 handler |
| state / ref | 进程内当前内存状态 |
| render / template | 根据当前状态组装响应内容 |
| 用户点击 / 输入 | 一次新的外部事件 |
| setState / 修改 ref | 更新内存后触发重新计算 |
| useEffect / watch | 业务主流程之外的副作用 hook |
| computed / useMemo | 根据已有字段计算出的派生字段 |
| Vite dev server | 本地调试服务器 |

不过有一个关键区别要先记住：

- 后端 handler 往往是“请求来一次，执行一次，返回结束”
- 前端组件往往是“页面挂着不退出，用户每操作一次，就在当前状态上继续演化”

## 基础概念对照表

下面这张表不追求 100% 严格一一对应，但很适合后端同学快速建立地图感：

| 前端 / Node 世界 | Go / 后端世界里可以先类比成 |
|---|---|
| `package.json` | `go.mod` |
| `package-lock.json` / `pnpm-lock.yaml` | `go.sum` |
| `node_modules` | 本地依赖缓存 + vendor 目录的混合感觉 |
| `npm install` | `go mod download` |
| `npm run dev` | `go run` 一个本地开发入口 |
| `npm run build` | `go build` |
| `npm run preview` | 本地跑构建产物看最终效果 |
| `src/main.jsx` / `src/main.js` | `main.go` |
| 组件 `App.jsx` / `App.vue` | 一个持续响应事件的业务入口 |
| props | 上层传进来的参数 |
| state / ref | 运行中的内存状态 |
| `useEffect` / `watch` | 副作用 hook |
| `useMemo` / `computed` | 派生字段 / 缓存计算结果 |
| 浏览器 DevTools | 类似调试日志 + runtime inspect 工具 |
| SPA | 一个常驻浏览器内存的单页应用 |
| 微前端 | 前端领域里的“微服务化拆分” |

其中这几组最值得特别记一下：

### `package.json` 和 `go.mod`

- `go.mod` 主要声明模块名和依赖
- `package.json` 除了依赖，还会声明脚本命令、项目元信息

所以你可以先把 `package.json` 理解成：

- `go.mod`
- 再加上一部分 `Makefile`
- 再加上一部分项目说明元数据

### `npm run` 和 `go run`

两者都可以理解成“把当前项目跑起来”，但它们关注点不完全一样：

- `go run` 是直接编译并运行 Go 入口
- `npm run dev` 通常是执行 `package.json` 里的脚本，比如启动 Vite 开发服务器

所以更准确地说：

- `npm run xxx` 更像“执行项目预先定义好的命令别名”
- `go run` 更像“直接运行代码入口”

### `npm run build` 和 `go build`

这两个很适合放在一起理解：

- `go build` 产出可执行文件
- `npm run build` 产出静态资源构建结果，一般在 `dist/`

两者共同点都是：

- 面向发布产物
- 不再是开发态热更新
- 更接近上线前的最终结果

### 微服务 和 微前端

可以先粗略理解成同一种拆分思想在不同层的落地：

- 微服务：把后端大系统拆成多个服务
- 微前端：把前端大应用拆成多个相对独立的前端子应用

共同目标通常都是：

- 降低单体复杂度
- 提高团队并行开发能力
- 降低发布耦合

但它们也有明显差异：

- 微服务主要解决服务边界、接口调用、数据一致性
- 微前端主要解决页面边界、路由整合、样式隔离、运行时集成

## 仓库结构

```text
learn_fe/
├── .gitignore
├── README.md
├── learn_react/   # React + Vite 学习工程
└── learn_vue/     # Vue 3 + Vite 学习工程
```

## 两个子项目各自学什么

### `learn_react`

适合先建立这些感觉：

- `useState` 管状态
- `useEffect` 做副作用
- `useMemo` 做派生值
- 组件函数会随着状态变化反复执行
- 交互主链路通常是：
  `事件 -> setState -> 重新 render -> 更新 DOM`

重点文件：

- `learn_react/src/main.jsx`
- `learn_react/src/App.jsx`
- `learn_react/README.md`
- `learn_react/逐行带读.md`

### `learn_vue`

适合先建立这些感觉：

- `ref` 管响应式状态
- `computed` 管派生值
- `watch` 管副作用
- `v-model` 管表单双向绑定
- 交互主链路通常是：
  `响应式数据变化 -> 模板自动刷新 -> watch 跟进副作用`

重点文件：

- `learn_vue/src/main.js`
- `learn_vue/src/App.vue`
- `learn_vue/README.md`
- `learn_vue/逐行带读.md`

## 推荐学习顺序

如果你是后端开发，我建议不要同时乱跳着看，顺一点会舒服很多。

### 第一阶段：先拿 React 建立“状态驱动 UI”的直觉

按这个顺序：

1. `learn_react/README.md`
2. `learn_react/逐行带读.md`
3. `learn_react/src/main.jsx`
4. `learn_react/src/App.jsx`
5. 打开页面，自己改几个状态变量试试

### 第二阶段：再用 Vue 对照着理解“响应式”

按这个顺序：

1. `learn_vue/README.md`
2. `learn_vue/逐行带读.md`
3. `learn_vue/src/main.js`
4. `learn_vue/src/App.vue`
5. 改 `ref`、`computed`、`watch` 看页面联动

### 第三阶段：对比两边的思维差异

可以重点问自己这几个问题：

1. React 为什么总在强调组件重新执行？
2. Vue 为什么总在强调响应式依赖？
3. 同样是输入框和按钮，两边写法为什么这么不同？
4. 什么时候该存 state，什么时候该算 derived data？

## 怎么启动

两个子项目都一样，进入各自目录执行：

```bash
npm install
npm run dev
```

例如：

```bash
cd learn_react
npm install
npm run dev
```

或者：

```bash
cd learn_vue
npm install
npm run dev
```

构建验证：

```bash
npm run build
```

## 建议你怎么练

不要只看文档，最好每学一个点就动一下代码。

### 第一组练习：最小交互

- 增加一个减号按钮
- 增加最小值/最大值限制
- 增加一个清空日志按钮

### 第二组练习：派生数据

- 根据已有状态增加一个新的提示文案
- 增加一个统计字段
- 不要重复存储能计算出来的值

### 第三组练习：列表

- 把字符串日志改成对象数组
- 展示时间、类型、消息
- 尝试删除某一条日志

### 第四组练习：异步

- 模拟请求加载
- 加一个 loading 状态
- 加一个成功 / 失败提示

## React 和 Vue 的一个粗略对照

| 主题 | React | Vue |
|---|---|---|
| 状态 | `useState` | `ref` |
| 派生值 | `useMemo` | `computed` |
| 副作用 | `useEffect` | `watch` |
| 输入绑定 | `value + onChange` | `v-model` |
| 核心感觉 | 组件函数重跑 | 响应式依赖更新 |

这个表不追求绝对严谨，但对入门很够用。

## 结合 Go 的推荐理解路径

如果你是熟悉 Go 服务开发的同学，我建议你先用下面的方式看：

1. 先把 `main.jsx` / `main.js` 当成 `main.go`
2. 把 `App.jsx` / `App.vue` 当成主要业务入口
3. 把页面上展示的变量，当成内存里的当前状态
4. 把按钮点击，当成一次外部事件回调
5. 把界面刷新，当成“根据最新状态重新组织输出”

这样再去看 React 和 Vue，就不会一上来被模板、JSX、hook 这些名词吓住。

## Git 使用建议

这个仓库已经初始化 Git，并且有第一版提交。

后面建议你每做完一个小练习就提交一次，不要把很多学习改动堆在一起。

比较好的提交粒度例如：

- `feat: add react decrement button`
- `feat: add vue loading demo`
- `docs: expand learning notes`

## 你下一步最值得做的事

如果你今天只做一件事，我建议是：

1. 先改 React 的 `App.jsx`
2. 自己加一个 “-1” 按钮
3. 提交一次 commit
4. 再在 Vue 里做同样功能
5. 对比两边写法

这一步做完，你对两个框架的第一层差异就不再是抽象概念了。
