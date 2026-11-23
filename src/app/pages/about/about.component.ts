import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeaderComponent, SectionHeadingComponent, IconComponent, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private data = inject(SiteDataService);
  get values() { return this.data.coreValues(); }
  valueIcons = ['badge-check', 'shield-check', 'heart', 'lightbulb', 'handshake', 'award'];
}
