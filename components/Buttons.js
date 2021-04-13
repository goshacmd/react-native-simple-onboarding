import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const SymbolButton = ({ isLight, size, onPress, style, textStyle, children }) => (
  <View style={{ height: size, width: size, justifyContent: 'center', ...style }}>
    <TouchableOpacity style={{ flex: 0 }} onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={{ textAlign: 'center', fontSize: size / 1.7, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

const TextButton = ({ isLight, size, onPress, textStyle, children }) => (
  <View style={{ flex: 0 }}>
    <TouchableOpacity style={{ flex: 0 }} onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={{ fontSize: size / 2.5, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export { SymbolButton, TextButton };
