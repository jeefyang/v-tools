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