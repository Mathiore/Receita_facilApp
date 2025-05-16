import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Plus, X } from 'lucide-react-native';
import { CategoryCard } from '@/components/CategoryCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const commonIngredients = [
    'Arroz', 'Feijão', 'Batata', 'Tomate', 'Cebola', 
    'Alho', 'Frango', 'Carne moída', 'Ovo', 'Leite',
    'Queijo', 'Azeite', 'Sal', 'Pimenta', 'Farinha de trigo',
    'Açúcar', 'Manteiga', 'Óleo', 'Macarrão', 'Milho'
  ];

  const findSuggestions = (text: string) => {
    if (text.length > 1) {
      const filtered = commonIngredients.filter(item => 
        item.toLowerCase().includes(text.toLowerCase()) && 
        !ingredients.includes(item)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addIngredient = (item: string) => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setIngredient('');
      setSuggestions([]);
    }
  };

  const removeIngredient = (item: string) => {
    setIngredients(ingredients.filter(i => i !== item));
  };

  const searchRecipes = () => {
    router.push({
      pathname: '/(tabs)/recipes',
      params: { ingredients: JSON.stringify(ingredients) }
    });
  };

  const categories = [
    { id: '1', name: 'Rápidas', icon: 'timer', color: '#FAC898' },
    { id: '2', name: 'Vegetarianas', icon: 'leaf', color: '#A8D672' },
    { id: '3', name: 'Sobremesas', icon: 'cake', color: '#F9A7BB' },
    { id: '4', name: 'Econômicas', icon: 'dollar-sign', color: '#72CDD2' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>Cozinha Fácil</Text>
        <Text style={styles.subtitle}>O que tem na sua geladeira?</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={ingredient}
            onChangeText={(text) => {
              setIngredient(text);
              findSuggestions(text);
            }}
            placeholder="Digite um ingrediente..."
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addIngredient(ingredient)}
          >
            <Plus color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
        
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item) => (
              <TouchableOpacity 
                key={item} 
                style={styles.suggestionItem}
                onPress={() => addIngredient(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredientes adicionados</Text>
          
          {ingredients.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum ingrediente adicionado</Text>
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ingredientsList}
            >
              {ingredients.map((item) => (
                <View key={item} style={styles.ingredientChip}>
                  <Text style={styles.ingredientText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeIngredient(item)}>
                    <X size={16} color="#E25822" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <TouchableOpacity 
          style={[
            styles.searchButton, 
            ingredients.length === 0 ? styles.searchButtonDisabled : null
          ]}
          onPress={searchRecipes}
          disabled={ingredients.length === 0}
        >
          <Search color="#FFFFFF" size={24} />
          <Text style={styles.searchButtonText}>Buscar Receitas</Text>
        </TouchableOpacity>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard 
                name={item.name} 
                color={item.color} 
                icon={item.icon} 
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.recommendedContainer}>
          <Text style={styles.sectionTitle}>Receitas populares</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
          >
            <TouchableOpacity 
              style={styles.recipeCard}
              onPress={() => router.push('/(tabs)/recipe-detail/1')}
            >
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg' }} 
                style={styles.recipeImage} 
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>Macarrão ao Molho Branco</Text>
                <Text style={styles.recipeTime}>35 min • Fácil</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.recipeCard}
              onPress={() => router.push('/(tabs)/recipe-detail/2')}
            >
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg' }} 
                style={styles.recipeImage} 
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>Bolo de Chocolate</Text>
                <Text style={styles.recipeTime}>45 min • Médio</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#E25822',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 120,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333333',
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
  },
  ingredientsList: {
    paddingVertical: 8,
  },
  ingredientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333333',
    marginRight: 6,
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#E25822',
    borderRadius: 8,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesList: {
    paddingRight: 16,
  },
  recommendedContainer: {
    marginBottom: 24,
  },
  recommendedList: {
    paddingRight: 16,
  },
  recipeCard: {
    width: width * 0.6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginRight: 16,
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
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666666',
  },
});