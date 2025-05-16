import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Timer, Leaf, Cake, DollarSign } from 'lucide-react-native';

interface CategoryCardProps {
  name: string;
  color: string;
  icon: string;
}

export function CategoryCard({ name, color, icon }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'timer':
        return <Timer size={24} color="#FFFFFF" />;
      case 'leaf':
        return <Leaf size={24} color="#FFFFFF" />;
      case 'cake':
        return <Cake size={24} color="#FFFFFF" />;
      case 'dollar-sign':
        return <DollarSign size={24} color="#FFFFFF" />;
      default:
        return <Timer size={24} color="#FFFFFF" />;
    }
  };
  
  const navigateToCategory = () => {
    router.push({
      pathname: '/(tabs)/recipes',
      params: { category: name.toLowerCase() }
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }] as ViewStyle}
      onPress={navigateToCategory}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});