declare module 'react-native-parallax-carousel' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    export interface ParallaxCarouselProps {
      data: any[]; // Replace with a more specific type if you have one
      renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
      width: number;
      height: number;
      loop?: boolean;
      scrollAnimationDuration?: number;
      autoPlay?: boolean;
      style?: ViewStyle;
    }
  
    export default class ParallaxCarousel extends Component<ParallaxCarouselProps> {}
  }
  