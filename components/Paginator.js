import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

import PageDots from './PageDots';
import { SymbolButton, TextButton } from './Buttons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

const a = (small, regular, big, X, XMax) => {
  switch (true) {
    case SCREEN_HEIGHT === 896 || SCREEN_HEIGHT === 926:
      return XMax !== undefined ? XMax : big !== undefined ? big : regular;
    case SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 844:
      return X !== undefined ? X : regular;
    case SCREEN_WIDTH <= 360 || RATIO < 1.66:
      return small;
    case SCREEN_WIDTH < 414:
      return regular;
    default:
      return big !== undefined ? big : regular;
  }
}

const getDefaultStyle = (isLight) => ({
  color: isLight ? 'rgba(0, 0, 0, 0.8)' : '#fff',
});

const LeftButton = ({ isLight, leftText, ...props }) => (
  <TextButton {...props} textStyle={getDefaultStyle(isLight)}>
    {leftText}
  </TextButton>
);

const SkipButton = ({ isLight, ...props }) => (
  <TextButton {...props} textStyle={getDefaultStyle(isLight)}>
    Skip
  </TextButton>
);

const NextButton = ({ isLight, ...props }) => (
  <SymbolButton {...props} textStyle={getDefaultStyle(isLight)}>
    →
  </SymbolButton>
);
const DoneButton = ({ isLight, size, ...props }) => (
  <SymbolButton {...props} size={size} textStyle={getDefaultStyle(isLight)} style={{ borderRadius: size / 2, backgroundColor: 'rgba(255, 255, 255, 0.10)' }}>
    ✓
  </SymbolButton>
);

const BUTTON_SIZE = 40;
const Paginator = ({ isLight, overlay, showSkip, showNext, showDone, pages, currentPage, onEnd, onNext, onLeft, leftText }) => (
  <View style={{ ...styles.container, ...(overlay ? styles.containerOverlay : {}) }}>
    <View style={styles.buttonLeft}>
      {onLeft ?
        <LeftButton isLight={isLight} size={BUTTON_SIZE} onPress={onLeft} leftText={leftText} /> :
        (showSkip && currentPage + 1 !== pages ?
          <SkipButton isLight={isLight} size={BUTTON_SIZE} onPress={onEnd} /> :
          null)
      }
    </View>
    <PageDots isLight={isLight} pages={pages} currentPage={currentPage} />
    <View style={styles.buttonRight}>
      {currentPage + 1 === pages ?
        (showDone ? <DoneButton isLight={isLight} size={BUTTON_SIZE} onPress={onEnd} /> : null) :
        (showNext ? <NextButton isLight={isLight} size={BUTTON_SIZE} onPress={onNext} /> : null)
      }
    </View>
  </View>
);

const styles = {
  container: {
    height: a(60, 60, 60, 80, 80),
    paddingHorizontal: 0,
    paddingBottom: a(0, 0, 0, 20, 20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonLeft: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonRight: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
};

export default Paginator;
