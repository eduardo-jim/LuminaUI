import { Component, Input, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  path?: string;
  submenu?: MenuItem[];
  isOpen?: boolean;
  isActive?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSlideToggleModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() menuItems: MenuItem[] = [];
  @Input() logo = 'assets/img/logo.svg';
  @Input() logoText = 'Starbucks ®';

  isMenuOpen = false;
  theme: 'light' | 'dark' = 'light';

  private navSub?: Subscription;

  constructor(private router: Router) {
    // demo por defecto
    this.menuItems = [
      { label: 'Home', path: '' },
      {
        label: 'Componentes',
        path: '/components',
        isOpen: false,
        submenu: [{ label: 'Headers', path: '/components/headings' }],
      },
    ];
  }

  // === Ciclo de vida ===
  ngOnInit(): void {
    // marcar activos al cargar y en cada navegación
    this.markActiveByUrl(this.router.url);
    this.navSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.markActiveByUrl(e.urlAfterRedirects || e.url);
        this.closeAllSubmenus();
        this.isMenuOpen = false;
      });
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  // === Acciones Navbar ===
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }

  selectMenu(item: MenuItem, parent?: MenuItem): void {
    // Marca activo manual (si no dependes del RouterLinkActive)
    this.clearActive(this.menuItems);
    item.isActive = true;
    if (parent) parent.isActive = true;

    if (item.submenu?.length) {
      // toggle solo este, cerrar los demás
      this.menuItems.forEach((m) => (m !== item ? (m.isOpen = false) : null));
      item.isOpen = !item.isOpen;
    } else {
      // item “hoja”: cerrar todo
      this.closeAllSubmenus();
      this.isMenuOpen = false;
    }
  }

  /** Click en el trigger del dropdown (padre) */
  toggleSubmenu(index: number, ev: Event): void {
    const item = this.menuItems[index];
    const newState = !item.isOpen;
    this.menuItems.forEach((m, i) => (i === index ? (m.isOpen = newState) : (m.isOpen = false)));

    // ARIA del botón
    const btn = ev.currentTarget as HTMLElement;
    btn.setAttribute('aria-expanded', newState ? 'true' : 'false');
  }

  /** Teclado en el trigger: ESC cierra, ↓ abre y enfoca el primer link */
  onTriggerKeydown(e: KeyboardEvent, index: number): void {
    const item = this.menuItems[index];
    if (e.key === 'Escape') {
      item.isOpen = false;
      (e.target as HTMLElement).setAttribute('aria-expanded', 'false');
      (e.target as HTMLElement).blur();
    }
    if (e.key === 'ArrowDown') {
      item.isOpen = true;
      queueMicrotask(() => {
        const panel = document.getElementById(`submenu-${index}`);
        const first = panel?.querySelector('a') as HTMLElement | null;
        first?.focus();
      });
      e.preventDefault();
    }
  }

  // === Utilidades ===
  private closeAllSubmenus(): void {
    this.menuItems.forEach((m) => (m.isOpen = false));
  }

  private clearActive(items: MenuItem[]): void {
    for (const it of items) {
      it.isActive = false;
      if (it.submenu) this.clearActive(it.submenu);
    }
  }

  private markActiveByUrl(url: string): void {
    // Limpia
    this.clearActive(this.menuItems);

    const mark = (items: MenuItem[], parent?: MenuItem) => {
      for (const it of items) {
        // Coincidencia exacta o prefix si es padre con submenu
        const match =
          it.path &&
          (url === it.path ||
            (it.path !== '/' && url.startsWith(it.path + '/') && !!it.submenu?.length));

        if (match) {
          it.isActive = true;
          if (parent) parent.isActive = true;
        }
        if (it.submenu) mark(it.submenu, it);
      }
    };
    mark(this.menuItems);
  }

  // === Cierres globales ===
  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.nav-item')) this.closeAllSubmenus();
  }

  @HostListener('document:keydown', ['$event'])
  onDocKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.closeAllSubmenus();
  }
}
