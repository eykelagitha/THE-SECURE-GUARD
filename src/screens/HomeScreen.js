// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import COLORS from '../constants/colors';

const FEATURES = [
  { icon: '🔒', title: 'End-to-End Encrypted', desc: 'Semua pesanmu dienkripsi penuh' },
  { icon: '🛡️', title: 'Zero Data Breach', desc: 'Data kamu aman dari kebocoran' },
  { icon: '🕵️', title: 'Private by Default', desc: 'Privasi adalah prioritas utama' },
  { icon: '⚡', title: 'Real-Time Secure', desc: 'Komunikasi aman secara real-time' },
];

export default function HomeScreen({ user, onLogout }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.wave}>👋</Text>
            <Text style={styles.greeting}>Selamat Datang,</Text>
            <Text style={styles.username}>{user ? user.name : 'Guardian'}!</Text>
            <Text style={styles.tagline}>
              Kamu sekarang terlindungi oleh SecureGuard 🛡️
            </Text>
          </View>
          <Text style={styles.bannerDecor}>🛡️</Text>
        </View>

        {/* Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusDot} />
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Akun Aktif & Aman</Text>
            <Text style={styles.statusEmail}>{user ? user.email : ''}</Text>
          </View>
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Fitur Keamanan Aktif</Text>
        <View style={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Score */}
        <View style={styles.scoreCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.scoreLabel}>Security Score</Text>
            <Text style={styles.scoreValue}>98/100</Text>
            <Text style={styles.scoreStatus}>🟢 Excellent Protection</Text>
          </View>
          <Text style={styles.scoreTrophy}>🏆</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.btnLogout} onPress={onLogout} activeOpacity={0.85}>
          <Text style={styles.btnLogoutText}>🚪  Keluar dari Akun</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1, backgroundColor: COLORS.bg },
  container: { paddingBottom: 40 },

  banner: {
    margin: 16,
    marginTop: 24,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wave: { fontSize: 32, marginBottom: 8 },
  greeting: { fontSize: 15, color: COLORS.muted, fontWeight: '500' },
  username: { fontSize: 28, fontWeight: '800', color: COLORS.accent, marginVertical: 3 },
  tagline: { fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 17 },
  bannerDecor: { fontSize: 52, opacity: 0.35, marginLeft: 8 },

  statusCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.accentGlow,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.accent,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    marginRight: 10,
  },
  statusTitle: { fontSize: 13, fontWeight: '700', color: COLORS.accent },
  statusEmail: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: 16,
    marginTop: 26,
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  featureCard: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    margin: '1.5%',
  },
  featureIcon: { fontSize: 22, marginBottom: 8 },
  featureTitle: { fontSize: 12, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  featureDesc: { fontSize: 11, color: COLORS.muted, lineHeight: 15 },

  scoreCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: { fontSize: 12, color: COLORS.muted, fontWeight: '500' },
  scoreValue: { fontSize: 34, fontWeight: '800', color: COLORS.accent, marginVertical: 3 },
  scoreStatus: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  scoreTrophy: { fontSize: 50, marginLeft: 14 },

  btnLogout: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,107,107,0.3)',
  },
  btnLogoutText: { fontSize: 15, fontWeight: '600', color: COLORS.error },
});
