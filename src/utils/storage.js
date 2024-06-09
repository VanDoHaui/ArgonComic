import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to write data to AsyncStorage
const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Function to retrieve data from AsyncStorage
const get = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Function to delete an item from AsyncStorage
const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const removeAll = async () => {
  try {
    const email = await AsyncStorage.getItem(key.email);
    await AsyncStorage.clear();
    await AsyncStorage.setItem(key.email, email);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const key = {
  access_token: 'access_token',
  email: 'email',
  user: 'user',
};

export default {save, get, remove, removeAll, key};
