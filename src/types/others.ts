export interface ObjectType {
    [key: string]: string | number | boolean | undefined | ObjectType | ObjectType[]
}