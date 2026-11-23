import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { SiteDataService } from '../../core/site-data.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent, SectionHeadingComponent, IconComponent, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private data = inject(SiteDataService);

  get categories() { return this.data.businessCategories(); }
  get marquee() { return [...this.categories, ...this.categories]; }
  reasons = [
    'Quality-Focused Products and Services',
    'Competitive Pricing',
    'Wholesale & Retail Solutions',
    'Customized Orders',
    'Professional Customer Support',
    'Commitment to Customer Satisfaction',
  ];
}
