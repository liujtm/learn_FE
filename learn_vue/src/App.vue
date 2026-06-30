<script setup>
import { computed, ref, watch } from 'vue'

// ref 用来声明最基础的响应式状态
// 在脚本里访问它们要写 .value；在模板里 Vue 会帮你自动解包
const name = ref('后端同学')
const requestCount = ref(0)
const latency = ref(120)
const logs = ref([])

// computed 用来声明“派生值”
// 它依赖 requestCount 和 latency，任何一个变化时都会重新计算
const totalCost = computed(() => requestCount.value * latency.value)

// watch 适合做副作用，比如日志、请求、埋点
// 这里我们把前后值记下来，方便你观察响应式链路
watch([requestCount, latency], ([newCount, newLatency], [oldCount, oldLatency]) => {
  const previousCount = oldCount ?? 0
  const previousLatency = oldLatency ?? 120
  logs.value = [
    `requestCount ${previousCount} -> ${newCount}，latency ${previousLatency} -> ${newLatency}`,
    ...logs.value,
  ].slice(0, 5)
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Vue 学习工程</p>
        <h1>从响应式数据出发理解 Vue</h1>
        <p class="intro">
          Vue 的核心体验是：数据先变，模板自动跟着变。你写的是状态和规则，不是手工更新页面节点。
        </p>
      </div>

      <div class="panel">
        <label class="field">
          <span>称呼</span>
          <!-- v-model 是最常见的表单双向绑定写法 -->
          <input v-model="name" />
        </label>

        <label class="field">
          <span>请求数</span>
          <!-- .number 修饰符会尽量把输入值转成 number，而不是 string -->
          <input v-model.number="requestCount" type="number" min="0" />
        </label>

        <label class="field">
          <span>单次耗时(ms)</span>
          <input v-model.number="latency" type="number" min="1" />
        </label>

        <div class="summary">
          <strong>{{ name }}</strong>
          <span>总耗时估算：{{ totalCost }} ms</span>
        </div>

        <div class="actions">
          <!-- 点击按钮 -> 修改 ref -> 依赖这些 ref 的地方自动更新 -->
          <button type="button" @click="requestCount += 1">+1 request</button>
          <button type="button" class="ghost" @click="logs = []">clear log</button>
        </div>
      </div>
    </section>

    <section class="grid">
      <div class="block">
        <h2>先看 3 个关键词</h2>
        <ul class="lessonList">
          <li>
            <strong>ref</strong>
            <p>把普通值变成响应式数据，模板和脚本里都能读。</p>
          </li>
          <li>
            <strong>computed</strong>
            <p>从已有状态推导新值，适合派生数据。</p>
          </li>
          <li>
            <strong>watch</strong>
            <p>监听数据变化，处理日志、请求、副作用。</p>
          </li>
        </ul>
      </div>

      <div class="block">
        <h2>你现在看到的联动</h2>
        <ol class="steps">
          <li>输入框修改的是 `ref`。</li>
          <li>`computed` 自动重新计算总耗时。</li>
          <li>模板拿到新值后自动刷新。</li>
          <li>`watch` 顺手记下一条变化日志。</li>
        </ol>
      </div>
    </section>

    <section class="block">
      <h2>最近 5 次 watch 日志</h2>
      <ul class="logList">
        <li v-for="item in logs" :key="item">{{ item }}</li>
      </ul>
    </section>
  </main>
</template>
