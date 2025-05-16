import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, User, Heart, ShoppingCart, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    avatar: 'https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  };
  
  // Mock dietary preferences
  const dietaryPreferences = [
    { id: '1', name: 'Vegetariano', enabled: false },
    { id: '2', name: 'Sem Glúten', enabled: true },
    { id: '3', name: 'Sem Lactose', enabled: false },
    { id: '4', name: 'Low Carb', enabled: true },
  ];
  
  const [preferences, setPreferences] = useState(dietaryPreferences);
  
  const togglePreference = (id) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };
  
  const renderMenuItem = (icon, title, onPress) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user.avatar }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          {renderMenuItem(
            <User size={20} color="#E25822" style={styles.menuIcon} />,
            'Informações Pessoais',
            () => {}
          )}
          
          {renderMenuItem(
            <Heart size={20} color="#E25822" style={styles.menuIcon} />,
            'Receitas Favoritas',
            () => {}
          )}
          
          {renderMenuItem(
            <ShoppingCart size={20} color="#E25822" style={styles.menuIcon} />,
            'Histórico de Listas de Compras',
            () => {}
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências Alimentares</Text>
          
          {preferences.map(pref => (
            <View key={pref.id} style={styles.preferenceItem}>
              <Text style={styles.preferenceText}>{pref.name}</Text>
              <Switch
                value={pref.enabled}
                onValueChange={() => togglePreference(pref.id)}
                trackColor={{ false: '#CCCCCC', true: '#E25822' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#CCCCCC', true: '#E25822' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Modo Escuro</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#CCCCCC', true: '#E25822' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {renderMenuItem(
            <Settings size={20} color="#E25822" style={styles.menuIcon} />,
            'Mais Configurações',
            () => {}
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#F44336" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Versão 1.0.0</Text>
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
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  preferenceText: {
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F44336',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: '#999999',
    marginBottom: 24,
  },
});