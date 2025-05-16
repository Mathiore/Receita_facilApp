import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SHOPPING_LIST_STORAGE_KEY = '@cozinha_facil_shopping_list';

export function useShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = async () => {
    try {
      const storedList = await AsyncStorage.getItem(SHOPPING_LIST_STORAGE_KEY);
      if (storedList) {
        setShoppingList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error('Error loading shopping list', error);
    } finally {
      setLoading(false);
    }
  };

  const saveShoppingList = async (newList) => {
    try {
      await AsyncStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(newList));
    } catch (error) {
      console.error('Error saving shopping list', error);
    }
  };

  const addToShoppingList = (items) => {
    const timestamp = Date.now();
    const newItems = items.map((name, index) => ({
      id: `${timestamp}-${index}`,
      name,
      completed: false,
      addedAt: new Date().toISOString()
    }));
    
    const updatedList = [...shoppingList, ...newItems];
    setShoppingList(updatedList);
    saveShoppingList(updatedList);
  };

  const removeFromShoppingList = (itemId) => {
    const updatedList = shoppingList.filter(item => item.id !== itemId);
    setShoppingList(updatedList);
    saveShoppingList(updatedList);
  };

  const toggleItemCompleted = (itemId) => {
    const updatedList = shoppingList.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setShoppingList(updatedList);
    saveShoppingList(updatedList);
  };

  const clearCompletedItems = () => {
    const updatedList = shoppingList.filter(item => !item.completed);
    setShoppingList(updatedList);
    saveShoppingList(updatedList);
  };

  return {
    shoppingList,
    loading,
    addToShoppingList,
    removeFromShoppingList,
    toggleItemCompleted,
    clearCompletedItems
  };
}