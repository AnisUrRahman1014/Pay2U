/* eslint-disable */

import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const getResponsiveFontSize = (baseFontSize, windowWidth) => {
  const baseScreenWidth = 375;
  const widthRatio = windowWidth / baseScreenWidth;
  const responsiveFontSize = baseFontSize * widthRatio;
  return responsiveFontSize;
};

const Responsive = {
  width,
  height,
  getWidth: value => {
    let responsiveWidth = 0;
    responsiveWidth = width * (value / 100);
    return responsiveWidth;
  },
  getHeight: value => {
    let responsiveHeight = 0;
    responsiveHeight = height * (value / 100);
    return responsiveHeight;
  },
  AppFonts: {
    highest: getResponsiveFontSize(40, width),
    highestt: getResponsiveFontSize(32, width),
    h1: getResponsiveFontSize(28, width),
    h2: getResponsiveFontSize(26, width),
    h3: getResponsiveFontSize(24, width),
    h4: getResponsiveFontSize(22, width),
    h5: getResponsiveFontSize(20, width),
    t1: getResponsiveFontSize(18, width),
    t2: getResponsiveFontSize(16, width),
    t3: getResponsiveFontSize(14, width),
    t4: getResponsiveFontSize(12, width),
    t5: getResponsiveFontSize(10, width),
    
    t11: getResponsiveFontSize(11, width),
    t13: getResponsiveFontSize(13, width),
    t17: getResponsiveFontSize(17, width),
  },
};

export default Responsive;
