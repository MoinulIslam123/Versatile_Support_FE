import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  private data = inject(SiteDataService);
  get items() { return this.data.gallery(); }
}
