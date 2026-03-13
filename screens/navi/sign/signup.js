import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Rule = ({ ok, text }) => (
  <View style={styles.ruleRow}>
    <Ionicons
      name={ok ? 'checkmark-circle' : 'close-circle'}
      size={18}
      color={ok ? '#2ecc71' : '#e74c3c'}
    />
    <Text style={[styles.ruleText, { color: ok ? '#2ecc71' : '#e74c3c' }]}>
      {text}
    </Text>
  </View>
);

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[@$!%*#?&]/.test(password);
  const hasLength = password.length >= 8;

  const passwordValid = hasLetter && hasNumber && hasSymbol && hasLength;

  const isFilled = (v) => v.trim().length > 0;

  const inputStyle = (value) => [
    styles.inputRow,
    { borderColor: isFilled(value) ? '#2ecc71' : '#e74c3c' },
  ];

  const handleSignup = () => {
    if (!name || !phone || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields.');

      return;
    }

    if (!passwordValid) {
     Alert.alert('Weak Password', 'Please meet all the requirements.');

      return;
    }

    if (password !== confirm) {
    Alert.alert('Error', 'Passwords do not match.');

      return;
    }

   Alert.alert('Success 🎉', 'Account created successfully.');

  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, marginTop: wp('15%') }}
    >
      {/* ◀ Go Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      {/* Name */}
      <View style={inputStyle(name)}>
        <Ionicons name="person-outline" size={22} color="#555" />
        <TextInput
          placeholder="Name"
          style={styles.input}
          textAlign="right"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Phone */}
      <View style={inputStyle(phone)}>
        <Ionicons name="call-outline" size={22} color="#555" />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
          textAlign="right"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Email */}
      <View style={inputStyle(email)}>
        <Ionicons name="mail-outline" size={22} color="#555" />
        <TextInput
          placeholder="Gmail"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          textAlign="right"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={inputStyle(password)}>
        <Ionicons name="lock-closed-outline" size={22} color="#555" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          textAlign="right"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Password rules */}
      <View style={styles.rulesBox}>
  <Rule ok={hasLetter} text="Must contain a letter (A–Z / a–z)" />
  <Rule ok={hasNumber} text="Must contain a number (0–9)" />
  <Rule ok={hasSymbol} text="Must contain a symbol (@ $ ! %)" />
  <Rule ok={hasLength} text="Must be at least 8 characters long" />
</View>


      {/* Confirm */}
      <View style={inputStyle(confirm)}>
        <Ionicons name="refresh-outline" size={22} color="#555" />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          textAlign="right"
          value={confirm}
          onChangeText={setConfirm}
        />
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('7%'),
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ec8600',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },

  title: {
    fontSize: wp('6%'),
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },

  inputRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderWidth: 1.5,
    marginBottom: hp('2%'),
  },

  input: {
    flex: 1,
    fontSize: wp('4%'),
    marginHorizontal: 10,
    color: '#000',
  },

  rulesBox: {
    marginBottom: hp('2%'),
    paddingHorizontal: wp('2%'),
  },

  ruleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 6,
  },

  ruleText: {
    fontSize: wp('3.6%'),
    marginHorizontal: 6,
  },

  signupBtn: {
    backgroundColor: 'rgb(236, 134, 0)',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: hp('3%'),
  },

  signupText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
});
