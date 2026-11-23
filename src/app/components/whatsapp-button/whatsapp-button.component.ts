import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css',
})
export class WhatsappButtonComponent {
  private data = inject(SiteDataService);
  get link() { return this.data.site().whatsappLink; }
}
