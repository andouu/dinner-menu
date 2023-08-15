import { mealToState } from '../data/SceneState';
import { useMeal } from './useMeal';

export const useMealState = () => {
  const currentMeal = useMeal();
  return mealToState[currentMeal];
};