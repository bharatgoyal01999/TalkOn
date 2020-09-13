import React from 'react';
import {
 nativeEvent,
  requireNativeComponent,
  View,
} from 'react-native';

const RNBanner = requireNativeComponent('RNAdMob', AdMobBanner);

export default class AdMobBanner extends React.Component {

  constructor() {
    super();
    this.onSizeChange = this.onSizeChange.bind(this);
    this.state = {
      style: {},
    };
  }

  onSizeChange(event) {
    const { height, width } = event.nativeEvent;
    this.setState({ style: { width, height } });
  }

  render() {
   
    return (
     
        <RNBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-9079440111821103/9722758497"
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={()=>{console.log('err')}} />
      
    );
  }
}



// AdMobBanner.defaultProps = { bannerSize: 'smartBannerPortrait', didFailToReceiveAdWithError: () => {} };
