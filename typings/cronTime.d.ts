export type TimeItemWildType = {
    type: "wild"
    desc: string
}

export type TimeItemNoSelectType = {
    type: "noSelect"
}

export type TimeItemCycleType = {
    type: "cycle"
    from: number
    to: number
    desc: string
    cell: string
    min: number
    max: number
}

export type TimeItemIntervalType = {
    type: "interval"
    start: number
    interval: number
    cell: string
    min: number
    max: number
}

export type TimeItemSelectType = {
    type: "select",
    from: number
    to: number
    select: number[]
}

export type TimeItemLastType = {
    type: "last"
}

export type TimeItemType = TimeItemWildType | TimeItemNoSelectType | TimeItemCycleType | TimeItemIntervalType | TimeItemSelectType | TimeItemLastType

export type TimeItemTypeType = TimeItemType['type']