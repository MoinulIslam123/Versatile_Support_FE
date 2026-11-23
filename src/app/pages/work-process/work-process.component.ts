import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-work-process',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './work-process.component.html',
  styleUrl: './work-process.component.css',
})
export class WorkProcessComponent {
  private data = inject(SiteDataService);
  get steps() { return this.data.process(); }
}
