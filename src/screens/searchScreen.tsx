import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Bars3CenterLeftIcon } from 'react-native-heroicons/outline';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMovies } from '../context/moviesContext';
import MovieList from '../components/movieList';
import { Movie } from '../components/TrendingMovies';

export default function SearchScreen() {
    const { movies, setMovies } = useMovies();
    const [found,setFound]=useState<Boolean>(true)
    const [result, setResult] = useState<Movie | null>(null); // Initialize as null
    const [searchText, setSearchText] = useState('');
    const textRef = useRef<TextInput>(null);
    const [index, setIndex] = useState<number>(-1);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(searchText)}&apikey=3c289d44`);
            const movieData = response.data;
            console.log('Searched Movie : ',movieData)            
            if(!movieData.Error){
                    // Check if the movie already exists in the context
                const foundIndex = movies.findIndex(movie => movie.imdbID === movieData.imdbID);
                console.log('Found index:', foundIndex);

                if (foundIndex === -1) { // If movie does not exist
                    setMovies(prevMovies => [...prevMovies, movieData]); // Add movie
                    setIndex(movies.length); // Set index to new movie's index
                } else {
                    setIndex(foundIndex); // Set index if it exists
                }
                setResult(movieData); 
                setFound(true)// Always set result to the fetched movie data
            }          
            else setFound(false)
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, []);

    return (
        <View className='bg-neutral-800 h-full w-full p-3'>
            <View className='flex-row items-center justify-between'>
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                <TextInput
                    className='text-xl text-white'
                    ref={textRef}
                    placeholder="Enter movie name"
                    placeholderTextColor="#A9A9A9"
                    value={searchText}
                    onSubmitEditing={handleSearch}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
            {!found && <Text className='text-white text-center mt-10 text-3xl font-bold'>Movie Not Found!</Text>}
            {result && <MovieList poster={result.Poster} title={result.Title} index={index} />}
        </View>
    );
}

const styles = StyleSheet.create({});
