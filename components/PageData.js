import React from 'react';
import {View, Text, TextInput} from 'react-native';

const Page = ({ width, height, children }) => (
  <View style={{ width, height }}>
    {children}
  </View>
);

const PageContent = ({ children }) => (
  <View style={styles.content}>
    <View style={{ flex: 0 }}>
      {children}
    </View>
  </View>
);


const PageData = ({inputKeyboardType, placeholder, onChangeText, input, isLight, image, title, subtitle, ...rest}) => (
  <Page {...rest}>
    <PageContent>
      <View style={styles.image}>
        {image}
      </View>
      <Text style={{ ...styles.title, ...(isLight ? styles.titleLight : {}) }}>
        {title}
      </Text>
      <Text style={{ ...styles.subtitle, ...(isLight ? styles.subtitleLight : {}) }}>
        {subtitle}
      </Text>
      {input && <View style={{ ...styles.inputContainer, ...(isLight ? styles.inputContainerLight : {}) }}>
        <TextInput
          multiline={false}
          style={{ ...styles.input, ...(isLight ? styles.inputLight : {}) }}
          placeholder={placeholder}
          placeholderTextColor={isLight ? 'rgba(255, 255, 255, 0.7)' : '#fff'}
          onChangeText={onChangeText}
          keyboardType={inputKeyboardType}
        />
      </View>}
    </PageContent>
  </Page>
);

PageData.defaultProps = {
  onChangeText: () => {},
  placeholder: '',
  input: false
};

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerLight: {
    borderBottomColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    height: 40,
    textAlign: 'center',
    color: '#fff',
  },
  inputLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  image: {
    flex: 0,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    paddingBottom: 15,
  },
  titleLight: {
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

export default PageData;
