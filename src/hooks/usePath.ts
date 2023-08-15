import { useLocation } from 'react-router-dom';
import { useMeal } from './useMeal';

export const usePath = () => {
  const location = useLocation();
  if (useMeal()) {
    return useMeal();
  }

  switch (location.pathname) {
    case '/':
      return 'home';
    case '/nutritionFacts':
      return 'nutritionFacts';
    case '/recipes':
      return 'recipes';
    case '/costBreakdown':
      return 'costBreakdown';
    default:
      return null;
  }
};