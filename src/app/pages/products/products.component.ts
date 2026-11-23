import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicCategory } from '../../core/api.service';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

const EMPTY: PublicCategory = { id: '', letter: '', icon: 'package', title: '', items: [] };

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private data = inject(SiteDataService);

  products = this.data.products;
  active = signal<string | number | null>(null);

  // the first tab is shown until a visitor clicks another one
  current = computed(() => {
    const list = this.data.products();
    return list.find(p => p.id === this.active()) ?? list[0] ?? EMPTY;
  });
}
