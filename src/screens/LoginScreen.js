// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputField from '../components/InputField';
import COLORS from '../constants/colors';
import { validateLoginForm } from '../utils/validation';

export default function LoginScreen({ onLoginSuccess, onGoRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: '' }));

  const handleLogin = () => {
    const { isValid, errors: formErrors } = validateLoginForm(email, password);
    if (!isValid) {
      setErrors(formErrors);
      return;
    }
    const name = email.split('@')[0];
    onLoginSuccess({ name, email: email.trim() });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>🛡️</Text>
          </View>
          <Text style={styles.appTitle}>SecureGuard</Text>
          <Text style={styles.appSub}>Social Network yang Aman & Terpercaya</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masuk ke Akun</Text>
          <Text style={styles.cardSub}>Selamat datang kembali, Guardian! 👋</Text>

          <InputField
            label="Email"
            value={email}
            onChangeText={(t) => { setEmail(t); clearError('email'); }}
            placeholder="nama@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={(t) => { setPassword(t); clearError('password'); }}
            placeholder="Minimal 6 karakter"
            secureTextEntry={true}
            error={errors.password}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>🔐  Masuk Sekarang</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divText}>atau</Text>
            <View style={styles.divLine} />
          </View>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={onGoRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSecondaryText}>✨  Daftar Disini</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footnote}>
          Dengan masuk, kamu setuju dengan{' '}
          <Text style={styles.footnoteLink}>Syarat & Ketentuan</Text> kami.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 28,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: COLORS.accentGlow,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoIcon: { fontSize: 34 },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 1,
  },
  appSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 22,
  },
  btnPrimary: {
    backgroundColor: COLORS.accent,
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0D1117',
    letterSpacing: 0.3,
  },
  btnSecondary: {
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  divText: { fontSize: 12, color: COLORS.dim, marginHorizontal: 10 },
  footnote: {
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.dim,
    paddingBottom: 16,
  },
  footnoteLink: { color: COLORS.accent, fontWeight: '600' },
});
