import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css',
})
export class AdminSettingsComponent implements OnInit {
  private api = inject(ApiService);

  fields = [
    { key: 'name', label: 'Company name', area: false },
    { key: 'tagline', label: 'Tagline', area: false },
    { key: 'footerLine', label: 'Footer line', area: false },
    { key: 'mobile', label: 'Mobile number', area: false },
    { key: 'whatsapp', label: 'WhatsApp number (the chat link is built from it)', area: false },
    { key: 'hours', label: 'Business hours (leave empty to hide)', area: false },
    { key: 'interiorsIntro', label: 'Interiors page intro text', area: true },
    { key: 'paperTubeIntro', label: 'Paper tube intro text', area: true },
  ];
  values: Record<string, string> = {};
  message = '';
  error = '';

  ngOnInit() {
    this.api.getSettings().subscribe({
      next: v => (this.values = { ...v }),
      error: () => (this.error = 'Could not load data. Is the API running?'),
    });
  }

  save() {
    this.message = this.error = '';
    forkJoin(this.fields.map(f => this.api.setSetting(f.key, this.values[f.key] ?? ''))).subscribe({
      next: () => { this.message = 'Saved ✔'; setTimeout(() => (this.message = ''), 2500); },
      error: () => (this.error = 'Could not save.'),
    });
  }
}
