import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IconComponent } from '../../shared/icon.component';
import { ADMIN_PAGES } from '../admin-pages';

interface NavLink { path: string; label: string; icon: string; }

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  auth = inject(AuthService);

  groups: { title: string; links: NavLink[] }[] = this.buildGroups();

  private buildGroups() {
    const link = (path: string, label: string, icon: string): NavLink => ({ path: '/admin/' + path, label, icon });
    const groups: { title: string; links: NavLink[] }[] = [
      { title: 'Site', links: [link('settings', 'Site Info', 'building-2')] },
      { title: 'Catalog', links: [link('products', 'Products', 'boxes')] },
    ];

    // add each editable list under its group (Site, Home & About, Services, Pages ...)
    for (const p of ADMIN_PAGES) {
      let g = groups.find(x => x.title === p.group);
      if (!g) groups.push((g = { title: p.group, links: [] }));
      g.links.push(link(p.path, p.label, p.icon));
    }

    groups.push({ title: 'Account', links: [link('password', 'Change Password', 'shield-check')] });
    return groups;
  }
}
