import { Component, signal, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SiteDataService } from "../../core/site-data.service";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { IconComponent } from "../../shared/icon.component";
import { RevealDirective } from "../../shared/reveal.directive";

@Component({
  selector: "app-faq",
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.css",
})
export class FaqComponent {
  private data = inject(SiteDataService);
  get faqs() {
    return this.data.faqs();
  }
  get site() {
    return this.data.site();
  }
  open = signal<number | null>(0);
  toggle(i: number) {
    this.open.update((v) => (v === i ? null : i));
  }
}
