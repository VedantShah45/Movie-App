import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

// Array of movie facts
const movieFacts = [
  "The longest movie ever made is 'Logistics', which lasts for 35 days.",
  "In 'The Wizard of Oz', the character of the Cowardly Lion was originally meant to be a real lion.",
  "The iconic scream of Wilhelm is used in over 400 movies, including 'Star Wars' and 'Indiana Jones'.",
  "The 'Harry Potter' series is the first film series to gross over $7 billion.",
  "The voice of Darth Vader was provided by James Earl Jones, but the actor in the suit was David Prowse.",
  "In 'Titanic', the ship was made to look smaller using forced perspective.",
  "The character of Jack Dawson in 'Titanic' was inspired by a real person who died on the ship.",
  "The original title for 'E.T. the Extra-Terrestrial' was 'A Boy's Life'.",
  "In 'The Shining', the number 237 is significant; it refers to the real-life room 217 in the Timberline Lodge.",
  "The first animated feature film to be nominated for Best Picture was 'Beauty and the Beast'.",
  "The 'Jaws' theme song was created by John Williams and is known for its simplicity and effectiveness.",
  "The famous line 'Here's looking at you, kid' from 'Casablanca' was not in the original script.",
  "The movie 'Psycho' was the first to show a toilet being flushed on screen.",
  "The first film ever to win the Oscar for Best Picture was 'Wings' in 1929.",
  "In 'Inception', the spinning top is a symbol of Cobb's totem that helps him distinguish dreams from reality.",
  "The character of Indiana Jones was based on a combination of real-life archeologists and adventurers.",
  "The 'Back to the Future' time machine was originally conceived as a refrigerator before being changed to a DeLorean.",
  "Tom Hanks is the only actor to have appeared in all three movies that have grossed over $1 billion: 'Jurassic Park', 'Star Wars', and 'Avatar'.",
  "In 'Frozen', the character of Elsa was inspired by the Snow Queen from Hans Christian Andersen's fairy tale.",
  "The iconic phrase 'May the Force be with you' has become a staple in popular culture since 'Star Wars'.",
  "The first movie to gross over $1 billion at the box office was 'Titanic'."
];

const LoadingScreen = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Get a random movie fact from the array
    const randomFact = movieFacts[Math.floor(Math.random() * movieFacts.length)];
    setFact(randomFact);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color="orange" /> {/* Large spinner */}
      <Text style={styles.loadingText}>Did you know? {fact}</Text> {/* Display random movie fact */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F', // Background color
  },
  loadingText: {
    marginTop: 20,
    fontSize: 24, // Larger text size for better visibility
    color: 'white', // Text color
    textAlign: 'center', // Center the text
    paddingHorizontal: 20, // Add some padding
  },
});

export default LoadingScreen;
