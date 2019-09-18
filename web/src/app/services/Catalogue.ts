import Input from './Input';
import Combo from './Combo';
import Tags from './Tags';

export interface Catalogue {
    cName:string;
    lstInputs:Input[];
    lstCombos:Combo[];
    oTags:Tags;
}

export default Catalogue;