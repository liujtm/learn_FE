import { useEffect, useMemo, useState } from 'react'
import './App.css'

// 这里故意放一份静态配置，方便你区分：
// 1. 哪些数据是“写死的配置”
// 2. 哪些数据是“会随交互变化的 state”
const lessons = [
  {
    title: '组件',
    detail: 'React 用函数返回 UI。函数入参是 props，返回值像模板，但本质是 JavaScript。',
  },
  {
    title: '状态',
    detail: 'useState 触发重新渲染。你改的是状态，不是手动改 DOM。',
  },
  {
    title: '副作用',
    detail: 'useEffect 处理请求、定时器、日志这些“渲染之外”的事。',
  },
]

function App() {
  // 这几个 useState 就是当前组件的“本地内存”
  // 只要其中任意一个发生变化，React 就会重新执行 App()
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [name, setName] = useState('后端同学')
  const [logs, setLogs] = useState([])

  // useEffect 可以理解成“这次渲染完成后，再补做一点事”
  // 这里没有直接操作页面，而是记录一条日志，帮助你观察依赖变化
  useEffect(() => {
    setLogs((prev) => [
      `count 从 ${count - step} 变成 ${count}，组件在 ${new Date().toLocaleTimeString()} 重新渲染`,
      ...prev,
    ].slice(0, 5))
  }, [count, step])

  // useMemo 适合做“由已有状态推导出来的结果”
  // 这个值不需要单独存库；只要 count 变了，React 就会重新计算它
  const message = useMemo(() => {
    if (count === 0) return '还没开始交互，先点一下按钮。'
    if (count < 5) return '这就是最基础的状态更新。'
    return '你已经触发了多次渲染，可以开始看 effect 和 props 了。'
  }, [count])

  // 每次 render，本函数都会返回一份新的 JSX 结构描述
  // React 会把这次结果和上次结果做对比，再决定怎么更新真实 DOM
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">React 学习工程</p>
          <h1>用最小例子看懂 React 怎么驱动页面</h1>
          <p className="intro">
            你可以把 React 理解成：状态变化后，框架重新执行组件函数，再把最新结果同步到页面。
          </p>
        </div>

        <div className="panel">
          <label className="field">
            <span>称呼</span>
            {/* 受控输入框：输入值来自 state，输入事件再反向更新 state */}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="field">
            <span>步长</span>
            <input
              type="number"
              min="1"
              max="5"
              value={step}
              onChange={(e) => setStep(Number(e.target.value) || 1)}
            />
          </label>

          <div className="counterBox">
            <strong>{name}</strong>
            <span className="count">{count}</span>
          </div>

          <div className="actions">
            {/* 点击按钮 -> 触发事件 -> setCount -> 重新 render */}
            <button type="button" onClick={() => setCount((v) => v + step)}>
              +{step}
            </button>
            <button type="button" className="ghost" onClick={() => setCount(0)}>
              reset
            </button>
          </div>

          <p className="hint">{message}</p>
        </div>
      </section>

      <section className="grid">
        <div className="block">
          <h2>先记这 3 件事</h2>
          <ul className="lessonList">
            {/* map 是 React 里最常见的列表渲染方式 */}
            {lessons.map((lesson) => (
              <li key={lesson.title}>
                <strong>{lesson.title}</strong>
                <p>{lesson.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="block">
          <h2>这段代码里发生了什么</h2>
          <ol className="steps">
            <li>初次加载时，`App()` 被执行一次。</li>
            <li>点击按钮后，`setCount` 改状态。</li>
            <li>React 重新执行 `App()`，得到新的 UI。</li>
            <li>`useEffect` 在渲染提交后记录一条日志。</li>
          </ol>
        </div>
      </section>

      <section className="block">
        <h2>最近 5 次 effect 日志</h2>
        <ul className="logList">
          {logs.map((log) => (
            <li key={log}>{log}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
