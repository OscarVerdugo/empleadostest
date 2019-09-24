import Input from './Input';
import Combo from './Combo';
import Tags from './Tags';

export interface Form {
    cName:string;
    lstInputs:Input[];
    lstCombos:Combo[];
    cIcon:string;
    oTags:Tags;
    bAdmin:boolean;
    iBuscable:number;
}

export default Form;