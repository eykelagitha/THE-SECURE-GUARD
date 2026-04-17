// src/screens/RegisterScreen.js
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
import { validateRegisterForm } from '../utils/validation';

export default function RegisterScreen({ onRegisterSuccess, onGoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: '' }));

  const handleRegister = () => {
    const { isValid, errors: formErrors } = validateRegisterForm({
      name,
      email,
      phone,
      password,
      confirmPassword,
    });
    if (!isValid) {
      setErrors(formErrors);
      return;
    }
    onRegisterSuccess({ name: name.trim(), email: email.trim() });
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = password && confirmPassword && password !== confirmPassword;

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
          <Text style={styles.appSub}>Buat akun yang aman dalam hitungan detik</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Buat Akun Baru</Text>
          <Text style={styles.cardSub}>Bergabunglah dengan komunitas Guardian! 🚀</Text>

          <InputField
            label="Nama Lengkap"
            value={name}
            onChangeText={(t) => { setName(t); clearError('name'); }}
            placeholder="Nama kamu"
            autoCapitalize="words"
            error={errors.name}
          />

          <InputField
            label="Email"
            value={email}
            onChangeText={(t) => { setEmail(t); clearError('email'); }}
            placeholder="nama@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <InputField
            label="Nomor HP"
            value={phone}
            onChangeText={(t) => {
              setPhone(t.replace(/\D/g, ''));
              clearError('phone');
            }}
            placeholder="08xxxxxxxxxx (min. 10 digit)"
            keyboardType="phone-pad"
            maxLength={15}
            error={errors.phone}
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              clearError('password');
              clearError('confirmPassword');
            }}
            placeholder="Minimal 6 karakter"
            secureTextEntry={true}
            error={errors.password}
          />

          <InputField
            label="Konfirmasi Password"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); clearError('confirmPassword'); }}
            placeholder="Ulangi password kamu"
            secureTextEntry={true}
            error={errors.confirmPassword}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          {/* Real-time password match indicator */}
          {(passwordsMatch || passwordsMismatch) ? (
            <View style={styles.matchRow}>
              <Text style={passwordsMatch ? styles.matchOk : styles.matchFail}>
                {passwordsMatch ? '✅ Password cocok!' : '❌ Password belum cocok'}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>🚀  Daftar Sekarang</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divText}>sudah punya akun?</Text>
            <View style={styles.divLine} />
          </View>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={onGoLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSecondaryText}>🔐  Masuk Disini</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footnote}>
          Dengan mendaftar, kamu setuju dengan{' '}
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
  matchRow: { marginBottom: 10 },
  matchOk: { fontSize: 13, color: COLORS.accent, fontWeight: '600' },
  matchFail: { fontSize: 13, color: COLORS.error, fontWeight: '600' },
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
