import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock, Users, Heart, Share2, Check, Plus, ShoppingCart } from 'lucide-react-native';
import { mockRecipes } from '@/data/recipes';
import { StatusBar } from 'expo-status-bar';
import { useFavorites } from '@/hooks/useFavorites';
import { useShoppingList } from '@/hooks/useShoppingList';

export default function RecipeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addToShoppingList } = useShoppingList();
  
  useEffect(() => {
    // Find recipe by ID
    const recipeData = mockRecipes.find(r => r.id.toString() === id);
    if (recipeData) {
      setRecipe(recipeData);
    }
  }, [id]);

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleShare = async () => {
    if (!recipe) return;
    
    try {
      await Share.share({
        message: `Confira essa receita de ${recipe.title} que encontrei no Cozinha Fácil!`,
        url: 'https://cozinhafacil.app/receitas/' + recipe.id,
      });
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };

  const addMissingIngredientsToShoppingList = () => {
    if (!recipe) return;
    
    // For demo purposes, let's assume the first 2 ingredients are missing
    const missingIngredients = recipe.ingredients.slice(0, 2).map(i => i.name);
    addToShoppingList(missingIngredients);
    
    // Show confirmation feedback
    alert('Ingredientes adicionados à lista de compras!');
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Carregando receita...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.imageOverlay} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => toggleFavorite(recipe)}
            >
              <Heart 
                size={24} 
                color={isFavorite(recipe.id) ? '#E25822' : '#FFFFFF'} 
                fill={isFavorite(recipe.id) ? '#E25822' : 'transparent'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={18} color="#666666" />
              <Text style={styles.metaText}>{recipe.timeMinutes} min</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Users size={18} color="#666666" />
              <Text style={styles.metaText}>{recipe.servings} porções</Text>
            </View>
            <View style={styles.metaDivider} />
            <Text style={styles.metaText}>{recipe.difficulty}</Text>
          </View>
          
          {recipe.dietaryTags.length > 0 && (
            <View style={styles.tagsContainer}>
              {recipe.dietaryTags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={addMissingIngredientsToShoppingList}
            >
              <ShoppingCart size={16} color="#FFFFFF" />
              <Text style={styles.addToCartText}>Adicionar à lista</Text>
            </TouchableOpacity>
            
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>
                  • {ingredient.quantity} {ingredient.name}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modo de Preparo</Text>
            {recipe.steps.map((step, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.stepItem,
                  completedSteps.includes(index) && styles.stepItemCompleted
                ]}
                onPress={() => toggleStep(index)}
              >
                <View style={styles.stepNumber}>
                  {completedSteps.includes(index) ? (
                    <Check size={14} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  )}
                </View>
                <Text 
                  style={[
                    styles.stepText,
                    completedSteps.includes(index) && styles.stepTextCompleted
                  ]}
                >
                  {step}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {recipe.tips && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dicas do Chef</Text>
              <Text style={styles.tipsText}>{recipe.tips}</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E25822',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  ingredientItem: {
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepItemCompleted: {
    opacity: 0.7,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E25822',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  stepTextCompleted: {
    textDecorationLine: 'line-through',
  },
  tipsText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});