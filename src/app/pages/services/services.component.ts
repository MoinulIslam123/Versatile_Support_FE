import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  private data = inject(SiteDataService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  get services() {
    return this.data.services();
  }
  interiors = this.data.interiorServices; // signals: the template calls interiors() / tube()
  tube = this.data.tubeServices;

  ngOnInit() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const section = params.get('section');
        if (!section) return;

        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 50);
      });
  }
}
