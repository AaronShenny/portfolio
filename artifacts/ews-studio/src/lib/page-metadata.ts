export const portfolioMetadata = {
  title: 'Aaron Shenny | Backend, APIs & AI Experiments',
  description: 'Aaron Shenny’s personal portfolio: backend development, APIs, automation and experiments with AI agents. Explore public projects and writing.',
};

export const studioMetadata = {
  title: 'EXTAPANO WEB STUDIO | EWS',
  description: 'Websites and web applications designed for businesses that want to look better, perform better, and grow online.',
};

export function metadataForPath(path: string) {
  if (path === '/project/recordly' || path === '/project/recordly/') return {
    title: 'Recordly | College Record Maker — Aaron Shenny',
    description: 'Recordly is an independent Windows app for preparing college Word records from your content and templates. Explore the project and download releases on GitHub.',
  };
  if (path === '/work' || path === '/work/') return studioMetadata;
  if (path === '/') return portfolioMetadata;
  if (path.startsWith('/admin')) return { title: 'Inquiries | EWS', description: 'Studio administration.' };
  if (path.startsWith('/sign-in')) return { title: 'Sign In | EWS', description: 'Sign in to Extapano Web Studio.' };
  if (path.startsWith('/sign-up')) return { title: 'Create Access | EWS', description: 'Create access to Extapano Web Studio.' };
  return { title: 'Page Not Found | Aaron Shenny', description: 'This page could not be found.' };
}

export function applyHtmlMetadata(html: string, path: string) {
  const { title, description } = metadataForPath(path);
  return html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${description}"`)
    .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${title}"`);
}
