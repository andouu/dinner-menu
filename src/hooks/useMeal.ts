import { useLocation } from 'react-router-dom';

export const useMeal = () => {
  const location = useLocation();
  
  switch (location.pathname) {
    case '/menu/breakfast':
      return 'breakfast';
    case '/menu/lunch':
      return 'lunch';
    case '/menu/dinner':
      return 'dinner';
    default:
      return null;
  };
};