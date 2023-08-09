import { ComponentProps } from 'react';
import { useReflow } from '@react-three/flex';
import { Text as TextImpl } from '@react-three/drei';

type TextProps = {
  bold?: boolean;
  lang: 'en' | 'zh';
} & ComponentProps<typeof TextImpl>;

const fontMap = {
  en: {
    bold: '/REM-ExtraBold.ttf',
    regular: '/Rubik-Regular.ttf',
  },
  zh: {
    bold: '/NotoSansSC-Bold.otf',
    regular: '/NotoSansSC-Regular.otf',
  },
};

export const Text: React.FC<TextProps> = ({ bold = false, anchorX = 'left', anchorY = 'top', textAlign = 'left', ...props}: TextProps) => {
  const reflow = useReflow();
  
  const font = fontMap[props.lang][bold ? 'bold' : 'regular'];

  return <TextImpl anchorX={anchorX} anchorY={anchorY} textAlign={textAlign} font={font} onSync={reflow} {...props} />;
};