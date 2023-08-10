import { LayercardProps, PageProps } from './Scene';

interface SceneState {
  top: number;
  pages: number;
  threshold: number;
  mouse: [number, number];
  content: (Omit<PageProps, 'textScaleFactor' | 'onReflow' | 'left'> & { lang: 'en' | 'zh' })[];
  depthbox: (Omit<LayercardProps, 'boxWidth' | 'boxHeight' | 'map' | 'textScaleFactor'> & { image: string })[];
  lines: { points: [number, number, number][], color: string, lineWidth: number }[];
};

export const state: SceneState = {
  top: 0,
  pages: 0,
  threshold: 2,
  mouse: [0, 0],
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
      text: `皮蛋瘦肉粥\n+ 油条`,
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
        position: [-1, -0.5, 0],
        rotation: [-Math.PI / 10, Math.PI / 8, 0],
      },
    }
  ],
  depthbox: [
    {
      depth: 0,
      color: '#141414',
      textColor: '##141414',
      text: 'Cuisine:\n - USA (New York City)\n - China',
      lang: 'en',
      image: '/images/cAKwexj.jpg',
    },
    {
      depth: -5,
      textColor: '#141414',
      text: 'Recipes & Nutrition Facts',
      lang: 'en',
      image: '/images/04zTfWB.jpg',
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