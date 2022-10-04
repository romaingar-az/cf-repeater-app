//import { RatingEditor } from '@contentful/field-editor-rating';

import { FormControl, TextInput, Table, TableHead, TableRow, TableCell, TableBody } from "@contentful/f36-components";
//import { useDebugValue } from "react";


interface AgeProps {
  data: {
    title: string;
    text: string;
    values: EnumValuesProps;
  };  
  onChange: (ftype: string, id: string, value: string) => void;
}
interface EnumValuesProps {
  label: string; key: any
}

interface EnumValuesProps extends Array<EnumValuesProps> { }

//const rating = TextInput;
const Age = (props: AgeProps) => {
  return (
    <>
      {props.data.title}
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
              return <TableCell>
              <FormControl >
                <TextInput id="{item.key}_{index}" css="number" size="small" name="{item.label}" onChange={(e) => props.onChange('age',e.target.id, e.target.value)} />
              </FormControl>
            </TableCell>;
            })}
            </TableRow>
        </TableBody>
      </Table>

    </>
  );
}

export default Age