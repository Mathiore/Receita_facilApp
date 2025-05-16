import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Clock, Users, Heart } from 'lucide-react-native';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => router.push(`/(tabs)/recipe-detail/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={16} color="#666666" />
            <Text style={styles.metaText}>{item.timeMinutes} min</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Users size={16} color="#666666" />
            <Text style={styles.metaText}>{item.servings} porções</Text>
          </View>
        </View>
        <Text style={styles.recipeDifficulty}>{item.difficulty}</Text>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Heart size={24} color="#E25822" fill="#E25822" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Heart size={64} color="#CCCCCC" />
      <Text style={styles.emptyText}>
        Você ainda não tem receitas favoritas
      </Text>
      <Text style={styles.emptySubtext}>
        Quando encontrar uma receita que goste, toque no coração para salvá-la aqui.
      </Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.browseButtonText}>Explorar Receitas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>Receitas Favoritas</Text>
        
        <FlatList
          data={favorites}
          renderItem={renderRecipeCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 24,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  recipeContent: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 8,
  },
  recipeDifficulty: {
    fontSize: 14,
    color: '#666666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#E25822',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});