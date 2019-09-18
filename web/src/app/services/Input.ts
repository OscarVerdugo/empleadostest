import { Type } from '@angular/compiler';

export interface Input{
    name:string;
    type:string;
    label:string;
    pipe:any;
    pipeProps:string;
}

export default Input;