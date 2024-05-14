<script lang="ts" setup>
import type { AppLayoutListType } from '~/typings';


defineModel<AppLayoutListType>()



</script>

<template>
 
      <n-split direction="horizontal" class="split" :max="0.75" :size="0.1" :min="0.2">
        <template #1>
          Pane 1
        </template>
        <template #2>
          <slot></slot>
        </template>
      </n-split>
    
</template>

<style scoped>
.app {
  height: 95%;
  width: 100%;
  position: absolute;
}

.split {
  height: 100%
}
</style>
