// 分类相关的数据ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 分类ts类型
export interface CategoryOjb {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

// 相应的分类接口返回数据的类型
export interface CategoryResponseDate extends ResponseData {
    data: CategoryOjb[]
}