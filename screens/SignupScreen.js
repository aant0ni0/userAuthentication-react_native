import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      navigation.replace('Login');

    } catch (error) {
      Alert.alert('Authentication failed', 'could not create user, please check your input and try again later');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
