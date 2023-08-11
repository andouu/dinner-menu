export type NavigationOption = {
  href: string;
  text: string;
  dateAvailable?: Date;
};

export const NAVIGATION_OPTIONS: NavigationOption[] = [
  {
    href: '/',
    text: 'BREAKFAST',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/',
    text: 'LUNCH',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/',
    text: 'DINNER',
    dateAvailable: new Date(1691769718),
  }
];