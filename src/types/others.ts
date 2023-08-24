export interface ObjectType {
    [key: string]: string | number | undefined | ObjectType | ObjectType[]
}