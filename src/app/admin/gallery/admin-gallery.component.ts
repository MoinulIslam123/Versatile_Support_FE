import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { concatMap, from, toArray } from "rxjs";
import { ApiService, ContentItem } from "../../core/api.service";
import { fileUrl } from "../../core/api.config";
import { IconComponent } from "../../shared/icon.component";

@Component({
  selector: "app-admin-gallery",
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: "./admin-gallery.component.html",
  styleUrl: "./admin-gallery.component.css",
})
export class AdminGalleryComponent implements OnInit {
  private api = inject(ApiService);
  fileUrl = fileUrl;

  items: ContentItem[] = [];
  uploading = false;
  message = "";
  error = "";

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.list<ContentItem>("items", { collection: "gallery" }).subscribe({
      next: (list) => (this.items = list),
      error: () => (this.error = "Could not load data. Is the API running?"),
    });
  }

  /** Upload one or many photos; each becomes a new gallery item (caption comes from the file name). */
  onFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = "";
    if (!files.length) return;

    this.uploading = true;
    this.error = this.message = "";
    let order = this.items.length
      ? Math.max(...this.items.map((i) => i.sortOrder))
      : 0;

    from(files)
      .pipe(
        concatMap((file) =>
          this.api.upload(file).pipe(
            concatMap((r) =>
              this.api.create<ContentItem>("items", {
                collection: "gallery",
                title: this.captionFrom(file.name),
                text: null,
                icon: "sparkles",
                imageUrl: r.url,
                sortOrder: ++order,
                isActive: true,
              }),
            ),
          ),
        ),
        toArray(),
      )
      .subscribe({
        next: (done) => {
          this.uploading = false;
          this.message = `${done.length} photo(s) uploaded ✔`;
          this.load();
        },
        error: (err) => {
          this.uploading = false;
          this.error = err.error?.message ?? "Upload failed.";
          this.load();
        },
      });
  }

  /** Replace (or add) the photo of an existing item. */
  replace(item: ContentItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;

    this.error = "";
    this.api
      .upload(file)
      .pipe(
        concatMap((r) =>
          this.api.update<ContentItem>("items", item.id, {
            ...item,
            imageUrl: r.url,
          }),
        ),
      )
      .subscribe({
        next: () => this.load(),
        error: (err) => (this.error = err.error?.message ?? "Upload failed."),
      });
  }

  save(item: ContentItem) {
    this.api
      .update<ContentItem>("items", item.id, item)
      .subscribe({ error: () => (this.error = "Could not save.") });
  }

  toggle(item: ContentItem) {
    item.isActive = !item.isActive;
    this.save(item);
  }

  remove(item: ContentItem) {
    if (
      !confirm(
        `Delete "${item.title}"${item.imageUrl ? " and its photo" : ""}?`,
      )
    )
      return;
    this.api.remove("items", item.id).subscribe(() => this.load());
  }

  private captionFrom(fileName: string) {
    return (
      fileName
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim() || "Photo"
    );
  }
}
