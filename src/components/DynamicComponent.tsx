import React, { Component } from "react";
import AgeComponent from "./criteria/Age";
import PeauComponent from "./criteria/Peau";
import {ItemValues} from './itemTypes'

export type  ObjComponent = {
    type: string;
    data: DataObject;
    onChange?:(ftype: string, id: string, values: ItemValues) => void;
};
type DataObject = {
    title?: string;
    text: string;
    values: AnyObject
};

type AnyObject = {
  [key: string]: any;
};

class DynamicComponent extends Component<ObjComponent, {}> {
  components: AnyObject = {
    age: AgeComponent,
    peau: PeauComponent
  };

  render() {
    const TagName = this.components[this.props.type as keyof AnyObject];
    if (!TagName) {
      return (
        <div className="alert alert-warning" role="alert">
          Unknown component type '{this.props.type}'.
        </div>
      );
    }
    return <TagName {...this.props} />;
  }
}

export default DynamicComponent;
