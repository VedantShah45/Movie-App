import { StyleSheet, Image, ScrollView, Text, View, Dimensions } from 'react-native';
import React, { useRef, useState,useEffect } from 'react';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeartIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useMovies } from '../context/moviesContext';
import { Movie } from '../components/TrendingMovies';
import LoadingScreen from './loading';

type MovieScreenProp = NativeStackScreenProps<RootStackParamList, 'MovieScreen'>;

export default function MovieScreen({ route }: MovieScreenProp) {
  const { width } = Dimensions.get('window');
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [movie,setMovie]=useState<Movie>()

  const { index } = route.params;
  const { movies } = useMovies();

  useEffect(()=>{
    const movie = movies[index];
    setMovie(movie)
  },[])

  if(movie)
  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
        {<Image
          source={{ uri: movie.Poster }}
          style={styles.posterImage}
        />}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <ChevronLeftIcon size={35} color="white" style={styles.icon} onPress={() => navigation.pop()} />
            <HeartIcon size={35} color={liked ? 'red' : 'white'} style={styles.icon} onPress={() => setLiked(!liked)} />
          </View>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.releaseInfo}>
            Released - {movie.Year} - {movie.Runtime}
          </Text>
          <Text style={styles.genre}>{movie.Genre}</Text>
        </LinearGradient>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.plot}>{movie.Plot}</Text>
          <Text style={styles.topCast}>Top Cast: {movie.Actors}</Text>
        </View>
      </ScrollView>
    </View>
  );
  else return(<LoadingScreen/>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  posterContainer: {
    height: '50%',
    position: 'relative',
  },
  posterImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 16,
  },
  header: {
    position: 'absolute', // Set to absolute to stick to the top
    top: 40, // Adjust this value to position the header
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  releaseInfo: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  genre: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 5,
  },
  scrollContainer: {
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  plot: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  topCast: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 5,
  },
});
