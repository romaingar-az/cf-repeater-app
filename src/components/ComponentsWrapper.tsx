import React, { useEffect, useState } from 'react';
import { Table,Form , FormControl } from "@contentful/f36-components";
import DynamicComponent, { ObjComponent } from "./DynamicComponent";
import {Item,ItemValues} from './itemTypes'
// type State = {
//     components: DynamicComponentProps[];
//   };
type AppProps  = {
    criteria: string;
    itemId: string;
    values: any;
    onChange:(item: Item, property: 'key' | 'values') => void;
};


const criteriaComponents = [
    {
        type: "age",
        data: {
            title: "Age",
            text: "Text",
            values: [
                { key: "1-18", label: "Moins de 18 ans" },
                { key: "18-29", label: "18 à 29 ans" },
                { key: "30-44", label: "30 à 44 ans" },
                { key: "45-59", label: "45 à 59 ans" },
                { key: "60-74", label: "60 à 74 ans" },
                { key: "75-89", label: "75 à 89 ans" },
                { key: "90", label: "+ 90 ans" },
                { key: "0", label: "Je préfère ne pas en parler" }
            ]
        }
    },
    {
        type: "peau",
        data: {
            title: "Type de peau",
            text: "Text",
            values: [
                { key: "seche", label: "Sèche" },
                { key: "deshydrate", label: "Déshydratée" },
                { key: "normal", label: "Normale" },
                { key: "grasse", label: "Grasse" },
                { key: "mixte", label: "Mixte" },
                { key: "sensible", label: "Sensible & Réactive" }
            ]
        }
    }
];


const ComponentsWrapper = ({criteria, itemId, onChange}: AppProps) => {
    //   state = {
    //     components: [],
    //     currentComponent:{}
    //   };
    const [component, setComponent] = useState<ObjComponent>();

    //   componentDidMount() {
    //     this.getComponents();
    //   };
    const onChangeTest = (ftype: string, id: string, values: ItemValues) => {
        console.log('On Change :',ftype,values);
        let item = {
            id: id.replace(ftype+'_',''),
            key: ftype,
            values: values
        }
        onChange(item,'values');
    }
    useEffect(() => {
        let currentComponent: ObjComponent | undefined = criteriaComponents.find((obj: ObjComponent) => obj.type === criteria);
        if(currentComponent!==undefined) {
            console.log('set currrent ',currentComponent.type)
            setComponent(currentComponent);
        }           
        
    }, [criteria]);


    //   getComponents()  {

    //     this.setState({ components: criteriaComponents });
    //   }
    if (component !== undefined) {
        component.onChange=onChangeTest;

        return (
            // const { components } = this.state;

            //     if (currentComponentData === undefined) {
            //         //throw new TypeError('The value was promised to always be there! >> '+ this.props.criteria);
            //         console.log('The value was promised to always be there! >> '+ this.props.criteria);
            //         currentComponentData=components[0];
            //     }
            //    return (
            <Table.Row id={component.type}>
                 <Form onSubmit={submitForm}>
                <Table.Cell>
                    <FormControl >
                        <FormControl.Label>{component?.data.title}</FormControl.Label>
                    </FormControl>
                </Table.Cell>
                <Table.Cell>
                    <DynamicComponent  {...component} />
                </Table.Cell>
                </Form>
            </Table.Row>
        );

    }
    return <></>;

}

export default ComponentsWrapper;
