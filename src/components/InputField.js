// src/components/InputField.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

/**
 * Reusable secure input component
 */
export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = '',
  maxLength,
  returnKeyType = 'next',
  onSubmitEditing,
  autoCapitalize = 'none',
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.box,
          focused && styles.boxFocused,
          !!error && styles.boxError,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.dim}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
      </View>
      {!!error && <Text style={styles.error}>⚠ {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginBottom: 7,
    letterSpacing: 0.3,
  },
  box: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
  },
  boxFocused: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(0,212,170,0.04)',
  },
  boxError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBg,
  },
  input: {
    fontSize: 15,
    color: COLORS.text,
    height: 50,
  },
  error: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 5,
    marginLeft: 2,
  },
});
