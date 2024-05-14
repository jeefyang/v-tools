export type AppLayoutListType = {
    val: string
    tab: string
    url: string
}

export type AppLayoutModelType = {
    activeVal: string
    list: AppLayoutListType[]
    type: "topside" | "boardside" | "floatside"
}