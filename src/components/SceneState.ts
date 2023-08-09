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
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      tag: '00',
      text: `LOX BAGEL`,
      lang: 'en',
      images: ['/images/BH41NVu.jpg', '/images/fBoIJLX.jpg', '/images/04zTfWB.jpg'],
    },
    {
      tag: '01',
      text: `粥`,
      lang: 'zh',
      images: ['/images/c4cA8UN.jpg', '/images/ajQ73ol.jpg', '/images/gZOmLNU.jpg']
    },
    {
      tag: '02',
      text: `The Hiramic\nLegend`,
      lang: 'en',
      images: ['/images/mbFIW1b.jpg', '/images/mlDUVig.jpg', '/images/gwuZrgo.jpg']
    },
  ],
  depthbox: [
    {
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
      text: 'In a void,\nno one could say\nwhy a thing\nonce set in motion\nshould stop anywhere.',
      lang: 'en',
      image: '/images/cAKwexj.jpg',
    },
    {
      depth: -5,
      textColor: '#272727',
      text: 'For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum.',
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