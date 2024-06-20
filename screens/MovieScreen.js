import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import inceptionImage from '../assets/inception.jpg';
import matrixImage from '../assets/matrix.jpg';
import interstellarImage from '../assets/interstellar.jpg';

const movies = [
  {
    id: '1',
    title: 'A Origem',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: inceptionImage,
    rating: 4.8,
    likes: 0,
    comments: [],
  },
  {
    id: '2',
    title: 'The Matrix',
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    image: matrixImage,
    rating: 4.5,
    likes: 0,
    comments: [],
  },
  {
    id: '3',
    title: 'Interstellar',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: interstellarImage,
    rating: 4.9,
    likes: 0,
    comments: [],
  },
];

export default function MovieScreen() {
  const [movieList, setMovieList] = useState(movies);
  const [commentText, setCommentText] = useState({});

  const handleLike = (id) => {
    const updatedMovies = movieList.map((movie) => {
      if (movie.id === id) {
        return { ...movie, likes: movie.likes + 1 };
      }
      return movie;
    });
    setMovieList(updatedMovies);
  };

  const handleAddComment = (id) => {
    const updatedMovies = movieList.map((movie) => {
      if (movie.id === id) {
        const newComments = [...movie.comments, commentText[id] || ''];
        return { ...movie, comments: newComments };
      }
      return movie;
    });
    setMovieList(updatedMovies);
    setCommentText({ ...commentText, [id]: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={movieList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <View style={styles.headerContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      size={24}
                      color={index < Math.floor(item.rating) ? '#FFD700' : '#ccc'}
                      style={styles.star}
                    />
                  ))}
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
                <TouchableOpacity style={styles.loveButton} onPress={() => handleLike(item.id)}>
                  <FontAwesome name="heart" size={24} color="#FF0000" />
                  <Text style={styles.likesText}>{item.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.synopsisContainer}>
              <Text style={styles.synopsis}>{item.synopsis}</Text>
            </View>
            <FlatList
              data={item.comments}
              keyExtractor={(comment, index) => index.toString()}
              renderItem={({ item: comment }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.comment}>{comment}</Text>
                </View>
              )}
            />
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentBox}
                placeholder="Adicionar um comentário..."
                multiline
                value={commentText[item.id] || ''}
                onChangeText={(text) => setCommentText({ ...commentText, [item.id]: text })}
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => handleAddComment(item.id)}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', 
  },
  movieItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff', 
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 5,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    marginRight: 5,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loveButton: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  synopsisContainer: {
    marginTop: 10,
  },
  synopsis: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  comment: {
    fontSize: 16,
  },
});
