import { useState, useRef, useEffect } from 'react';
import { ALWAYS_SHOW_YEAR_CHART } from '../utils/const';

type HoverHook = [boolean, { onMouseOver: () => void; onMouseOut: () => void }];

const useHover = (): HoverHook => {
  const [hovered, setHovered] = useState(ALWAYS_SHOW_YEAR_CHART);
  const timerRef = useRef<number>();

  // 当ALWAYS_SHOW_YEAR_CHART为true时，始终保持显示状态
  useEffect(() => {
    if (ALWAYS_SHOW_YEAR_CHART) {
      setHovered(true);
    }
  }, []);

  const eventHandlers = {
    onMouseOver() {
      // 如果ALWAYS_SHOW_YEAR_CHART为true，不需要处理鼠标事件
      if (ALWAYS_SHOW_YEAR_CHART) return;
      
      // Clear the previous timer if it exists to handle rapid mouse movements
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setHovered(true), 500);
    },
    onMouseOut() {
      // 如果ALWAYS_SHOW_YEAR_CHART为true，不需要处理鼠标事件
      if (ALWAYS_SHOW_YEAR_CHART) return;
      
      clearTimeout(timerRef.current);
      setHovered(false);
    },
  };

  return [hovered, eventHandlers];
};

export default useHover;
