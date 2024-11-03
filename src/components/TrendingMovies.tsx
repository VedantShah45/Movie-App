import { Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import ParallaxCarousel from './carousel';

export interface MovieRating {
  Source: string;
  Value: string;
}

export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: MovieRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }


export default function TrendingMovies({ data }: { data: Movie[] }) {
  const width = Math.floor(Dimensions.get('window').width);
  console.log("Trending movies :",data);  
  return (
    <View className="mt-5 items-center justify-center">
      <ParallaxCarousel data={data}/>
    </View>
  );
}
