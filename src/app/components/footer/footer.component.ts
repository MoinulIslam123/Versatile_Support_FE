import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../core/site-data.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private data = inject(SiteDataService);
  get nav() { return this.data.nav(); }
  get site() { return this.data.site(); }
  year = new Date().getFullYear();
  get categories() { return this.data.businessCategories().map(c => c.title); }

  toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
