import { Component } from '@angular/core';

@Component({
    selector: 'app-headings',
    template: `
        <section>
            <h1>H1 Encabezado principal</h1>
            <h2>H2 Subencabezado</h2>
            <h3>H3 Sección</h3>
            <h4>H4 Subsección</h4>
            <h5>H5 Título pequeño</h5>
            <h6>H6 Nota Meta</h6>
        </section>
    `
})
export class HeadingsComponent { }