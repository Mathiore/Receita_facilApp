import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Plus, Trash2, SquareCheck as CheckSquare, Square } from 'lucide-react-native';
import { useShoppingList } from '@/hooks/useShoppingList';

export default function ShoppingListScreen() {
  const [newItem, setNewItem] = useState('');
  const { shoppingList, addToShoppingList, removeFromShoppingList, toggleItemCompleted } = useShoppingList();

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToShoppingList([newItem.trim()]);
      setNewItem('');
      Keyboard.dismiss();
    }
  };

  const renderShoppingItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => toggleItemCompleted(item.id)}
      >
        {item.completed ? (
          <CheckSquare size={24} color="#E25822" />
        ) : (
          <Square size={24} color="#CCCCCC" />
        )}
      </TouchableOpacity>
      
      <Text style={[
        styles.itemText,
        item.completed && styles.completedItemText
      ]}>
        {item.name}
      </Text>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => removeFromShoppingList(item.id)}
      >
        <Trash2 size={20} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Sua lista de compras está vazia.
      </Text>
      <Text style={styles.emptySubtext}>
        Adicione itens manualmente ou a partir de receitas.
      </Text>
    </View>
  );

  // Group items by completion status
  const sections = [
    {
      title: 'A comprar',
      data: shoppingList.filter(item => !item.completed),
    },
    {
      title: 'Comprados',
      data: shoppingList.filter(item => item.completed),
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Compras</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Adicionar item..."
            placeholderTextColor="#A0A0A0"
            returnKeyType="done"
            onSubmitEditing={handleAddItem}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddItem}
          >
            <Plus color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={sections[0].data.concat(sections[1].data)}
          renderItem={renderShoppingItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          ListHeaderComponent={
            sections[0].data.length > 0 ? (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>A comprar</Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            sections[1].data.length > 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Comprados</Text>
                </View>
                {sections[1].data.map(item => renderShoppingItem({ item }))}
              </>
            ) : null
          }
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
  listContent: {
    flexGrow: 1,
  },
  sectionHeader: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
});