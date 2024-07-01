import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {

  const [fetchedMessage, setFetchedMessage] = useState('');
  const [loading, setLoading] = useState(true); // Dodajemy nowy state do monitorowania stanu ładowania danych

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    //Dostep do chronionych danych przez token
    axios.get('https://react-native-course-ceee5-default-rtdb.firebaseio.com/message.json?auth=' + token)
      .then((response) => {
        setFetchedMessage(response.data);
        setLoading(false); // Ustawiamy loading na false po pobraniu danych
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Jeśli wystąpi błąd, ustawiamy loading na false
      });
  }, [token]);

  if (loading) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
