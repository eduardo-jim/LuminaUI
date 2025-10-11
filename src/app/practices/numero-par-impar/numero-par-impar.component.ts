import { Component } from '@angular/core';

@Component({
  selector: 'app-numero-par-impar',
  templateUrl: './numero-par-impar.component.html',
  styleUrls: ['./numero-par-impar.component.scss']
})
export class NumeroParImparComponent {
  numero: number | null = null;
  resultado: string | null = null;


  onKeyPress(event: any) {
    this.verificar(event.value);
  }

  verificar(numero: any) {
    const num = Number(numero);
    if (isNaN(num)) {
      this.resultado = null;
      return;
    }
    this.resultado = num % 2 === 0 ? 'par' : 'impar';
  }
}