import { StyleSheet, View, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { useLoginWithOAuth, OAuthProviderID } from "@privy-io/expo";
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function SignIn() {
  const {login} = useLoginWithOAuth()

  async function handleSignIn(provider: OAuthProviderID){
    try{
      await login({provider})
    } catch (error){
      console.log(error)
    } finally {
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, width: Dimensions.get("window").width, backgroundColor: "#000"}}/>
      <View style={{paddingVertical: 20}}>
        {
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
