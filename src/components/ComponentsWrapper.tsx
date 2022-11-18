import { useEffect, useState } from 'react';
import { Table,SectionHeading} from "@contentful/f36-components";
import DynamicComponent from "./DynamicComponent";
import {ItemValue,ObjComponent} from './itemTypes'
// type State = {
//     components: DynamicComponentProps[];
//   };
type AppProps  = {
    criteria: string;
    itemId: string;
    values: any;
    onChange:(id:string,ftype:string,item: ItemValue,itemId:string) => void;
};
interface EnumValuesProps {
    label: string; key: any
  }

const criteriaComponents = [
    {
        type: "age",
        data: {
            type:"evaluation",
            title: "Age",
            text: "Quel est votre âge ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "1-18", label: "Moins de 18 ans" },
                { key: "18-29", label: "18 à 29 ans" },
                { key: "30-44", label: "30 à 44 ans" },
                { key: "45-59", label: "45 à 59 ans" },
                { key: "60-74", label: "60 à 74 ans" },
                { key: "75-89", label: "75 à 89 ans" },
                { key: "90", label: "+ 90 ans" },
                { key: "0", label: "Je préfère ne pas en parler" }
            ],
        validation: {
            min:1,
            max:5
        }
        }
    },
    {
        type:"pregnant",
        data: {
            type:"evaluation",
            title:"",
            text:"Etes-vous enceinte ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "true", label: "Oui" },
                { key: "false", label: "Non" }
            ]
        }
    },
    {
        type: "skin",
        data: {
            type:"evaluation",
            title: "Type de peau",
            text: "Votre peau est :",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "seche", label: "Sèche" },
                { key: "deshydrate", label: "Déshydratée" },
                { key: "normal", label: "Normale" },
                { key: "grasse", label: "Grasse" },
                { key: "mixte", label: "Mixte" },
                { key: "sensible", label: "Sensible & Réactive" }
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"barber-frequency",
        data:{
            type:"evaluation",
            title:"",
            text:"Vous rasez-vous la barbe ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"daily", label:"Quotidiennement au rasoir - rasage à blanc"},
                { key:"sometime", label:"Occasionnellement - barbe de 5 jours"},
            	{ key:"rarely", label:"Rarement - Je la taille à la tondeuse"},
                { key:"never", label:"Je n'en ai pas besoin - pas de barbe"}
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"makeup",
        data: {            
            type:"evaluation",
            title:"Maquillage",
            text:"Vous maquillez-vous ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "true", label: "Oui" },
                { key: "false", label: "Non" }
            ]
        }
    },
    {
        type:"makeup-frequency",
        data:{
            type:"evaluation",
            title:"",
            text:"À quelle fréquence (vous maquillez-vous ?)",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"daily", label:"Quotidiennement"},
                { key:"sometime", label:"Occasionnellement"},
            	{ key:"regularly", label:"Régulièrement"}
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"sun-frequency",
        data:{
            type:"evaluation",
            title:"Soleil",
            text:"À quelle fréquence êtes-vous exposé.e au soleil 🌞 ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"daily", label:"Quotidiennement"},
                { key:"sometime", label:"Occasionnellement"},
            	{ key:"rarely", label:"Rarement"}
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"sun-skin",
        data:{
            type:"evaluation",
            title:"",
            text:"Tout le monde est concerné mais nous ne sommes pas tous égaux face au soleil. Comment qualifieriez-vous votre peau ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"black-skin", label:"Peau très foncée à noire, ne brûle jamais au soleil."},
                { key:"mat-skin", label:"Peau très mate, brûle très rarement au soleil avec un bronzage intense."},
                { key:"mat-clear-skin", label:"Peau mate, brule parfois et bronze très bien."},
                { key:"clear-skin", label:"Peau claire, brûle assez vite et bronze facilement."},
                { key:"cleary-skin", label:"Peau claire, brûle vite et bronze lentement."},
                { key:"white-skin", label:"Peau très claire avec tâches de rousseurs, brûle très vite et ne bronze pas."}
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"face-zone",
        data:{
            type:"evaluation",
            title:"",
            text:"Sélectionnez jusqu'à 3 zones du visage que vous souhaitez traiter particulièrement ? (ajouter un schéma)",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"forehead", label:"Front"},	
                { key:"eye-contour", label:"Contour des yeux"},
                { key:"nose", label:"Nez"},
                { key:"cheeks", label:"Joues"},	
                { key:"lips", label:"Lèvres"},	
                { key:"chin", label:"Menton"},	
                { key:"oval", label:"Ovale du visage"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"skin-problem",
        data:{
            type:"evaluation",
            title:"",
            text:"Parmi ces préoccupations, choisissez-en jusqu'à 3 qui vous importent le plus.",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"wrinkles", label:"Rides/Ridules"},
                { key:"dark-circles", label:"Cernes, poches"},	
                { key:"shine", label:"Brillance (peau grasse)"},
                { key:"acne", label:"Acné, boutons"},	
                { key:"dull-complexion", label:"Manque d'éclat, teint terne"},	
                { key:"dull skin", label:"Peau atone"},
                { key:"black-spots", label:"Points noirs	"},
                { key:"brown-stains", label:"Tâches brunes"},	
                { key:"redness", label:"Rougeurs"},	
                { key:"imperfections", label:"Imperfections"},	
                { key:"irritations", label:"Irritations"},
                { key:"scars", label:"Tâches brunes (cicatrices, marques solaires)"},	
                { key:"chapped-lips", label:"Lèvres gercées"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },    
    {
        type:"stain-cause",
        data:{
            type:"evaluation",
            title:"",
            text:"Quelle est selon vous la cause de vos tâches ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"old-wounds", label:"D'anciennes petites blessures"},	
                { key:"acne", label:"L'acné	"},
                { key:"sun", label:"Le soleil"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"button-type",
        data:{
            type:"evaluation",
            title:"",
            text:"En ce qui concerne vos boutons, à quoi ressemblent-ils ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"red-pimples-group", label:"Groupes de petits boutons rouges	"},	
                { key:"big-red-pimples", label:"Gros boutons rouges"},		
                { key:"white-pimples", label:"Boutons blancs (Forme de bosse)"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"current-treatment",
        data:{
            type:"evaluation",
            title:"",
            text:"Quel est votre traitement actuel ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"anti-acne-ointments", label:"Pommades anti-acné (Parapharmacie)"},	
                { key:"contraceptive-pill", label:"Pilule contraceptive"},	
                { key:"roaccutane", label:"Traitement au Roaccutane"},	
                { key:"anti-inflammatory-ointments", label:"Pommades anti-inflammatoires (type cortisone)"},	
                { key:"antibiotics", label:"Traitement par antibiotiques (type Doxycycline)"},	
                { key:"no-treatment", label:"Aucun traitement"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },    
    {
        type:"solar-filter",
        data: {
            type:"evaluation",
            title:"	",
            text:"Utilisez-vous un filtre solaire et/ou une crème hydratante au quotidien ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "true", label: "Oui" },
                { key: "false", label: "Non" }
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"texturer",
        data:{
            type:"evaluation",
            title:"",
            text:"En général, vous préférez une texture de ...",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"gel", label:"Gel"},
                { key:"oil", label:"Huile"},
                { key:"serum", label:"Serum"},
                { key:"baume", label:"Baume"},
                { key:"cream", label:"Crème"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },{
        type:"smell",
        data: {
            type:"evaluation",
            title:"",
            text:"Il y-a-il une odeur que souhaiteriez éviter ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key: "true", label: "Oui, voir la liste" },
                { key: "false", label: "Non" }
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"specific-smell",
        data:{
            type:"evaluation",
            title:"Odeur",
            text:"Quelle odeur souhaitez-vous éviter ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"rose", label:"Rose"},
                { key:"lavande", label:"Lavande"},
                { key:"jasmine", label:"Jasmin"},
                { key:"vanillia", label:"Vanille"},
                { key:"verbena", label:"Verveine"},
                { key:"grapefruit", label:"Pamplemousse"},
                { key:"lemon", label:"Citron"},
                { key:"peach", label:"Pêche"},
                { key:"fig", label:"Figue"},
                { key:"olive-oil", label:"Huile d'olive"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },{
        type:"cosmetics-reactions",
        priority:100,
        defaultValue:"3",
        data: {
            type:"evaluation",
            title:"",
            text:"Avez-vous déjà mal réagi face à des produits cosmétiques ?",
            values:[
                { key: "true", label: "Oui" },
                { key: "false", label: "Non" }
            ],
            validation: {
                min:1,
                max:5
            }
        }
    },{
        type:"product-reactions",
        data:{
            type:"evaluation",
            title:"",
            text:"A quel type de produit ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"active", label:"Un principe actif"},
                { key:"essential-oil", label:"Une huile essentielle"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"diy-recipe",
        data:{
            type:"evaluation",
            title:"",
            text:"Etes vous pret à réaliser une ou plusieurs recette beauté maison adaptées à votre peau ?",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"yes-recipe", label:"Oui, totalement"},
                { key:"easy-recipe", label:"Oui, mais uniquement des recettes faciles et rapides"},
                { key:"only-products", label:"Non, je souhaite qu'on me propose uniquement des produits prêts à l'emploi"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    },
    {
        type:"precautions",
        data:{
            type:"evaluation",
            title:"En savoir plus ?",
            text:"",
            priority:100,
            defaultValue:"3",
            values: [
                { key:"pregnant-precautions", label:"Sur les précautions à prendre en cosmétique lors de la grossesse ?"},
                { key:"sun-precautions", label:"Les précautions à prendre liés au soleil"}
           ],
            validation: {
                min:1,
                max:5
            }
        }
    }

];


const ComponentsWrapper = ({criteria, itemId, onChange, values}: AppProps) => {
    //   state = {
    //     components: [],
    //     currentComponent:{}
    //   };
    const [component, setComponent] = useState<ObjComponent>();

    //   componentDidMount() {
    //     this.getComponents();
    //   };
    useState(() => {
        //console.log('New component ',criteria,values);
        let currentComponent: ObjComponent | undefined = criteriaComponents.find((obj: ObjComponent) => obj.type === criteria);
        if(currentComponent && currentComponent.data.values) {
           
            let result = currentComponent.data.values.filter((o1:ItemValue) => !values.some((o2:ItemValue) => o1.key === o2.key));
            if(result.length){
               
               result.forEach((res:EnumValuesProps) => {
                var item:ItemValue = {
                    key:res.key,
                    value: (currentComponent &&  currentComponent.data.defaultValue)?currentComponent.data.defaultValue:0
                };
                if(currentComponent){
                    let idcomp=currentComponent.data.values.findIndex((val:ItemValue)=>val.key===item.key);
                    console.log('set value for ',idcomp,criteria,item,itemId); 
                    onChange(idcomp,currentComponent.type,item,itemId);
                }
              });
            }
            
        }
        

    });
    const onChangeComponent = (ftype: string, id: string, newvalue: string) => {
        // console.log('On Change :');
        // console.table({
        //     "idcomp":id,
        //     "ftype":ftype,
        //     "newvalue":newvalue,
        //     "itemId":itemId
        // });
        var idcomp=id;
        const curCriteria = criteriaComponents.find((crit)=>crit.type===ftype);
        var item:ItemValue = {
            key:id,
            value: newvalue
        };
        if(curCriteria && curCriteria.data.type!=="boolean"){
            const repid =id.split('_');
            item = {
                key:repid[0],
                value: newvalue
            } 
            idcomp=repid[1];
        }        
        onChange(idcomp,ftype,item,itemId);
    }
    useEffect(() => {
        let currentComponent: ObjComponent | undefined = criteriaComponents.find((obj: ObjComponent) => obj.type === criteria);
        if(currentComponent!==undefined) {
            //console.log('set currrent ',currentComponent.type)
            setComponent(currentComponent);
        }           
        
    }, [criteria]);


    //   getComponents()  {

    //     this.setState({ components: criteriaComponents });
    //   }
    if (component !== undefined) {
        component.onChange=onChangeComponent;

        return (
            // const { components } = this.state;

            //     if (currentComponentData === undefined) {
            //         //throw new TypeError('The value was promised to always be there! >> '+ this.props.criteria);
            //         console.log('The value was promised to always be there! >> '+ this.props.criteria);
            //         currentComponentData=components[0];
            //     }
            //    return (
            <Table.Row id={component.type}>
                 {/* <Form onSubmit={submitForm}> */}
                {/* <Table.Cell>
                    <FormControl >
                        <FormControl.Label>{component?.data.title}</FormControl.Label>
                    </FormControl>
                </Table.Cell> */}
                <Table.Cell colSpan={3}>
                    <SectionHeading>{component.data.text}</SectionHeading>
                    <DynamicComponent  {...component} values={values}/>
                </Table.Cell>
                {/* </Form> */}
            </Table.Row>
        );

    }
    return <></>;

}

export default ComponentsWrapper;
