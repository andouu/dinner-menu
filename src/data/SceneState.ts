import { LayercardProps, PageProps } from '../components/Scene';
import { SupportedTextLanguage } from '../components/Text';

interface MenuDetails {
  totalPages: number;
  threshold: number;
  originalThreshold: number;
  content: (Omit<PageProps, 'textScaleFactor' | 'onReflow' | 'left'> & { lang: SupportedTextLanguage })[];
};

type MealContentMap = { [meal: string]: MenuDetails };

type ISceneState = {
  top: number;
  pages: number;
  mouse: [number, number];
  depthbox: (Omit<LayercardProps, 'boxWidth' | 'boxHeight' | 'map' | 'textScaleFactor'> & { image: string })[];
  lines: { points: [number, number, number][], color: string, lineWidth: number }[];
};

type SceneState = ISceneState & MenuDetails;

export const mealToContent: MealContentMap = {
  breakfast: {
    totalPages: 2,
    threshold: 2,
    originalThreshold: 2,
    content: [
      {
        tag: '00',
        text: `LOX BAGEL`,
        lang: 'en',
        images: ['/images/BH41NVu.jpg'],
        model: {
          path: '/bagel_and_lox.glb',
          compose: (nodes, materials) => {
            return [{ geometry: nodes.model_tex_u1_v1_0.geometry, material: materials.tex_u1_v1 }];
          },
          scale: 65,
          position: [1.5, -2, 0],
          rotation: [-Math.PI / 8, -Math.PI / 8, 0],
        },
      },
      {
        tag: '01',
        text: `皮蛋瘦肉粥`,
        lang: 'zh',
        images: ['/images/c4cA8UN.jpg'],
        model: {
          path: '/english_delftware_bowl.glb',
          compose: (nodes, materials) => {
            let material = materials.initialShadingGroup;
            return [
              {
                geometry: nodes.Object_2.geometry,
                material,
              },
              {
                geometry: nodes.Object_3.geometry,
                material,
              },
              {
                geometry: nodes.Object_4.geometry,
                material,
              },
              {
                geometry: nodes.Object_5.geometry,
                material,
              },
              {
                geometry: nodes.Object_6.geometry,
                material,
              },
              {
                geometry: nodes.Object_7.geometry,
                material,
              },
            ];
          },
          scale: 0.022,
          position: [-1, -1, 0],
          rotation: [-Math.PI / 10, Math.PI / 8, 0],
        },
      }
    ],
  },
  lunch: {
    totalPages: 2,
    threshold: 2,
    originalThreshold: 2,
    content: [
      {
        tag: '00',
        text: 'SHAKSHUKA',
        lang: 'en',
        images: [],
        model: {
          path: '/old_frying_pan.glb',
          compose: (nodes, materials) => {
            return [
              { geometry: nodes.Pan_low_base_0.geometry, material: materials.base },
              { geometry: nodes.Pan_low_wood_0.geometry, material: materials.wood },
            ];
          },
          scale: 2.25,
          position: [1.5, -2, 0],
          rotation: [-Math.PI / 8, -Math.PI / 8, Math.PI],
        },
      },
      {
        tag: '01',
        text: 'CHICKEN GYRO',
        lang: 'en',
        images: [],
        model: {
          path: '/delicious_shawarma.glb',
          compose: (nodes, materials) => {
            return [{ geometry: nodes.Mesh_0_Material_0_0.geometry, material: materials.Material_0 }];
          },
          scale: 9.5,
          position: [-1.5, -1.5, 0],
          rotation: [-Math.PI / 6, Math.PI / 12, 0],
        },
      },
    ],
  },
  dinner: {
    totalPages: 3,
    threshold: 4,
    originalThreshold: 4,
    content: [
      {
        tag: '00',
        text: '小笼包',
        lang: 'zh',
        images: [],
        model: {
          path: '/xiaolongbao_01.glb',
          compose: (nodes, materials) => {
            return [
              // { geometry: nodes.Object_2.geometry, material: materials["Scene_-_Root"] },
              { geometry: nodes.Object_2.geometry, material: materials.main },
              { geometry: nodes.Object_3.geometry, material: materials.main }
            ];
          },
          scale: 20,
          position: [-1, -1, 0],
          rotation: [-Math.PI / 8, -Math.PI / 6, 0],
        },
      },
      {
        tag: '01',
        text: '红烧肉',
        lang: 'zh',
        images: [],
        model: {
          path: '/bowl_of_lamb_stew.glb',
          compose: (nodes, materials) => {
            return [
              { geometry: nodes.PorkStew_Material_0.geometry, material: materials.Material },
              { geometry: nodes.PorkStew_Material001_0.geometry, material: materials['Material.001'] },
            ];
          },
          scale: 2.25,
          position: [-1.5, -4, 0],
          rotation: [-Math.PI / 6, Math.PI / 12, 0],
        },
      },
      {
        tag: '02',
        text: '干煸四季豆',
        lang: 'zh',
        images: [],
        model: {
          path: '/wok_homework10.glb',
          compose: (nodes, materials) => {
            return [
              { geometry: nodes.Wok001_Material_0.geometry, material: materials.Material },
              { geometry: nodes.Steel001_Material_0.geometry, material: materials.Material },
              { geometry: nodes.Handle001_Material_0.geometry, material: materials.Material },
              { geometry: nodes.Button001_Material_0.geometry, material: materials.Material },
            ];
          },
          scale: 2.25,
          position: [1.5, -1, 0],
          rotation: [-Math.PI / 8, -Math.PI / 8, Math.PI],
        },
      },
    ],
  },
};

export const IState: ISceneState = {
  top: 0,
  pages: 0,
  mouse: [0, 0],
  depthbox: [
    {
      depth: 0,
      color: '#FFD794',
      textColor: 'rgb(20, 20, 20)',
      text: '',
      lang: 'en',
      image: '/images/fruits_monotone.avif',
    },
    {
      depth: -3.5,
      textColor: '#141414',
      text: 'SEE MENU FOR MORE INFO',
      lang: 'en',
      image: '/images/fruits.avif',
    },
  ],
  lines: [
    {
      points: [
        [-20, 0, 0],
        [-9, 0, 0],
      ],
      color: 'black',
      lineWidth: 0.5,
    },
    {
      points: [
        [20, 0, 0],
        [9, 0, 0],
      ],
      color: 'black',
      lineWidth: 0.5,
    },
  ],
};

const breakfastState: SceneState = {
  ...IState,
  ...mealToContent.breakfast,
};

const lunchState: SceneState = {
  ...IState,
  ...mealToContent.lunch,
};

const dinnerState: SceneState = {
  ...IState,
  ...mealToContent.dinner,
};

export const mealToState = {
  breakfast: breakfastState,
  lunch: lunchState,
  dinner: dinnerState,
};

export const resetSceneState = () => {
  // state.top = 0;
  // state.pages = 0;
  // state.mouse = [0, 0];
};