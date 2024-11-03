import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Movie } from './TrendingMovies';
import { useMovies } from '../context/moviesContext';

type MovieListProps = {
  poster: string;
  title: string;
  index?: number; // Made 'index' optional
};

const MovieList: React.FC<MovieListProps> = ({ poster, title, index }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { movies } = useMovies();

  // Truncate title if its length exceeds 12 characters
  const truncatedTitle = title.length > 12 ? title.slice(0, 12) + '...' : title;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('MovieScreen', { index: index || 0 })}>

        <Image
          source={{
            uri: poster,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{truncatedTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8, // Margin between movie items
    alignItems: 'center', // Center items in the container
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
  },
});

export default MovieList;
