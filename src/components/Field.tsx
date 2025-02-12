import React, { useEffect, useState } from 'react';
//import { EditorToolbarButton } from '@contentful/forma-36-react-components';
import tokens from '@contentful/forma-36-tokens';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { v4 as uuid } from 'uuid';

import { Button, Table, FormControl,  Select ,IconButton } from "@contentful/f36-components";
import { DeleteIcon, PlusCircleIcon } from "@contentful/f36-icons";
import ComponentsWrapper from "./ComponentsWrapper";

import {Item,ItemValues,ItemValue} from './itemTypes'
//import { isArray } from 'util';

interface FieldProps {
    sdk: FieldExtensionSDK;
}


/** A simple utility function to create a 'blank' item
 * @returns A blank `Item` with a uuid
*/
function createItem(): Item {
    return {
        id: uuid(),
        key: '',
        values: [],
    };
}
function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
/** The Field component is the Repeater App which shows up 
 * in the Contentful field.
 * 
 * The Field expects and uses a `Contentful JSON field`
 */
const Field = (props: FieldProps) => {
    //const { criteriaName = 'Critères' } = props.sdk.parameters.instance as any;
    const [items, setItems] = useState<Item[]>([]);
    const [currentSel, setCurrentSel] = useState<string>("select");
    const [currentCriteres,setCurrentCriteres] = useState<string[]>([]);

    useEffect(() => {
        // This ensures our app has enough space to render
        props.sdk.window.startAutoResizer();

        // Every time we change the value on the field, we update internal state
        props.sdk.field.onValueChanged((value: Item[]) => {
            if (Array.isArray(value)) {
                //console.log('OLD values : ',props.sdk.field)
                //console.log('values changed....',value)
                setItems(value);
            }
        });
        if(Array.isArray(props.sdk.field.getValue())) {
            //console.log('Values >>>', props.sdk.field.getValue() );
            props.sdk.field.getValue().forEach((element: Item) => {
                if(props.sdk.entry.fields[element.key]){
                    //console.log(element.key,props.sdk.entry.fields[element.key]);
                    if(!props.sdk.entry.fields[element.key].getValue()) {
                    let vals = Object.entries(element['values']).map(([key, value]) => `${value.key}_${value.value}`);
                    props.sdk.entry.fields[element.key].setValue(vals);
                    console.log("Set value : ",element.key,vals);
                    }
                }
            });
        }else{
        console.log('Values ?', typeof props.sdk.field.getValue() );
        }
    });
    useState(() => {
        if( props.sdk.field.getValue()) {
            const current = props.sdk.field.getValue().map((data:Item)=>data.key);
            setCurrentCriteres(current);
        }
    })


    /** Adds another item to the list */
    const addNewItem = () => {
        props.sdk.field.setValue([...items, createItem()]);
    };

    /** Creates an `onChange` handler for an item based on its `property`
     * @returns A function which takes an `onChange` event 
    */
    const createOnChangeSelectHandler = (item: Item, property: 'key' | 'value') => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const itemList = items.concat();
        const index = itemList.findIndex((i) => i.id === item.id);
        itemList.splice(index, 1, { ...item, [property]: e.target.value });
        const val = e.target.value;
        if(val==='select'){
           setCurrentSel("select");
        }else{
           setCurrentSel(val);  
           currentCriteres.push(val)
           setCurrentCriteres(currentCriteres)
        }
       
        props.sdk.field.setValue(itemList).then((data) => {
            
            console.log('values setted', data); 
          })
          .catch((err) => {
            console.log(err);
          });
    };
    /** Creates an `onChange` handler for an item based on its `property`
     * @returns A function which takes an `onChange` event 
    */
     const createOnChangeHandler = (repid:string, ftype:string, newitemvalue: ItemValue, itemId:string) => {
       // console.log('>>> onChange',itemId, repid, newitemvalue);
       // console.table(items.find((item) => item.id === itemId));
        const itemList = items.concat();
        
        const index = itemList.findIndex((i) => i.id === itemId);

         if(Array.isArray(itemList[index]['values'])) {
             let idxvalue:number = (itemList[index]['values'] as ItemValues).findIndex((j) =>j.key===newitemvalue.key);
             //console.log('Values Index : ',idxvalue);
             if(idxvalue>=0) {                 
             itemList[index]['values'][idxvalue] = newitemvalue;
             }else{
                itemList[index]['values'].push(newitemvalue);
             }
             //console.log('Changed :',index,itemList[index]);

        }
        var realFieldId = ftype.replace('-','_');
        if(props.sdk.entry.fields[realFieldId]){
            //console.log('Fied exist ! ',ftype);
            //console.log(JSON.stringify(itemList[index]['values'][0]));
            let vals = Object.entries(itemList[index]['values']).map(([key, value]) => `${value.key}_${value.value}`);
            //console.log(vals.join(','));
            props.sdk.entry.fields[realFieldId].setValue(vals);
            //props.sdk.entry.fields[ftype].
        }else{
            //console.log('Fied NOT exist ! ',ftype);
        }
         props.sdk.field.setValue(itemList);
    };
    /** Deletes an item from the list */
    const deleteItem = (item: Item) => {
        removeItem(currentCriteres,item.key);
       
        props.sdk.field.setValue(items.filter((i) => i.id !== item.id));
    };
    // const dataChange=( ftype: String, value:any = null ) => {
    //     console.log(ftype, value);
    // };
    return (
        <div>
            <Table>                
                    {items.map((item,idx) => (
                        <Table.Body className={(idx%2)?'odd':''}>
                        <Table.Row key={item.id}>
                            <Table.Cell>
                             <FormControl id="key">
                             <FormControl.Label>Type de critère</FormControl.Label>
                            <Select
                                id="key"
                                name="key"
                                value={item.key}
                                defaultValue="select"
                                onChange={createOnChangeSelectHandler(item, 'key')}
                                >
                                <Select.Option value="select" >Sélectionnez</Select.Option>
                                <Select.Option value="age" hidden={currentCriteres.includes('age')}>Age</Select.Option>
                                <Select.Option value="pregnant" hidden={currentCriteres.includes('pregnant')}>Femme enceinte</Select.Option>
                                <Select.Option value="skin" hidden={currentCriteres.includes('skin')}>Type de peau</Select.Option>
                                <Select.Option value="barber-frequency" hidden={currentCriteres.includes('barber-frequency')}>Fréquence rasage de barbe</Select.Option>
                                <Select.Option value="makeup" hidden={currentCriteres.includes('makeup')}>Maquillage ?</Select.Option>
                                <Select.Option value="makeup-frequency" hidden={currentCriteres.includes('makeup-frequency')}>Fréquence maquillage</Select.Option>
                                <Select.Option value="sun-frequency" hidden={currentCriteres.includes('sun-frequency')}>Fréquence exposition soleil</Select.Option>
                                <Select.Option value="sun-skin" hidden={currentCriteres.includes('sun-skin')}>Type de peau au soleil</Select.Option>
                                <Select.Option value="face-zone" hidden={currentCriteres.includes('face-zone')}>Zone d'application visage</Select.Option>
                                <Select.Option value="skin-problem" hidden={currentCriteres.includes('skin-problem')}>Problème de peau</Select.Option>
                                <Select.Option value="stain-cause" hidden={currentCriteres.includes('stain-cause')}>Raisons des tâches</Select.Option>
                                <Select.Option value="button-type" hidden={currentCriteres.includes('button-type')}>Types de boutons</Select.Option>
                                <Select.Option value="current-treatment" hidden={currentCriteres.includes('current-treatment')}>Traitement actuel</Select.Option>
                                <Select.Option value="solar-filter" hidden={currentCriteres.includes('solar-filter')}>Filtre Solaire ou crème hydratante ? </Select.Option>
                                <Select.Option value="texturer" hidden={currentCriteres.includes('texturer')}>Texture </Select.Option>
                                <Select.Option value="smell" hidden={currentCriteres.includes('smell')}>Odeur à éviter ?</Select.Option>
                                <Select.Option value="specific-smell" hidden={currentCriteres.includes('specific-smell')}>Odeur spécifique à éviter</Select.Option>
                                <Select.Option value="cosmetics-reactions" hidden={currentCriteres.includes('cosmetics-reactions')}>Réactions aux produits cosmétiques ?</Select.Option>
                                <Select.Option value="diy-recipe" hidden={currentCriteres.includes('diy-recipe')}>Réaliser des recettes ?</Select.Option>
                                <Select.Option value="precautions" hidden={currentCriteres.includes('precautions')}>Des précautions spécifiques ?</Select.Option>
                                </Select></FormControl>
                            </Table.Cell>
                            <Table.Cell align="right" >
                            <IconButton aria-label="Suppr."
                                    icon={<DeleteIcon />}
                                    onClick={() => deleteItem(item)} />
                                {/* <EditorToolbarButton
                                    label="Suppr."
                                    icon="Delete"
                                    onClick={() => deleteItem(item)}
                                /> */}
                            </Table.Cell>
                        </Table.Row>
                             <>
                            {(currentCriteres.includes(item.key)) &&
                                    <ComponentsWrapper criteria={item.key} itemId={item.id} onChange={createOnChangeHandler} values={item.values} />
                            }        
                            </>
                        </Table.Body>
                    ))}
            </Table>
            <Button
                variant="transparent"
                onClick={addNewItem}
                startIcon={<PlusCircleIcon />}
                style={{ marginTop: tokens.spacingS }}>
                Ajouter
            </Button>
        </div>
    );
};

export default Field;
