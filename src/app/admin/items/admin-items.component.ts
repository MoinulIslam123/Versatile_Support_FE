import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ContentItem } from '../../core/api.service';
import { IconComponent } from '../../shared/icon.component';
import { ICONS } from '../../shared/icons';
import { AdminPage } from '../admin-pages';

/** One screen used for every website list (menu, services, FAQ, gallery ...). The settings come from admin-pages.ts. */
@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.css',
})
export class AdminItemsComponent implements OnInit {
  private api = inject(ApiService);
  cfg = inject(ActivatedRoute).snapshot.data as AdminPage;
  iconNames = Object.keys(ICONS);

  items: ContentItem[] = [];
  form: ContentItem | null = null;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.api.list<ContentItem>('items', { collection: this.cfg.collection }).subscribe({
      next: list => (this.items = list),
      error: () => (this.error = 'Could not load data. Is the API running?'),
    });
  }

  add() {
    this.form = {
      id: 0, collection: this.cfg.collection, title: '',
      text: this.cfg.textLabel ? '' : null,
      icon: this.cfg.hasIcon ? 'sparkles' : null,
      imageUrl: this.cfg.hasImage ? '' : null,
      sortOrder: this.items.length + 1, isActive: true,
    };
  }
  edit(i: ContentItem) { this.form = { ...i }; }

  save() {
    const f = this.form!;
    const req = f.id ? this.api.update<ContentItem>('items', f.id, f) : this.api.create<ContentItem>('items', f);
    req.subscribe({ next: () => { this.form = null; this.error = ''; this.load(); }, error: () => (this.error = 'Could not save.') });
  }

  toggle(i: ContentItem) { this.api.update<ContentItem>('items', i.id, { ...i, isActive: !i.isActive }).subscribe(() => this.load()); }

  remove(i: ContentItem) {
    if (!confirm(`Delete "${i.title}"?`)) return;
    this.api.remove('items', i.id).subscribe(() => this.load());
  }
}
