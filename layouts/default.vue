<script lang="ts" setup>
import type { AppLayoutListType, AppLayoutModelType, AppLayoutSwitchType, FloatDivModelType } from '~/typings';
import { NTabs, NTabPane, NIcon, NIconWrapper, NPopselect, NButton, NSplit, type MenuOption, NMenu, type SelectOption, NFlex, NDrawer, NRadioButton, NRadioGroup } from "naive-ui"
import { MenuOutline } from "@vicons/ionicons5"



const model = defineModel<AppLayoutModelType>({
  default: <AppLayoutModelType>{
    activeVal: "",
    list: [],
    type: "topside"
  }
})
const emits = defineEmits<{
  changeRouter: [v: AppLayoutListType]
}>()

const boardsideOption = model.value.list.map(c => {
  let o: MenuOption = {
    label: c.tab,
    key: c.val,
  }
  return o
})

const switchOption: SelectOption[] = [
  { label: "侧边菜单", value: <AppLayoutSwitchType>"boardside" },
  { label: "顶部菜单", value: <AppLayoutSwitchType>"topside" },
  { label: "浮动菜单", value: <AppLayoutSwitchType>"floatside" }
]

const switchLabel = ref(<string>switchOption.find(c => c.value == model.value.type)?.label || switchOption[0].label)
const switchVal = ref(<AppLayoutSwitchType>model.value.type)

const onswitch = (value: string) => {
  model.value.type = <AppLayoutSwitchType>value
  switchLabel.value = switchOption.find(c => c.value == model.value.type)?.label || switchOption[0].label
}

const floatData = ref<FloatDivModelType>({
  left: 10,
  top: 10
})
const floatActive = ref(false)


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
  let width = window.innerWidth
  let height = window.innerHeight
  if (width <= 500) {
    onswitch(<AppLayoutSwitchType>"floatside")
  }
  else if (width < height) {
    onswitch(<AppLayoutSwitchType>"topside")
  }
  else {
    onswitch(<AppLayoutSwitchType>"boardside")
  }
})




</script>



<template>
  <!--  顶部 -->
  <template v-if="model.type == 'topside'">
    <n-flex>
      <!-- 切换布局 -->
      <n-popselect v-model:value="switchVal" :options="switchOption" size="large" @update:value="onswitch">
        <n-button type="primary" class="topside-switch">{{ switchLabel }}</n-button>
      </n-popselect>
      <!-- 菜单 -->
      <n-flex>
        <n-tabs type="bar" animated :value="model?.activeVal" @update:value="changeRouter">
          <template v-for="item in (model?.list || [])">
            <n-tab-pane :name="item.val" :tab="item.tab">

            </n-tab-pane>
          </template>
        </n-tabs>
      </n-flex>

    </n-flex>
    <!-- 内容 -->
    <div class="app_content">
      <slot></slot>
    </div>
  </template>

  <!-- 侧边 -->
  <template v-if="model.type == 'boardside'">
    <div class="boardside">
      <n-split direction="horizontal" style="height: 100%;" :max="0.75" :default-size="0.1" :min="0.05">
        <!-- 左边菜单 -->
        <template #1>
          <div class="boardside-switch">
            <!-- 切换布局 -->
            <n-popselect v-model:value="switchVal" :options="switchOption" size="large" @update:value="onswitch">
              <n-button type="primary">{{ switchLabel }}</n-button>
            </n-popselect>
          </div>
          <!-- 菜单 -->
          <n-menu :options="boardsideOption" v-model:value="model.activeVal" @update:value="changeRouter" />
        </template>
        <!-- 右边内容 -->
        <template #2>
          <slot></slot>
        </template>
      </n-split>
    </div>
  </template>

  <!-- 浮动 -->
  <template v-if="model.type == 'floatside'">
    <slot></slot>
    <float-div v-model="floatData" @jclick="floatActive = true">
      <n-icon-wrapper :size="45" :border-radius="10">
        <n-icon :size="30" :component="MenuOutline" />
      </n-icon-wrapper>
    </float-div>
  </template>

  <n-drawer v-model:show="floatActive" placement="top">
    <n-flex vertical size="large">
      <div class="float-switch">
        <n-radio-group v-model:value="switchVal" size="medium"
          @update:value="(v) => { onswitch(v); floatActive = false }">
          <n-radio-button v-for="item in switchOption" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-radio-button>
        </n-radio-group>
      </div>
      <div class="float-list">
        <n-flex>
          <n-button v-for="item in model.list" :type="item.val == model.activeVal ? 'primary' : 'default'"
            @click="changeRouter(item.val);">{{ item.tab }}</n-button>
        </n-flex>
      </div>
    </n-flex>

  </n-drawer>


</template>

<style scoped>
.boardside {
  height: 95%;
  width: 100%;
  position: absolute;
}

.boardside_split {
  height: 100%
}

.boardside-switch {
  margin-left: 10px;
  margin-top: 10px;
}

.topside-switch {
  margin-left: 10px;
}

.float-switch {
  margin-left: 20px;
  margin-top: 20px;
}

.float-list {
  margin-left: 20px;
}
</style>
