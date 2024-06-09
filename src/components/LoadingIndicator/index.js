import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const LoadingIndicator = ({isLoading = false}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.viewIndicator}>
          <ActivityIndicator
            size="large"
            style={styles.indicator}
            color={'#999999'}
          />
        </View>
      </View>
    );
  }
  return null;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    zIndex: 33333,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewIndicator: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {},
});
