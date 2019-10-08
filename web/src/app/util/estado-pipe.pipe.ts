import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "estado"
})
export class EstadoPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 0:
        return "Pendiente por jefe";
      case 1:
        return "Pendiente por Personal";
      case 2:
        return "Autorizado";
      case -1:
        return "Rechazado";
        default:
          return "No identificado";
    }
  }
}
