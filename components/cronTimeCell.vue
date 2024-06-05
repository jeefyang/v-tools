<script setup lang="ts">
import type { TimeItemType } from '~/typings/cronTime';
import { NFlex, NInputNumber, NSpace, NCheckbox, NCheckboxGroup } from "naive-ui"

const model = defineModel<TimeItemType>()

const interval2Arr = (from: number, to: number) => {
    let arr: { lab: string, val: number }[] = []
    let count = 0
    let max = 1
    while (to > max) {
        count++
        max = Math.pow(10, count)
    }
    for (let i = from; i <= to; i++) {
        let l = (max + i).toString().slice(1)
        arr.push({ val: i, lab: l })
    }
    return arr
}

onMounted(() => {
    console.log("creat")
})

</script>
<template>
    <!-- 通配符 -->
    <template v-if="model?.type == 'wild'">
        <n-flex>
            <div class="desc">{{ model.desc }}</div>
            <div>允许的通配符[, - * /]</div>
        </n-flex>
    </template>

    <!-- 周期 -->
    <template v-if="model?.type == 'cycle'">
        <n-flex>
            <div class="desc">{{ model.desc }}</div>
            <div>从</div>
            <n-input-number v-model:value="model.from" :min="1" :max="model.max" class="input" />
            <div>--</div>
            <n-input-number v-model:value="model.to" :min="model.min" :max="model.max" class="input" />
            <div>{{ model.cell }}</div>
        </n-flex>
    </template>

    <!-- 间隔 -->
    <template v-if="model?.type == 'interval'">
        <n-flex>
            <div>从</div>
            <n-input-number v-model:value="model.start" :min="1" :max="model.max" class="input" />
            <div>{{ model.cell }}开始,每</div>
            <n-input-number v-model:value="model.interval" :min="model.min" :max="model.max" class="input" />
            <div>{{ model.cell }}执行一次</div>
        </n-flex>
    </template>

    <!-- 不指定 -->
    <template v-if="model?.type == 'noSelect'">
        <div class="desc">不指定</div>
    </template>

    <!-- 最后 -->
    <template v-if="model?.type == 'last'">
        <div class="desc">{{ model.desc }}</div>
    </template>

    <!-- 接近 -->
    <template v-if="model?.type == 'crossWrokDay'">
        <n-flex>
            <div>{{ model.prevStr }}</div>
            <n-input-number v-model:value="model.from" :min="model.min" :max="model.max" class="input" />
            <div>{{ model.nextStr }}</div>
        </n-flex>

    </template>

    <!-- 指定 -->
    <template v-if="model?.type == 'select'">
        <n-flex vertical>
            <div class="desc">指定</div>
            <div class="select">
                <n-flex>
                    <n-checkbox-group v-model:value="model.select">
                        <n-space item-style="display: flex;">
                            <n-checkbox v-for="item in interval2Arr(model.from, model.to)" :value="item.val"
                                :label="item.lab" />
                        </n-space>
                    </n-checkbox-group>
                </n-flex>
            </div>
        </n-flex>
    </template>

</template>
<style scoped>
.desc {
    font-weight: bold;
}

.input {
    width: 90px;
}

.select {
    width: 350px;
}
</style>