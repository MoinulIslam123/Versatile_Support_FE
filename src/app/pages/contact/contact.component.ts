import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SiteDataService } from '../../core/site-data.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private data = inject(SiteDataService);
  private sanitizer = inject(DomSanitizer);

  get site() {
    return this.data.site();
  }
  sent = signal(false);
  get interests() {
    return [
      ...this.data.products().map((p) => p.title),
      'Interior Design & Decoration',
    ];
  }

  // Dynamically builds an embed URL from your first address, or replace with your exact Google Maps Share -> Embed URL
  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://maps.google.com/maps?q=${encodeURIComponent(this.site.addresses?.[0]?.text || 'Dhaka, Bangladesh')}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  );

  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    company: [''],
    phone: ['', Validators.required],
    email: ['', Validators.email],
    interest: [''],
    quantity: [''],
    message: ['', Validators.required],
  });

  clean(n: string) {
    return n.replace(/\s/g, '');
  }
  invalid(c: string) {
    const x = this.form.get(c)!;
    return x.invalid && x.touched;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const text = [
      'New Inquiry – Versatile Support & Supply',
      `Name: ${v.fullName}`,
      `Company: ${v.company || '-'}`,
      `Phone: ${v.phone}`,
      `Email: ${v.email || '-'}`,
      `Interested in: ${v.interest || '-'}`,
      `Quantity: ${v.quantity || '-'}`,
      `Message: ${v.message}`,
    ].join('\n');
    window.open(
      `${this.site.whatsappLink}?text=${encodeURIComponent(text)}`,
      '_blank',
    );
    this.sent.set(true);
    this.form.reset();
  }
}
