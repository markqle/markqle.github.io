export const site = {
  name: 'Mark Le', // TODO(mark): confirm display name
  title: 'Mark Le — Portfolio',
  description: 'Portfolio and blog of Mark Le.', // TODO(mark): refine tagline
  email: 'mark@belamourllc.com',
  github: 'https://github.com/markqle',
  linkedin: 'https://www.linkedin.com/in/markqle', // TODO(mark): confirm URL
} as const;

export const nav = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
];
