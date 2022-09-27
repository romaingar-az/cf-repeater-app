//import { RatingEditor } from '@contentful/field-editor-rating';

import {  FormControl, TextInput, Table, TableHead, TableRow, TableCell, TableBody } from "@contentful/f36-components";
//import { useDebugValue } from "react";


interface AgeProps {
    title: string;
    onTextChange: (ftype: string, value:string) => void;
  }
//const rating = TextInput;
const Age = (props: AgeProps) => {
    return (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Moins de 18 ans</TableCell>
                <TableCell>18 à 29 ans</TableCell>
                <TableCell>30 à 44 ans</TableCell>
                <TableCell>45 à 59 ans</TableCell>
                <TableCell>60 à 74 ans</TableCell>
                <TableCell>75 à 89 ans</TableCell>
                <TableCell>+ 90 ans</TableCell>
                <TableCell>Je préfère ne pas en parler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="Moins de 18 ans" onChange={(e) => props.onTextChange('age', e.target.value)} />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="18 à 29 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="30 à 44 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="45 à 59 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="60 à 74 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="75 à 89 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="+ 90 ans" />
          </FormControl>
          </TableCell>
          <TableCell>
            <FormControl >
              <TextInput  id="rating" css="number" size="small" name="Je préfère ne pas en parler" />
          </FormControl>
          </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
        </>
      );
  }

export default Age