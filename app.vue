<script setup lang="ts">
import { NConfigProvider, darkTheme, NGlobalStyle } from "naive-ui"
import type { AppLayoutModelType } from "~/typings/index"

const route = useRoute();

const routerData = ref<AppLayoutModelType>({
  list: [
    { val: "index", tab: "首页", url: "/" },
    { val: "cronTime", tab: "cron表达式", url: "/cronTime" },
    { val: "test1", tab: "测试1", url: "/test1" },
    { val: "test2", tab: "测试2", url: "/test2" },
    { val: "test3", tab: "测试3", url: "/test3" },
    { val: "test4", tab: "测试4", url: "/test4" }
  ],
  activeVal: "",
  type: "floatside"
})

onMounted(() => {

  commonChangeRouter(routerData.value.list, {
    path: route.path, cb: (v) => {
      routerData.value.activeVal = v.val
    }
  }, false)

})
</script>
<template>
  <template>
    <n-config-provider :theme="darkTheme">
      <n-global-style />
      <nuxt-layout v-model="routerData">
        <nuxt-page></nuxt-page>
      </nuxt-layout>
    </n-config-provider>

  </template>

</template>
<style scoped></style>