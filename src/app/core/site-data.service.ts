import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import {
  BUSINESS_CATEGORIES,
  CORE_VALUES,
  FAQS,
  GALLERY,
  INDUSTRIES,
  INTERIOR_SERVICES,
  NAV,
  PROCESS,
  PRODUCTS,
  SERVICES,
  SITE,
  TUBE_SERVICES,
  WHY_US,
} from "../data/site-data";
import { API_URL } from "./api.config";
import { PublicCard, PublicCategory } from "./api.service";

export interface SiteInfo {
  name: string;
  tagline: string;
  footerLine: string;
  mobile: string;
  whatsapp: string;
  whatsappLink: string;
  hours: string;
  emails: string[];
  addresses: { label: string; text: string }[];
}
export interface GalleryItem {
  title: string;
  icon: string;
  src?: string;
}

/** Everything the website shows, as returned by GET /api/public/site. */
interface SiteDto {
  site: SiteInfo;
  nav: { label: string; path: string }[];
  businessCategories: { icon: string; title: string; text: string }[];
  coreValues: { title: string; text: string }[];
  products: PublicCategory[];
  services: PublicCard[];
  interiorServices: PublicCard[];
  tubeServices: PublicCard[];
  industries: { icon: string; title: string }[];
  whyUs: PublicCard[];
  process: { title: string; text: string }[];
  gallery: GalleryItem[];
  faqs: { q: string; a: string }[];
}

/**
 * One place that holds all website content.
 * It starts with the built-in content from data/site-data.ts (so the site still works if the API is offline)
 * and is replaced by the database content as soon as the API answers.
 */
@Injectable({ providedIn: "root" })
export class SiteDataService {
  private http = inject(HttpClient);

  site = signal<SiteInfo>(SITE);
  nav = signal(NAV);
  businessCategories = signal(BUSINESS_CATEGORIES);
  coreValues = signal(CORE_VALUES);
  products = signal<PublicCategory[]>(PRODUCTS);
  services = signal<PublicCard[]>(SERVICES);
  interiorServices = signal<PublicCard[]>(INTERIOR_SERVICES);
  tubeServices = signal<PublicCard[]>(TUBE_SERVICES);
  industries = signal(INDUSTRIES);
  whyUs = signal<PublicCard[]>(WHY_US);
  process = signal(PROCESS);
  gallery = signal<GalleryItem[]>(GALLERY);
  faqs = signal(FAQS);

  constructor() {
    this.load();
  }

  load() {
    this.http.get<SiteDto>(`${API_URL}/public/site`).subscribe({
      next: (d) => {
        this.site.set(d.site);
        this.nav.set(d.nav);
        this.businessCategories.set(d.businessCategories);
        this.coreValues.set(d.coreValues);
        this.products.set(d.products);
        this.services.set(d.services);
        this.interiorServices.set(d.interiorServices);
        this.tubeServices.set(d.tubeServices);
        this.industries.set(d.industries);
        this.whyUs.set(d.whyUs);
        this.process.set(d.process);
        this.gallery.set(d.gallery);
        this.faqs.set(d.faqs);
      },
      error: () => {
        /* API offline: keep the built-in content */
      },
    });
  }
}
