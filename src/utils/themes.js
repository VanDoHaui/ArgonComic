/**
 * @format
 * @flow
 */
import {Dimensions, StatusBar, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {height, width} = Dimensions.get('window');
const isIphoneXGen =
  Platform.OS === 'ios' &&
  (height === 780 ||
    width === 780 ||
    height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926 ||
    height === 932 ||
    width === 932);

const isIphone14 =
  Platform.OS === 'ios' &&
  ((height === 926 && width === 428) || (height === 932 && width === 430));

const hasDynamicIsland = DeviceInfo.hasDynamicIsland();

const statusBarHeight = Platform.select({
  ios: isIphoneXGen || hasDynamicIsland ? 44 : 24,
  android: StatusBar.currentHeight,
});
const headerHeight = 56;

const HEIGHT_DEVICE = Dimensions.get('screen').height;
const bottomNavBarAndroidHeight = HEIGHT_DEVICE - height;

const metrics = {
  radius: 8,
  zero: 0,
  screenWidth: width,
  screenHeight: height,
  coverWidth: 126,
  coverHeight: 168,
  statusBarHeight,
  headerHeightHalf: headerHeight / 2,
  headerHeight,
  headerHeightX2: headerHeight * 2,
  headerHeightX3: headerHeight * 3,
  tabbarHeight: 56,
  bottomSpaceHeight: isIphoneXGen ? 32 : 0,
  bottomSpaceHeightPlus16: isIphoneXGen ? 32 : 16,
  btnFooterHeight: 40,
  bottomNavBarAndroidHeight,
  //v2
  btnHeightXS: 24,
  btnHeightSM: 32,
  btnHeightMD: 40,
  btnHeightLG: 48,
  btnHeightXLG: 56,
  opacityBtnDisable: 0.3,
  iconSize16: 16,
  iconSize20: 20,
  iconSize24: 24,
  space: 8,
  padding: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
};

export {metrics, isIphoneXGen, isIphone14, hasDynamicIsland};
