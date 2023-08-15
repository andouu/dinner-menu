export type NavigationOption = {
  href: string;
  text: string;
  dateAvailable?: Date;
};

export const NAVIGATION_OPTIONS: NavigationOption[] = [
  {
    href: '/menu/breakfast',
    text: 'BREAKFAST',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/menu/lunch',
    text: 'LUNCH',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/menu/dinner',
    text: 'DINNER',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/recipes',
    text: 'RECIPES',
  },
  {
    href: '/costBreakdown',
    text: 'COST BREAKDOWN',
    dateAvailable: new Date(9999999999999),
  },
];