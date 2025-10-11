import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
interface MenuItem {
  label: string;
  path?: string;
  submenu?: MenuItem[];
  isOpen?: boolean;
  isActive?: boolean; // <-- estado activo explícito
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSlideToggleModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  @Input() menuItems: MenuItem[] = [];
  @Input() logo: string = 'assets/img/logo.svg';
  @Input() logoText: string = 'Starbucks ®';

 theme: 'light' | 'dark' = 'light';


  constructor(private router: Router) {
    this.menuItems = [
      { label: 'Home', path: '', isActive: false },
      {
      label: 'Practicas', path: '/practices', isActive: false, isOpen: false,
      submenu: [
        { label: 'Numéros pares e ímpares', path: '/practices/par-impar' }
      ]
    }];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenu(item: MenuItem, parent?: MenuItem) {
    // Primero, desactivar todos los items
    this.menuItems.forEach(i => {
      i.isActive = false;
      if (i.submenu) i.submenu.forEach(s => s.isActive = false);
    });

    if (parent) {
      // Click en un hijo
      parent.isActive = true; // padre activo
      item.isActive = true;   // hijo activo
    } else {
      // Click en padre
      item.isActive = true;
    }

    // Manejo de submenú
    if (item.submenu) {
      this.menuItems.forEach(i => {
        if (i !== item) i.isOpen = false;
      });
      item.isOpen = !item.isOpen;
    } else {
      // Cerrar submenús si es item sin submenu
      this.menuItems.forEach(i => i.isOpen = false);
      this.isMenuOpen = false;
    }
  }
  changeTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(`theme-${theme}`);
  }
}
