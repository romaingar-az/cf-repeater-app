/** An Item which represents an list item of the repeater app */
export interface Item {
    id: string;
    key: string;
    values: ItemValues ;
}
export interface ItemValues extends Array<ItemValue>{}
export interface ItemValue {
    key: string;
    value: string;
}