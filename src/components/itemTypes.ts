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
export interface DataValidation {
    min?:number;
    max?:number;
}
export interface  ObjComponent  {
    type: string;
    data: DataObject;
    onChange?:(ftype: string, id: string, value: string) => void;
    values?: ItemValues;
};
type DataObject = {
    title?: string;
    type:string;
    text: string;
    values: AnyObject
};

export interface AnyObject {
  [key: string]: any;
};