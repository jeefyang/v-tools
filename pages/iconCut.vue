<script setup lang="ts">
import { NButton, NColorPicker, NText, NInputNumber, NFlex, NInput } from "naive-ui"

const displayRef = ref<HTMLDivElement>()
const fileName = ref<string>("")
const corner = ref<number>(28.064)
const backColor = ref<string>("#ffffff")
const imgRatio = ref<number>(1)
const svgWidth = ref<number>(200)
const svgHeight = ref<number>(200)
const imgWidth = ref<number>(200)
const imgHeight = ref<number>(200)
const imgDeltaX = ref<number>(0)
const imgDeltaY = ref<number>(0)
const b64 = ref<string>("")

const onupload = async () => {
    let files = await readLocalFile()
    fileName.value = files[0].name
    b64.value = await decodeFile(files[0], "base64")
    let img = new Image()
    img.onload = () => {
        svgWidth.value = imgWidth.value = img.width
        svgHeight.value = imgHeight.value = img.height
    }
    img.src = b64.value
}

const ondowload = async () => {
    const svg = (displayRef?.value?.children[0]) as SVGElement
    let base64 = await svg2B64(svg, svgWidth.value, svgHeight.value)
    saveBase64File(base64, fileName.value)
}


</script>
<template>
    <n-flex vertical class="upload">
        <n-flex>

            <n-button @click="onupload">上传</n-button>
            <n-button @click="ondowload">下载</n-button>
        </n-flex>

        <n-flex>
            <n-text>文件名:</n-text>
            <n-input v-model:value="fileName" type="text" size="large" style="width:300px;" />
        </n-flex>

        <n-flex>
            <n-text>圆角:</n-text>
            <n-input-number v-model:value="corner" />
        </n-flex>
        <n-flex>
            <n-text>图片比例:</n-text>
            <n-input-number v-model:value="imgRatio" :precision="2" :step="0.05" />
        </n-flex>
        <n-flex>
            <n-text>图片偏移X:</n-text>
            <n-input-number v-model:value="imgDeltaX" />
        </n-flex>
        <n-flex>
            <n-text>图片偏移Y:</n-text>
            <n-input-number v-model:value="imgDeltaY" />
        </n-flex>

        <n-color-picker v-model:value="backColor" show-alpha size="large" style="width: 300px;" />


    </n-flex>
    <div class="display" ref="displayRef">
        <svg :width="svgWidth" :height="svgHeight" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="clip">
                    <rect :width="svgWidth" :height="svgHeight" x="0" y="0" :rx="corner" :ry="corner"></rect>
                </clipPath>
            </defs>
            <g clip-path="url(#clip)">
                <rect :width="svgWidth" :height="svgHeight" x="0" y="0" :fill="backColor"></rect>
                <image :width="imgRatio * imgWidth" :height="imgRatio * imgHeight" :href="b64"
                    :x="((1 - imgRatio) / 2 * imgWidth) + imgDeltaX"
                    :y="((1 - imgRatio) / 2 * imgHeight) + imgDeltaY" />

            </g>
        </svg>
    </div>
</template>
<style scoped>
.display {
    margin: 10px;
}
</style>