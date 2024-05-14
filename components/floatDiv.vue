<script lang="ts" setup>
import type { FloatDivModelType } from '~/typings';

let initialX: number = 0;
let initialY: number = 0;
let active = false;
let startTime: number = 0
let isMove = false
let moveCount = 0
let moveDelta: number = 10
let timeDelta = 150

const emits = defineEmits<{
  jclick: [e: MouseEvent]
}>()

const model = defineModel<FloatDivModelType>({
  default: <FloatDivModelType>{
    left: 0, top: 0
  }
})

function dragStart(e: MouseEvent) {

  initialX = e.clientX
  initialY = e.clientY
  active = true
  startTime = new Date().getTime()
  isMove = false
  moveCount = 0
}

function dragEnd(e: MouseEvent) {
  active = false;
}

function drag(e: MouseEvent) {
  if (!active) {
    return
  }
  e.preventDefault();
  moveCount += Math.abs(e.clientX - initialX)
  moveCount += Math.abs(e.clientY - initialY)
  model.value.left += e.clientX - initialX;
  model.value.top += e.clientY - initialY;
  initialX = e.clientX
  initialY = e.clientY
  isMove = true
}


const onclick = (e: MouseEvent) => {
  if (!isMove) {
    emits("jclick", e)
    return
  }
  if (moveCount < moveDelta) {
    emits("jclick", e)
    return
  }
  if ((new Date().getTime() - startTime) < timeDelta) {
    emits("jclick", e)
    return
  }

}

onMounted(() => {
  document.addEventListener("mouseup", dragEnd, false)
  document.addEventListener("mousemove", drag, false)
})

onUnmounted(() => {
  document.removeEventListener("mouseup", dragEnd, false)
  document.removeEventListener("mousemove", drag, false)
})



</script>
<template>
  <div class="main" :style="{ 'top': model.top + 'px', 'left': model.left + 'px' }" @mousedown="dragStart"
    @click="onclick">
    <slot></slot>
  </div>
</template>

<style scoped>
.main {
  position: fixed;
}

.main:hover {
  cursor: move;
}
</style>
