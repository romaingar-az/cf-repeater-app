import React, { Component } from "react";
//import { isTemplateExpression } from "typescript";


import {ObjComponent,AnyObject} from './itemTypes'
import EvaluationComponent from "./criteria/Evaluation";
import BooleanComponent from "./criteria/Boolean";



class DynamicComponent extends Component<ObjComponent, {}> {
  components: AnyObject = {
    evaluation:EvaluationComponent,
    'switch-boolean':BooleanComponent,
  };

  render() {
    const TagName = this.components[this.props.data.type as keyof AnyObject];
    if (!TagName) {
      return (
        <div className="alert alert-warning" role="alert">
          Unknown component type '{this.props.type}'.
        </div>
      );
    }
    return <TagName  {...this.props} />;
    
  }
}

export default DynamicComponent;
