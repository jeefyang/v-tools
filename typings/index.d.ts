export type AppLayoutListType = {
    val: string
    tab: string
    url: string
    title?: string
}

export type AppLayoutModelType = {
    activeVal: string
    list: AppLayoutListType[]
    type: AppLayoutSwitchType
}

export type AppLayoutSwitchType = "topside" | "boardside" | "floatside"

export type FloatDivModelType = {
    left: number
    top: number

}