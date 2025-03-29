import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

type ButtonsProps = {
  onPress1: () => void;
  onPress2: () => void;
  onPress3: () => void;
};

const Buttons: React.FC<ButtonsProps> = ({ onPress1, onPress2, onPress3 }) => {
  return (
    <View style={styles.container}>
      <Button title="Correos" onPress={onPress1} color="#FF5733" /> {/* Rojo */}
      <Button title="Opción 1" onPress={onPress2} color="#3498DB" /> {/* Azul */}
      <Button title="Opción 2" onPress={onPress3} color="#FF5733" /> {/* Verde */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default Buttons;
