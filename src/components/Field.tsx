import React, { useEffect, useState } from 'react';
import { EditorToolbarButton } from '@contentful/forma-36-react-components';
import tokens from '@contentful/forma-36-tokens';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { v4 as uuid } from 'uuid';

import { Button, Table, FormControl, TextInput, Select } from "@contentful/f36-components";

import { PlusCircleIcon } from "@contentful/f36-icons";
import Age from './criteria/Age';

interface FieldProps {
    sdk: FieldExtensionSDK;
}

/** An Item which represents an list item of the repeater app */
interface Item {
    id: string;
    key: string;
    value: string;
}

/** A simple utility function to create a 'blank' item
 * @returns A blank `Item` with a uuid
*/
function createItem(): Item {
    return {
        id: uuid(),
        key: '',
        value: '',
    };
}

/** The Field component is the Repeater App which shows up 
 * in the Contentful field.
 * 
 * The Field expects and uses a `Contentful JSON field`
 */
const Field = (props: FieldProps) => {
    const { valueName = 'Value' } = props.sdk.parameters.instance as any;
    const [items, setItems] = useState<Item[]>([]);
    const [currentSel, setCurrentSel] = useState<String>('');

    useEffect(() => {
        // This ensures our app has enough space to render
        props.sdk.window.startAutoResizer();

        // Every time we change the value on the field, we update internal state
        props.sdk.field.onValueChanged((value: Item[]) => {
            if (Array.isArray(value)) {
                setItems(value);
            }
        });
    });
    


    /** Adds another item to the list */
    const addNewItem = () => {
        props.sdk.field.setValue([...items, createItem()]);
    };
    const iselected = (criteria:String): boolean => {

        return (currentSel===criteria)?true:false;
    
    }
    /** Creates an `onChange` handler for an item based on its `property`
     * @returns A function which takes an `onChange` event 
    */
    const createOnChangeSelectHandler = (item: Item, property: 'key' | 'value') => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const itemList = items.concat();
        const index = itemList.findIndex((i) => i.id === item.id);

        itemList.splice(index, 1, { ...item, [property]: e.target.value });
        setCurrentSel(e.target.value);
        props.sdk.field.setValue(itemList);
    };
    /** Creates an `onChange` handler for an item based on its `property`
     * @returns A function which takes an `onChange` event 
    */
     const createOnChangeHandler = (item: Item, property: 'key' | 'value') => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const itemList = items.concat();
        const index = itemList.findIndex((i) => i.id === item.id);

        itemList.splice(index, 1, { ...item, [property]: e.target.value });

        props.sdk.field.setValue(itemList);
    };
    /** Deletes an item from the list */
    const deleteItem = (item: Item) => {
        props.sdk.field.setValue(items.filter((i) => i.id !== item.id));
    };
    const dataChange=( ftype: String, value:any = null ) => {
        console.log(ftype, value);
    };
    return (
        <div>
            <Table>                
                    {items.map((item) => (
                        <Table.Body>
                        <Table.Row key={item.id}>
                            <Table.Cell>
                            {/* 
                                <FormControl id="key">
                                    
                                    <TextInput name="key" value={item.key} onChange={createOnChangeHandler(item, 'key')} />
                                </FormControl>
                             */}
                             <FormControl id="key">
                             <FormControl.Label>Type de critère</FormControl.Label>
                            <Select
                                id="key"
                                name="key"
                                value={item.key}
                                defaultValue="null"
                                onChange={createOnChangeSelectHandler(item, 'key')}
                                >
                                <Select.Option value="null" >Sélectionnez</Select.Option>
                                <Select.Option value="age">Age</Select.Option>
                                <Select.Option value="skin">Type de peau</Select.Option>
                                <Select.Option value="barber-frequency">Fréquence rasage de barbe</Select.Option>
                                <Select.Option value="makup-frequency">Fréquence maquillage</Select.Option>
                                <Select.Option value="sun-frequency">Fréquence exposition soleil</Select.Option>
                                <Select.Option value="sun-skin">Type de peau au soleil</Select.Option>
                                <Select.Option value="face-zone">Zone d'application visage</Select.Option>
                                <Select.Option value="skin-problem">Problème de peau</Select.Option>
                                <Select.Option value="stain-cause">Raisons des tâches</Select.Option>
                                <Select.Option value="button-type">Types de boutons</Select.Option>
                                <Select.Option value="current-treatment">Traitement actuel</Select.Option>
                                <Select.Option value="texturer">Texture </Select.Option>
                                <Select.Option value="smell">Odeur à éviter</Select.Option>
                                </Select></FormControl>
                            </Table.Cell>
                            <Table.Cell>
                                <FormControl id="value">
                                    <FormControl.Label>{valueName}</FormControl.Label>
                                    <TextInput
                                        name="value"
                                        value={item.value}
                                        onChange={createOnChangeHandler(item, 'value')}
                                        size="small" />
                                </FormControl>
                            </Table.Cell>
                            <Table.Cell align="right">
                                <EditorToolbarButton
                                    label="Suppr."
                                    icon="Delete"
                                    onClick={() => deleteItem(item)}
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row id="age" hidden={!iselected('age')}>
                            <Table.Cell>
                                <FormControl >
                                        <FormControl.Label>Age ({currentSel})</FormControl.Label>
                                </FormControl>
                            </Table.Cell>
                            <Table.Cell>   
                                <Age title="hopla" onTextChange={dataChange} /> 
                            </Table.Cell>                            
                            </Table.Row>
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
