<script lang="ts" setup>
import type { AppLayoutListType, AppLayoutModelType } from '~/typings';
import { NTabs, NTabPane } from "naive-ui"


const model = defineModel<AppLayoutModelType>({
  default: <AppLayoutModelType>{
    activeVal: "",
    list: [],
    type: "topside"
  }
})
const props = defineProps<{
  defaultVal: string
}>()
const emits = defineEmits<{
  changeRouter: [v: AppLayoutListType]
}>()



const changeRouter = (name: string) => {
  commonChangeRouter(model.value.list || [], {
    name: name,
    cb: (v) => {
      model.value.activeVal = v.val
      emits("changeRouter", v)
    }
  }, true)
}

onMounted(() => {
  watch([() => props.defaultVal], (v) => {
    model.value.activeVal = v[0]
  })
})




</script>



<template>
  <template v-if="model.type == 'topside'">
    <n-tabs type="bar" animated :value="model?.activeVal" @active-name-change="changeRouter">
      <template v-for="item in (model?.list || [])">
        <n-tab-pane :name="item.val" :tab="item.tab">

        </n-tab-pane>
      </template>
    </n-tabs>
    <div class="app_content">
      <slot></slot>
    </div>
  </template>

</template>

<style scoped></style>
