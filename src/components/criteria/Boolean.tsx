import { useState } from 'react';
import { FormControl, Switch , Table, TableHead, TableRow, TableCell, TableBody, Badge  } from "@contentful/f36-components";
import { ItemValues } from "../itemTypes";


interface BooleanProps {
  type:string;
  data: {
    title: string;
    text: string;
    values: boolean;
  };  
  onChange: (ftype: string, id: string, value: string | boolean) => void;
  values?:ItemValues;
}



const SwitchBoolean = (props: BooleanProps) => {
  const [switchState, setSwitchState] = useState(false);
  useState(() => {
    let propval = false;
    if(props.values && props.values[0] && props.values[0].value!="-1"){
      propval = true;
    }
    setSwitchState(propval)
  })
  const createOnChangeSwitchHandler = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const swval = e.target.checked;
      setSwitchState(swval);
    }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{props.data.title}</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <FormControl >
                <Switch  id="makeup" name="makeup" isChecked={switchState}  onChange={createOnChangeSwitchHandler}>
                {(switchState) && <Badge variant="positive">OUI</Badge> }
                {(!switchState) && <Badge variant="negative">NON</Badge> }
                </Switch>
              </FormControl>
            </TableCell>            
            </TableRow>
        </TableBody>
      </Table>

    </>
  );
}

export default SwitchBoolean