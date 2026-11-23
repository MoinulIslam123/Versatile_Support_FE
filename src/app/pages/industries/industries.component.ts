import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.css',
})
export class IndustriesComponent {
  private data = inject(SiteDataService);
  get industries() { return this.data.industries(); }
}
