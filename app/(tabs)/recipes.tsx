import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock, Filter } from 'lucide-react-native';
import { mockRecipes } from '@/data/recipes';
import { StatusBar } from 'expo-status-bar';

export default function RecipesScreen() {
  const router = useRouter();
  const { ingredients } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    time: '',
    difficulty: '',
    diet: '',
  });
  
  const parsedIngredients = ingredients 
    ? JSON.parse(String(ingredients)) 
    : [];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredRecipes = searchRecipes(parsedIngredients);
      setRecipes(filteredRecipes);
      setLoading(false);
    }, 1500);
  }, [ingredients]);

  const searchRecipes = (ingredientsList) => {
    // Filter recipes based on ingredients match
    return mockRecipes.map(recipe => {
      const matchCount = recipe.ingredients.filter(item => 
        ingredientsList.some(ing => 
          item.name.toLowerCase().includes(ing.toLowerCase())
        )
      ).length;
      
      const matchPercentage = Math.round((matchCount / recipe.ingredients.length) * 100);
      
      return {
        ...recipe,
        matchPercentage,
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const applyFilters = (type, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: selectedFilters[type] === value ? '' : value
    });
  };

  const getFilteredRecipes = () => {
    let filtered = [...recipes];
    
    if (selectedFilters.time) {
      if (selectedFilters.time === 'quick') {
        filtered = filtered.filter(r => r.timeMinutes <= 30);
      } else if (selectedFilters.time === 'medium') {
        filtered = filtered.filter(r => r.timeMinutes > 30 && r.timeMinutes <= 60);
      } else if (selectedFilters.time === 'long') {
        filtered = filtered.filter(r => r.timeMinutes > 60);
      }
    }
    
    if (selectedFilters.difficulty) {
      filtered = filtered.filter(r => r.difficulty === selectedFilters.difficulty);
    }
    
    if (selectedFilters.diet) {
      filtered = filtered.filter(r => r.dietaryTags.includes(selectedFilters.diet));
    }
    
    return filtered;
  };

  const renderFilterButton = (type, value, label) => {
    const isSelected = selectedFilters[type] === value;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
        onPress={() => applyFilters(type, value)}
      >
        <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 50) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color="#333333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receitas Encontradas</Text>
        <TouchableOpacity style={styles.filterIconButton}>
          <Filter color="#333333" size={24} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredientes selecionados:</Text>
        <View style={styles.ingredientsList}>
          {parsedIngredients.map((item, index) => (
            <View key={index} style={styles.ingredientChip}>
              <Text style={styles.ingredientText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filtros:</Text>
        <View style={styles.filtersScrollContainer}>
          <FlatList
            data={[
              { type: 'time', value: 'quick', label: 'Até 30 min' },
              { type: 'time', value: 'medium', label: '30-60 min' },
              { type: 'time', value: 'long', label: '60+ min' },
              { type: 'difficulty', value: 'fácil', label: 'Fácil' },
              { type: 'difficulty', value: 'médio', label: 'Médio' },
              { type: 'difficulty', value: 'difícil', label: 'Difícil' },
              { type: 'diet', value: 'vegetariano', label: 'Vegetariano' },
              { type: 'diet', value: 'sem glúten', label: 'Sem Glúten' },
              { type: 'diet', value: 'low carb', label: 'Low Carb' },
            ]}
            renderItem={({ item }) => renderFilterButton(item.type, item.value, item.label)}
            keyExtractor={(item, index) => `${item.type}-${item.value}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E25822" />
          <Text style={styles.loadingText}>Buscando receitas...</Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredRecipes()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.recipeCard}
              onPress={() => router.push(`/(tabs)/recipe-detail/${item.id}`)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.recipeImage} 
              />
              <View style={styles.recipeContent}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <View style={styles.recipeMetaContainer}>
                  <View style={styles.recipeMeta}>
                    <Clock size={16} color="#666666" />
                    <Text style={styles.recipeMetaText}>
                      {item.timeMinutes} min
                    </Text>
                  </View>
                  <Text style={styles.recipeDifficulty}>
                    {item.difficulty}
                  </Text>
                </View>
                <View style={styles.matchContainer}>
                  <Text style={styles.matchText}>Compatibilidade:</Text>
                  <View style={styles.matchPercentageContainer}>
                    <View 
                      style={[
                        styles.matchPercentageBar, 
                        { 
                          width: `${item.matchPercentage}%`,
                          backgroundColor: getMatchColor(item.matchPercentage)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.matchPercentageText,
                    { color: getMatchColor(item.matchPercentage) }
                  ]}>
                    {item.matchPercentage}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.recipesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma receita encontrada com os ingredientes e filtros selecionados.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  filterIconButton: {
    padding: 4,
  },
  ingredientsContainer: {
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333333',
  },
  filtersContainer: {
    padding: 16,
    paddingTop: 0,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 8,
  },
  filtersScrollContainer: {
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterButtonSelected: {
    backgroundColor: '#E25822',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333333',
  },
  filterButtonTextSelected: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  recipesList: {
    padding: 16,
  },
  recipeCard: {
    flexDirection: 'row',
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
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  recipeContent: {
    flex: 1,
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  recipeMetaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  recipeDifficulty: {
    fontSize: 14,
    color: '#666666',
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  matchPercentageContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  matchPercentageBar: {
    height: '100%',
    borderRadius: 4,
  },
  matchPercentageText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'right',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});