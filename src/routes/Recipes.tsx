import { Layout } from '../components/Layout';
import { SupportedTextLanguage } from '../components/Text';
import './Recipes.css';

interface RecipeInfo {
  title: {
    lang: SupportedTextLanguage;
    text: string;
    fontSize: number;
  };
  backgroundText: {
    lang: SupportedTextLanguage;
    text: string;
    fontSize: number;
  };
  description: string;
  tags: string[];
  tidbits: {
    recipeLink: string;
    nutritionFacts: {
      calories: number;
      protein: number;
      carbs: number;
    }
  }
};

const breakfastRecipes: RecipeInfo[] = [
  {
    title: { lang: 'en', text: 'LOX Bagel', fontSize: 5.75 },
    backgroundText: { lang: 'en', text: 'LOX', fontSize: 17 },
    description: 'Popular breakfast dish originating from Scandinavia made from salmon slices on a bagel of choice.',
    tags: ['Scandinavian'],
    tidbits: {
      recipeLink: 'https://tastesbetterfromscratch.com/lox-bagel/',
      nutritionFacts: {
        calories: 490,
        protein: 26,
        carbs: 70,
      },
    },
  },
  {
    title: { lang: 'zh', text: '皮蛋瘦肉粥', fontSize: 6.5 },
    backgroundText: { lang: 'zh', text: '瘦肉粥', fontSize: 11.5 },
    description: 'Comforting Chinese breakfast dish made from rice, century eggs, and pork.',
    tags: ['Cantonese'],
    tidbits: {
      recipeLink: 'https://thewoksoflife.com/20-minute-congee-recipe/',
      nutritionFacts: {
        calories: 131,
        protein: 6,
        carbs: 19,
      },
    },
  },
];

const lunchRecipes: RecipeInfo[] = [
  {
    title: { lang: 'en', text: 'Shakshuka', fontSize: 5 },
    backgroundText: { lang: 'ar', text: 'شكشوكة', fontSize: 8.5 },
    description: 'Delicious Middle Eastern brunch dish made from tomatoes and served with crusty bread.',
    tags: ['Middle Eastern'],
    tidbits: {
      recipeLink: 'https://downshiftology.com/recipes/shakshuka/',
      nutritionFacts: {
        calories: 146,
        protein: 7,
        carbs: 10,
      },
    },
  },
  {
    title: { lang: 'en', text: 'Gyro', fontSize: 5 },
    backgroundText: { lang: 'en', text: 'γύρος', fontSize: 12.5 },
    description: 'Popular Greek sandwich consisting of meat and various toppings wrapped in a flatbread.',
    tags: ['Greek'],
    tidbits: {
      recipeLink: 'https://www.tiktok.com/@aussiefitness/video/7185131774635216129?_r=1&_t=8eddFb3NK39',
      nutritionFacts: {
        calories: 572,
        protein: 82.4,
        carbs: 48.3,
      },
    },
  },
];

const dinnerRecipes: RecipeInfo[] = [
  {
    title: { lang: 'en', text: 'Cucumbers', fontSize: 5.25 },
    backgroundText: { lang: 'zh', text: '拍黄瓜', fontSize: 11.5 },
    description: 'Popular cucumber dish with a hint of spice.',
    tags: ['Shanghainese'],
    tidbits: {
      recipeLink: 'https://www.youtube.com/watch?v=GxvvncDeUCA&feature=youtu.be',
      nutritionFacts: {
        calories: 167,
        protein: 6.5,
        carbs: 18,
      },
    },
  },
  {
    title: { lang: 'zh', text: '小笼包', fontSize: 7.5 },
    backgroundText: { lang: 'zh', text: '小笼包', fontSize: 11.5 },
    description: 'Chinese soup dumplings typically served in Shanghai cuisine.',
    tags: ['Shanghainese'],
    tidbits: {
      recipeLink: 'https://thewoksoflife.com/steamed-shanghai-soup-dumplings-xiaolongbao/',
      nutritionFacts: {
        calories: 294,
        protein: 15,
        carbs: 17,
      },
    },
  },
  {
    title: { lang: 'zh', text: '红烧肉', fontSize: 7.5 },
    backgroundText: { lang: 'zh', text: '红烧肉', fontSize: 11.5 },
    description: 'Chinese style slow cooked pork belly.',
    tags: ['Shanghainese'],
    tidbits: {
      recipeLink: 'https://doobydobap.com/recipe/hong-shao-rou',
      nutritionFacts: {
        calories: 431,
        protein: 7.3,
        carbs: 4.3,
      },
    },
  },
  {
    title: { lang: 'zh', text: '干煸四季豆', fontSize: 6.5 },
    backgroundText: { lang: 'zh', text: '四季豆', fontSize: 11.5 },
    description: 'Popular dish in Sichuan cuisine based on fried green beans.',
    tags: ['Sichuan'],
    tidbits: {
      recipeLink: 'https://thewoksoflife.com/dry-fried-string-beans-sichuan/',
      nutritionFacts: {
        calories: 247,
        protein: 8,
        carbs: 11,
      },
    },
  },
];

const langToFontFamily = (lang: SupportedTextLanguage) => {
  switch (lang) {
    case 'en':
      return 'REM';
    case 'zh':
      return 'Noto Sans SC';
    case 'ar':
      return 'Ruwudu';
  }
};

interface MenuItemProps {
  recipeInfo: RecipeInfo;
};

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { recipeInfo } = props;
  
  return (
    <div className="menu-item">
      <div>
        <div
          className="menu-item-background-text"
          style={{
            fontFamily: langToFontFamily(recipeInfo.backgroundText.lang),
            fontSize: recipeInfo.backgroundText.fontSize + 'rem',
            lineHeight: recipeInfo.backgroundText.fontSize + 'rem',
          }}
        >
          {recipeInfo.backgroundText.text}
        </div>
        <div
          className="menu-item-title"
          style={{
            fontFamily: langToFontFamily(recipeInfo.title.lang),
            fontSize: recipeInfo.title.fontSize + 'rem',
            lineHeight: recipeInfo.title.fontSize + 'rem',
          }}
        >
          {recipeInfo.title.text}
        </div>
      </div>
      <div className="menu-item-details">
        <div className="menu-item-tag-bar">
          {recipeInfo.tags.map((tag: string, i) => (
            <div key={tag + i} className="menu-item-chip">{tag}</div>
          ))}
        </div>
        <div className="menu-item-nutrition-facts">
          {recipeInfo.tidbits.nutritionFacts.calories} CAL ·
          {' ' + recipeInfo.tidbits.nutritionFacts.protein}G PROTEIN ·
          {' ' + recipeInfo.tidbits.nutritionFacts.carbs}G CARBS
        </div>
        <div className="menu-item-description">{recipeInfo.description}</div>
      </div>
      <a className="menu-item-link" href={recipeInfo.tidbits.recipeLink} target="_blank">RECIPE</a>
    </div>
  );
};

const Divider = () => {
  return (
    <hr className="meal-divider" />
  );
};

export const Recipes: React.FC = () => {
  return (
    <Layout className="recipes-container">
      <h1 className="meal-header">BREAKFAST</h1>
      <div className="menu-item-container">
        {breakfastRecipes.map((recipeInfo: RecipeInfo) => (
          <MenuItem key={recipeInfo.title.text} recipeInfo={recipeInfo} />
        ))}
      </div>
      <Divider />
      <h1 className="meal-header">LUNCH</h1>
      <div className="menu-item-container">
        {lunchRecipes.map((recipeInfo: RecipeInfo) => (
          <MenuItem key={recipeInfo.title.text} recipeInfo={recipeInfo} />
        ))}
      </div>
      <Divider />
      <h1 className="meal-header">DINNER</h1>
      <div className="menu-item-container">
        {dinnerRecipes.map((recipeInfo: RecipeInfo) => (
          <MenuItem key={recipeInfo.title.text} recipeInfo={recipeInfo} />
        ))}
      </div>
    </Layout>
  );
};