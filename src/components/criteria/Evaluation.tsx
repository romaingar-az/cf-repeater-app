//import { RatingEditor } from '@contentful/field-editor-rating';

import { FormControl, TextInput, Table, TableHead, TableRow, TableCell, TableBody } from "@contentful/f36-components";
//import { useState } from "react";
import { ItemValues,DataValidation } from "../itemTypes";
//import { useDebugValue } from "react";


interface EvaluationProps {
  type:string;
  data: {
    title: string;
    type:string;
    text: string;
    values: EnumValuesProps;
    validation?: DataValidation;
  };  
  onChange: (ftype: string, id: string, value: string) => void;
  values?:ItemValues;
}
interface EnumValuesProps {
  label: string; key: any
}

interface EnumValuesProps extends Array<EnumValuesProps> { }
// const isValid = () => {
//   return true;
// }
//const rating = TextInput;
const Evaluation = (props: EvaluationProps) => {
  // useState(()=>{
  //   console.log('Age charged : ',props)
  // })
  var min=0;
  var max=100;
  
  if(props.data.validation && props.data.validation.min) {
    min = props.data.validation.min;
  }
  if(props.data.validation && props.data.validation.max) {
    max = props.data.validation.max;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {props.data.values.map((item) => {
              return <TableCell>{item.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {props.data.values.map((item, index) => {
            let inputvalue:string = "3";//valeur par défaut
            if(props.values){
              const idxvalues:number = props.values.findIndex((i) => i.key === item.key);
              if(idxvalues>=0){
                inputvalue = props.values[idxvalues].value;
              }
            }            
              return <TableCell>
              <FormControl >
                <TextInput id={`${item.key}_${index}`} css="number" size="small" name={item.label} value={inputvalue}  onChange={(e) => props.onChange(props.type,e.target.id, e.target.value)} type="number" min={min} max={max} />
              </FormControl>
            </TableCell>;
            })}
            </TableRow>
        </TableBody>
      </Table>

    </>
  );
}

export default Evaluation