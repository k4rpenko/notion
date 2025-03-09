import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Text, Linking, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Main() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showPasswordPanel, setShowPasswordPanel] = useState(false);
    const [isVerificationStep, setIsVerificationStep] = useState(false);

    const handleTermsPress = () => {
      Linking.openURL('https://www.google.com');
    };
  
    const handlePrivacyPress = () => {
      Linking.openURL('https://www.google.com');
    };

    const handleSignInWithEmail = () => {
      setShowPasswordPanel(prevState => !prevState);
    };
  
    const handleVerifyCode = () => {
      console.log('Verification code entered: ' + verificationCode);
    };
  
    const handleNextStep = () => {
      setIsVerificationStep(true);
    };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.main}>
            <View style={styles.quote}>
              <Text style={styles.TextThank}>Imagine. Create. Progress.</Text>
              <Text style={styles.TextLogin}>Log in to your Wision account and continue to do so</Text>
            </View>
            <View style={styles.Logo}><Text style={styles.TextLogo}>LOGO</Text></View>
            <View style={styles.Sign}>
              <TouchableOpacity style={styles.Sign_Button}>
                <Image style={styles.Sign_logo} source={require('../../../assets/Logo/Google_Icons.png')}></Image>
                <Text style={styles.ButtonText}>Sign in with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Sign_Button}>
                <Image style={styles.Sign_logo} source={require('../../../assets/Logo/apple_icon.png')}></Image>
                <Text style={styles.ButtonText}>Sign in with Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Sign_Button} onPress={handleSignInWithEmail}>
                <Image style={styles.Sign_logo} source={require('../../../assets/Logo/Mail_Logo.png')} />
                <Text style={styles.ButtonText}>Sign in with Email</Text>
              </TouchableOpacity>
            </View>
            {showPasswordPanel && (
              <View style={styles.panel}>
                {!isVerificationStep ? (
                  <>
                    <View style={styles.line} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email address..."
                      placeholderTextColor={'#666666'}
                      value={email}
                      onChangeText={setEmail}
                      secureTextEntry
                    />
                    <Text style={styles.TextEmailConfig}>Use your email to receive a code for authorization or authentication</Text>
                    <TouchableOpacity style={styles.panelButton} onPress={handleNextStep}>
                      <Text style={styles.panelButtonText}>Next</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.line} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChangeText={setVerificationCode}
                      keyboardType="number-pad"
                    />
                    <TouchableOpacity style={styles.panelButton} onPress={handleVerifyCode}>
                      <Text style={styles.panelButtonText}>Verify</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
            <View style={styles.approval}>
              <Text style={styles.text}>
                Your name and photo are displayed to users who invite you to a workspace using your email. By continuing, you confirm that you understand and agree to the{' '}
                <Text style={styles.link} onPress={handleTermsPress}>
                  Terms and Conditions
                </Text>{' '}
                and{' '}
                <Text style={styles.link} onPress={handlePrivacyPress}>
                  Privacy Policy
                </Text>
                , which states that we will not share your data with any third parties.
              </Text>
            </View>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
      marginTop: '5%',
      padding: '10%',
      flex: 1, // Ensures the content stretches to fill available space
    },

    //Logo
    Logo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextLogo: {
      color: '#cccccc',
      padding: '25%',
    },

    //quote
    quote: {
      marginTop: 20,
    },
    TextThank: {
      fontSize: 22,
      color: '#fff',
      fontFamily: 'InterDisplay-SemiBold',
    },
    TextLogin: {
      fontFamily: 'InterDisplay-SemiBold',
      fontSize: 20,
      color: '#666666',
    },

    // Google Button
    Sign: {
      gap: 10,
      marginTop: 20,
    },
    Sign_Button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#333333',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      height: 40,
    },
    ButtonText: {
      fontFamily: 'InterDisplay-SemiBold',
      marginLeft: 10,
      color: '#fff',
      fontSize: 16,
    },
    Sign_logo:{
      height: 23,
      width: 23,
    },

    panel: {
    },
    input: {
      color: '#fff',
      height: 40,
      borderColor: '#333333',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    TextEmailConfig:{
      fontSize: 12,
      color: '#666666',
    },
    panelButton: {
      marginTop: '7%',
      backgroundColor: '#ff9900',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
    },
    panelButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    //
    line: {
      height: 1,
      backgroundColor: '#333333',
      marginVertical: 20,
    },
    //

    //approval
    approval: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
    },
    text: {
      fontSize: 12,
      color: '#666666',
    },
    link: {
      color: '#404040',
      textDecorationLine: 'underline',
    },
});
