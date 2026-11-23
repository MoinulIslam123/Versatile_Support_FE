/** Every editable list of the website. Used by the admin routes AND the admin sidebar. */
export interface AdminPage {
  group: string;
  path: string;          // /admin/<path>
  label: string;         // sidebar + page title
  icon: string;          // sidebar icon
  collection: string;    // must match a name in backend Models/Entities.cs (Collections)
  titleLabel: string;    // label of the "Title" field
  textLabel: string | null; // label of the "Text" field (null = no text field)
  hasIcon: boolean;
  hasImage: boolean;
  help?: string;
}

export const ADMIN_PAGES: AdminPage[] = [
  { group: 'Site', path: 'nav', label: 'Navigation Menu', icon: 'menu', collection: 'nav', titleLabel: 'Menu label', textLabel: 'Page link (e.g. /about)', hasIcon: false, hasImage: false, help: 'The links in the top menu and the footer. Use the page links from the website (for example /products).' },
  { group: 'Site', path: 'emails', label: 'Email Addresses', icon: 'mail', collection: 'emails', titleLabel: 'Email address', textLabel: null, hasIcon: false, hasImage: false },
  { group: 'Site', path: 'addresses', label: 'Addresses', icon: 'map-pin', collection: 'addresses', titleLabel: 'Label (e.g. Office)', textLabel: 'Full address', hasIcon: false, hasImage: false },

  { group: 'Home & About', path: 'business-categories', label: 'Business Categories', icon: 'layers', collection: 'business-categories', titleLabel: 'Title', textLabel: 'Description', hasIcon: true, hasImage: false, help: 'Shown on the Home page (cards and the scrolling strip) and in the footer.' },
  { group: 'Home & About', path: 'core-values', label: 'Core Values', icon: 'award', collection: 'core-values', titleLabel: 'Value', textLabel: 'Description', hasIcon: false, hasImage: false },

  { group: 'Services', path: 'services', label: 'Printing, Packaging & Supply', icon: 'printer', collection: 'services', titleLabel: 'Service name', textLabel: 'Description', hasIcon: true, hasImage: false, help: 'Services page, section A.' },
  { group: 'Services', path: 'interior-services', label: 'Interior Design & Decoration', icon: 'sofa', collection: 'interior-services', titleLabel: 'Service name', textLabel: 'Description', hasIcon: true, hasImage: false, help: 'Services page, section B.' },
  { group: 'Services', path: 'paper-tube-services', label: 'Paper Tube Solutions', icon: 'scroll', collection: 'tube-services', titleLabel: 'Service name', textLabel: 'Description', hasIcon: true, hasImage: false, help: 'Services page, section C.' },
  { group: 'Services', path: 'paper-tube-products', label: 'Paper Tube Product Chips', icon: 'tag', collection: 'tube-products', titleLabel: 'Product name', textLabel: null, hasIcon: false, hasImage: false, help: 'The small tags under "Our Paper Tube Products" on the Interiors & Paper Tube page.' },

  { group: 'Pages', path: 'industries', label: 'Industries We Serve', icon: 'factory', collection: 'industries', titleLabel: 'Industry', textLabel: null, hasIcon: true, hasImage: false },
  { group: 'Pages', path: 'why-us', label: 'Why Choose Us', icon: 'badge-check', collection: 'why-us', titleLabel: 'Title', textLabel: 'Description', hasIcon: true, hasImage: false },
  { group: 'Pages', path: 'process', label: 'Work Process Steps', icon: 'clipboard-list', collection: 'process', titleLabel: 'Step title', textLabel: 'Description', hasIcon: false, hasImage: false },
  { group: 'Pages', path: 'gallery', label: 'Gallery', icon: 'sparkles', collection: 'gallery', titleLabel: 'Caption', textLabel: null, hasIcon: true, hasImage: true, help: 'Upload photos of your products and projects. They appear on the Gallery page.' },
  { group: 'Pages', path: 'faqs', label: 'FAQ', icon: 'message-circle', collection: 'faqs', titleLabel: 'Question', textLabel: 'Answer', hasIcon: false, hasImage: false },
];
