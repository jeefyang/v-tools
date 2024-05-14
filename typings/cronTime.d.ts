export type TimeItemWildType = {
    type: "wild"
}

export type TimeItemNoSelectType = {
    type: "noSelect"
}

export type TimeItemCycleType = {
    type: "cycle"
    from: number
    to: number
}

export type TimeItemIntervalType = {
    type: "interval"
    start: number
    interval: number
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

export type TimeItemType=TimeItemWildType|TimeItemNoSelectType|TimeItemCycleType|TimeItemIntervalType|TimeItemSelectType|TimeItemLastType