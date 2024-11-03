import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, Animated } from 'react-native';
import { Movie } from './TrendingMovies'; // Adjust the import path according to your structure

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }: { data: Movie[] }) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the first actual movie

  // Duplicate the first and last items to create a circular effect
  const circularData = [data[data.length - 1], ...data, data[0]];

  // Handle scroll event to loop infinitely
  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width * 0.75)); // Calculate the current index (0.75 includes the margin)

    // Update currentIndex based on scroll
    setCurrentIndex(index);

    // Reset scroll position if we are at the first or last item
    if (index === 0) {
      scrollViewRef.current?.scrollTo({
        x: width * 0.75 * (data.length), // Scroll to the last actual item
        animated: false,
      });
    } else if (index === circularData.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * 0.75, // Scroll to the first actual item
        animated: false,
      });
    }
  };

  // Auto-scroll functionality
  const autoScroll = () => {
    if (scrollViewRef.current) {
      // Calculate the next index
      const nextIndex = (currentIndex + 1) % circularData.length;

      // Animate the scroll to center the item
      scrollViewRef.current.scrollTo({
        x: (width * 0.75) * nextIndex,
        animated: true,
      });

      // Update currentIndex
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    // Start the auto-scroll
    scrollInterval.current = setInterval(autoScroll, 3000); // Scroll every 3 seconds

    // Clean up the interval on component unmount
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [currentIndex]); // Dependency array includes currentIndex to trigger effect when it changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text className="text-orange-400 font-bold">Top</Text> Rated Movies
      </Text>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {circularData.map((item, index) => (
          <View key={index} style={styles.item}>
            <Animated.Image
              source={{ uri: item.Poster }}
              style={styles.image}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // alignItems: 'center',
  },
  title: {
    fontSize: 24, // Increase the font size
    marginBottom: 10,
    marginLeft:15,
    textAlign: 'left',
    color:'white',
  },
  scrollContainer: {
    paddingHorizontal: (width * 0.45) - (width * 0.35),
  },
  item: {
    width: width * 0.7,
    height: height * 0.5,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'contain',
  },
});


export default TrendingMovies;
