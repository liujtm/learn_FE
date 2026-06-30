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
