// App.js — Root Navigator
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login' | 'register' | 'home'
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setScreen('home');
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      {screen === 'login' && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onGoRegister={() => setScreen('register')}
        />
      )}

      {screen === 'register' && (
        <RegisterScreen
          onRegisterSuccess={handleRegisterSuccess}
          onGoLogin={() => setScreen('login')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen user={user} onLogout={handleLogout} />
      )}
    </View>
  );
}
