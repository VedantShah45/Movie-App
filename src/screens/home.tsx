// Home.tsx

import { StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/movieList';
import { useMovies } from '../context/moviesContext'; // Adjust the import path
import LoadingScreen from './loading';
import { Movie } from '../components/TrendingMovies';

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({}: HomeProps) {
  const { setMovies, movies } = useMovies(); // Get movies and setMovies from context

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("Fetching movies from OMDB...");
      const movieTitles = [
        "The Lion King", "The Shawshank Redemption", "Forrest Gump", "Inception", 
        "The Matrix", "Pulp Fiction", "Fight Club", "The Godfather", 
        "Schindler's List", "The Dark Knight", "12 Angry Men", "The Lord of the Rings: The Return of the King",
        "The Good, the Bad and the Ugly", "Star Wars: Episode IV - A New Hope", "The Silence of the Lambs",
        "Saving Private Ryan", "The Usual Suspects", "The Departed", "The Prestige",
        "Whiplash", "The Green Mile", "Se7en", "Gladiator",
        "Titanic", "Jurassic Park"
      ];
      
      try {
        const moviePromises = movieTitles.map(title => 
          fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=3c289d44`)
        );

        const responses = await Promise.all(moviePromises);
        
        const movieDataPromises = responses.map(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });

        const moviesData = await Promise.all(movieDataPromises);
        console.log("fetched Data: ", moviesData);
        
        setMovies(moviesData); // Update the movies in context
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [setMovies]); // Use setMovies from context

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //GROUPING MOVIES BY GENRE AND SORTING
  const groupMoviesByGenre = (movies: Movie[]) => {
    const genresMap: { [key: string]: { count: number; movies: { movie: Movie; index: number }[] } } = {}; // Define the structure for genresMap

    movies.forEach((movie, index) => {
        const genres = movie.Genre.split(','); // Assuming genres are comma-separated
        genres.forEach(genre => {
            if (!genresMap[genre]) {
                genresMap[genre] = { count: 0, movies: [] }; // Initialize count and movies array
            }
            genresMap[genre].count += 1; // Increment the count for this genre
            genresMap[genre].movies.push({ movie, index }); // Store the movie and its original index
        });
    });

    // Sort genres by count and get the top 5
    const topGenres = Object.entries(genresMap)
        .sort(([, a], [, b]) => b.count - a.count) // Sort by count descending
        .slice(0, 5); // Get the top 5 genres

    // Create an array of movies for the top 5 genres
    const top5MoviesByGenre = topGenres.map(([genre, { movies }]) => ({
        genre,
        movies,
    }));

    return top5MoviesByGenre; // Return array of top genres with their movies
};


  const groupedMovies = groupMoviesByGenre(movies);

  if (movies.length > 1) {
    return (
      <SafeAreaView>
        <ScrollView>
        <View className='p-2 h-full w-full bg-neutral-900'>
          <View className='flex-row items-center justify-between'>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
            <Text className='text-white text-3xl font-bold'>
              <Text className='text-orange-400'>V</Text>
              Movies
            </Text>  
            <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
            </TouchableOpacity>
          </View>
          <ScrollView className='mb-5 p-0'>
            <TrendingMovies data={movies}/> {/* Pass the movie data to TrendingMovies */}
          </ScrollView>
          <View className='mx-3'>    
            {groupedMovies.map(({ genre, movies }) => (
                <View key={genre} className='mb-4'>
                    <Text style={styles.title}>{genre}</Text>
                    <ScrollView horizontal={true}>
                        {movies.map(({ movie, index }) => ( // Destructure movie and index
                            <MovieList key={index} poster={movie.Poster} title={movie.Title} index={index} />
                        ))}
                    </ScrollView>
                </View>
            ))}
        </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <View className='flex-row items-center justify-between bg-neutral-800 h-10'>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
          <Text className='text-white text-3xl font-bold'>
            <Text className='text-orange-400'>V</Text>
            Movies
          </Text>  
          <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
        </View>
        <LoadingScreen/>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24, // Increase the font size
    marginBottom: 10,
    marginLeft:15,
    textAlign: 'left',
    color:'white',
  },
});
