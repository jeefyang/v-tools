<script lang="ts" setup>
import { NTabs, NTabPane, NRadio, NRadioGroup, NSpace, NFlex } from "naive-ui"
import type { TimeItemType, TimeItemTypeType } from "~/typings/cronTime";

const secondData = ref<TimeItemType[]>([
  {
    type: "wild",
    desc: "每秒"
  },
  {
    type: "cycle",
    from: 1,
    to: 2,
    min: 0,
    max: 60,
    desc: "周期",
    cell: "秒"
  },
  {
    type: "interval",
    min: 0,
    max: 60,
    start: 0,
    interval: 1,
    cell: "秒"
  },
  {
    type: "select",
    from: 0,
    to: 59,
    select: []
  }
])
const secondSelect = ref<TimeItemTypeType>('wild')

const minuteData = ref<TimeItemType[]>([
  {
    type: "wild",
    desc: "每分"
  },
  {
    type: "cycle",
    from: 1,
    to: 2,
    min: 0,
    max: 60,
    desc: "周期",
    cell: "分"
  },
  {
    type: "interval",
    min: 0,
    max: 60,
    start: 0,
    interval: 1,
    cell: "分"
  },
  {
    type: "select",
    from: 0,
    to: 59,
    select: []
  }
])

const minuteSelect = ref<TimeItemTypeType>('wild')


const hourData = ref<TimeItemType[]>([
  {
    type: "wild",
    desc: "小时"
  },
  {
    type: "cycle",
    from: 0,
    to: 2,
    min: 0,
    max: 23,
    desc: "周期",
    cell: "小时"
  },
  {
    type: "interval",
    min: 0,
    max: 23,
    start: 0,
    interval: 1,
    cell: "小时"
  },
  {
    type: "select",
    from: 0,
    to: 23,
    select: []
  }
])

const hourSelect = ref<TimeItemTypeType>('wild')

</script>

<template>
  <n-tabs type="card" size="small">
    <!-- 秒 -->
    <n-tab-pane display-directive="show" name="second" tab="秒" key="second">
      <n-radio-group v-model:value="secondSelect" name="radiogroup">
        <n-space vertical>
          <template v-for="(item, index) in secondData" :key="index">
            <n-flex>
              <n-radio :value="item.type">
              </n-radio>
              <cron-time-cell v-model="secondData[index]"></cron-time-cell>
            </n-flex>
          </template>
        </n-space>
      </n-radio-group>
    </n-tab-pane>
    <!-- 分钟 -->
    <n-tab-pane display-directive="show" name="minute" tab="分钟" key="minute">
      <n-radio-group v-model:value="minuteSelect" name="radiogroup">
        <n-space vertical>
          <template v-for="(item, index) in minuteData" :key="index">
            <n-flex>
              <n-radio :value="item.type">
              </n-radio>
              <cron-time-cell v-model="minuteData[index]"></cron-time-cell>
            </n-flex>
          </template>
        </n-space>
      </n-radio-group>
    </n-tab-pane>
    <!-- 小时 -->
    <n-tab-pane name="hour" tab="小时" display-directive="show" key="hour">
      <n-radio-group v-model:value="hourSelect" name="radiogroup">
        <n-space vertical>
          <template v-for="(item, index) in hourData" :key="index">
            <n-flex>
              <n-radio :value="item.type">
              </n-radio>
              <cron-time-cell v-model="hourData[index]"></cron-time-cell>
            </n-flex>
          </template>
        </n-space>
      </n-radio-group>
    </n-tab-pane>
    <!-- 月份 -->
    <n-tab-pane name="month" tab="月份">
      月份
    </n-tab-pane>
    <!-- 星期 -->
    <n-tab-pane name="week" tab="星期">
      星期
    </n-tab-pane>
    <!-- 年份 -->
    <n-tab-pane name="year" tab="年份">
      年份
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
