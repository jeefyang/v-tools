<script lang="ts" setup>
import { NTabs, NTabPane,NRadio,NRadioGroup,NSpace } from "naive-ui"

const sencondSelectList={}




</script>

<template>
  <n-tabs type="card" size="small">
    <!-- 秒 -->
    <n-tab-pane name="second" tab="秒">
      <n-radio-group v-model:value="value" name="radiogroup">
    <n-space vertical>
      <n-radio v-for="song in songs" :key="song.value" :value="song.value">
        {{ song.label }}
      </n-radio>
    </n-space>
  </n-radio-group>
    </n-tab-pane>
    <!-- 分钟 -->
    <n-tab-pane name="minute" tab="分钟">

    </n-tab-pane>
    <!-- 小时 -->
    <n-tab-pane name="hour" tab="小时">

    </n-tab-pane>
    <!-- 月份 -->
    <n-tab-pane name="month" tab="月份">

    </n-tab-pane>
    <!-- 星期 -->
    <n-tab-pane name="week" tab="星期">

    </n-tab-pane>
    <!-- 年份 -->
    <n-tab-pane name="year" tab="年份">

    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
