import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add AsyncStorage to package.json dependencies
const FAVORITES_STORAGE_KEY = '@cozinha_facil_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  };

  const toggleFavorite = (recipe) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.id === recipe.id);
    let newFavorites;
    
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe];
    }
    
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    
    return !isCurrentlyFavorite;
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loading
  };
}