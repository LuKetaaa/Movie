import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const movies = [
  {
    id: '1',
    title: 'Inception',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: './assets/AOrigemPoster.jpg',
  },
  {
    id: '2',
    title: 'The Matrix',
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    image: './assets/The Matrix.jpg',
  },
  {
    id: '3',
    title: 'Interstellar',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
  },
];

export default function MovieScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.synopsis}>{item.synopsis}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={24}
                  color={index < 3 ? '#FFD700' : '#ccc'} // Ajuste a lógica conforme necessário
                  style={styles.star}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.loveButton}>
              <FontAwesome name="heart" size={24} color="#FF0000" />
            </TouchableOpacity>
            <TextInput
              style={styles.commentBox}
              placeholder="Adicionar um comentário..."
              multiline
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  movieItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  synopsis: {
    fontSize: 16,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    marginRight: 5,
  },
  loveButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  commentBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
