import { StyleSheet, View, Text, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useLoginWithOAuth, OAuthProviderID } from "@privy-io/expo";
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import Hero from '@/components/hero';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import * as Haptics from "expo-haptics"

export default function SignIn() {
  const router = useRouter();
  const [progress, setProgress] = useState<boolean>(false)
  const {login} = useLoginWithOAuth();

  async function handleSignIn(provider: OAuthProviderID){
    setProgress(true)
    try{
      await login({provider})
      router.replace("/(home)")
    } catch (error){
      console.log(error)
    } finally {
       setProgress(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      
<<<<<<< HEAD
      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      };
=======
            return () => {
             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
            };
>>>>>>> 10b80d3a07165788680cbc466cee93c0e4abe4fd
    },[])
  )

  return (
    <View style={styles.container}>
      <Hero />
      <View style={{paddingVertical: 20}}>
        {
          progress ? 
            <ActivityIndicator size={40}/>
          :
            Platform.OS === "ios" ?
              <AppleAuthentication.AppleAuthenticationButton 
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={styles.button}
                onPress={() => handleSignIn("apple")}
              />
            :
              <GoogleSigninButton 
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => handleSignIn("google")}
                disabled={false}
              />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200, 
    height: 44,
  },
});
