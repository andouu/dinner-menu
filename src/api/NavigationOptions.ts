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
    href: '/menu/nutritionFacts',
    text: 'NUTRITION FACTS',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/menu/recipes',
    text: 'RECIPES',
    dateAvailable: new Date(1691769718),
  },
  {
    href: '/menu/costBreakdown',
    text: 'COST BREAKDOWN',
    dateAvailable: new Date(1691769718),
  },
];