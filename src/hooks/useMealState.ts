import { mealToState } from '../data/SceneState';
import { useMeal } from './useMeal';

export const useMealState = () => {
  const currentMeal = useMeal();
  if (!currentMeal) {
    return null;
  }
  return mealToState[currentMeal];
};