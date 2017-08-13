import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tinycolor from 'tinycolor2';

import PageData from './components/PageData';
import Paginator from './components/Paginator';

export default class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageFraction = contentOffset.x / layoutMeasurement.width;
    const page = Math.round(pageFraction);
    const isLastPage = this.props.pages.length === page + 1;

    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd();
    } else {
      this.setState({ currentPage: page });
    }
  };

  goBack = () => {
    const { width } = Dimensions.get('window');
    const { currentPage } = this.state;
    const previousPage = currentPage - 1 || 0;
    const offsetX = previousPage * width;
    this.refs.scroll.scrollTo({ x: offsetX, animated: true });
    this.setState({ currentPage: previousPage });
  };

  goNext = () => {
    const { width } = Dimensions.get('window');
    const { currentPage } = this.state;
    const nextPage = currentPage + 1;
    const offsetX = nextPage * width;
    this.refs.scroll.scrollTo({ x: offsetX, animated: true });
    this.setState({ currentPage: nextPage });
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const { pages, bottomOverlay, showSkip, showNext, showDone, showBack } = this.props;
    const currentPage = pages[this.state.currentPage] || pages[0];
    const { backgroundColor } = currentPage;
    const canGoNext = currentPage.canGoNext !== false;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor, justifyContent: 'center' }}>
        <ScrollView
          ref="scroll"
          pagingEnabled={true}
          scrollEnabled={canGoNext}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
        >
          {pages.map(({ image, title, subtitle, customComponent }, idx) => (
            <PageData
              key={idx}
              isLight={isLight}
              image={image}
              height={height}
              width={width}
              title={title}
              subtitle={subtitle}
              customComponent={customComponent}
            />
          )
          )}
        </ScrollView>
        <Paginator
          isLight={isLight}
          overlay={bottomOverlay}
          showSkip={showSkip}
          showNext={showNext && canGoNext}
          showDone={showDone && canGoNext}
          showBack={showBack}
          pages={pages.length}
          currentPage={this.state.currentPage}
          onBack={this.goBack}
          onEnd={this.props.onEnd}
          onNext={this.goNext}
        />
      </View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    image: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    customComponent: PropTypes.element,
    canGoNext: PropTypes.boolean,
  })).isRequired,
  bottomOverlay: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
  showBack: PropTypes.bool
};

Onboarding.defaultProps = {
  bottomOverlay: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  showBack: false
};
