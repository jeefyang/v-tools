import type { AppLayoutListType } from "~/typings"

export function commonChangeRouter(routerList: AppLayoutListType[], o: { name?: string, path?: string, cb?: (v: AppLayoutListType) => void }, isToRouter?: boolean) {
    let f = o.name ? routerList.find(c => c.val == o.name) : o.path ? routerList.find(c => c.url == o.path) : routerList[0]
    if (!f) {
        f = routerList[0]
    }
    if (o.cb) {
        // activeRouterName.value = f.val
        o.cb(f)
    }
    // 写下跳转的代码
    if (isToRouter) {
        navigateTo(f.url)
    }
}

export async function readLocalFile() {
    return new Promise<File[]>((res) => {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.onchange = (e) => {
            //@ts-ignore
            const files = e.target.files
            res(files)
            fileInput.remove()
        }
        fileInput.click()
    })
}


type DecodeFileType = {
    text: string
    base64: string
    buffer: ArrayBuffer
}


export async function decodeFile<K extends keyof DecodeFileType>(file: File, type: K): Promise<DecodeFileType[K]> {
    return new Promise(res => {
        let reader = new FileReader()
        reader.onload = () => {
            //@ts-ignore
            res(reader.result)
        }
        if (type == "base64") {
            reader.readAsDataURL(file)
        }
        else if (type == "text") {
            reader.readAsText(file)
        }
        else if (type == "buffer") {
            reader.readAsArrayBuffer(file)
        }

    })
}

/**
    * 保存文本文件
    * @param text 文本内容
    * @param fileName 保存的文件名
    */
export function saveStrFile(text: string, fileName: string) {
    var blob = new Blob([text]);
    saveBlobFile(blob, fileName)
}

/**
 * 保存二进制文件
 * @param blob 二进制内容
 * @param fileName 保存的文件名
 */
export function saveBlobFile(blob: Blob, fileName: string) {
    saveBase64File(window.URL.createObjectURL(blob), fileName)
}

/**
 * 保存base64文件
 * @param base64 base64字符串内容
 * @param fileName 保存的文件名
 */
export function saveBase64File(base64: string, fileName: string) {
    let a = document.createElement("a")
    a.href = base64
    a.download = fileName
    a.click()
}

export async function svg2B64(svg: SVGElement, width: number, height: number): Promise<string> {
    return new Promise((res) => {
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        const data = (new XMLSerializer).serializeToString(svg)
        const DOMURL = window.URL || window.webkitURL || window;
        const img = new Image()
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
        const url = DOMURL.createObjectURL(svgBlob)
        img.onload = () => {
            ctx?.drawImage(img, 0, 0)
            DOMURL.revokeObjectURL(url)
            res(canvas.toDataURL('image/png'))
            canvas.remove()
        }
        img.src = url
    })

}