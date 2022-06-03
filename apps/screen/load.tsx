import React from 'react';
import { View, Animated } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import { connect } from 'react-redux';

const Load = (props: any) => {
    const {connected, navigation} = props
    const progress = React.useRef(new Animated.Value(0)).current;
    const scale = React.useRef(new Animated.Value(0)).current;

    const isConnected = async () => {
      if(connected){
        navigation.navigate("Home");
      } else {
        navigation.navigate("Onboarding");
      }
    };
    
    React.useEffect(() => {
        Animated.timing(progress, { toValue: 1, useNativeDriver: true}).start();
        Animated.timing(scale, { toValue: 0.5, useNativeDriver: true}).start();
        setTimeout(isConnected, 5000);
    },[props.connected]);
    
    return (
    <View
        style={container.default}>
        <View>
          <Animated.Text
            style={
                [
                  text.logo,
                  {
                    opacity: progress,
                    transform:[{scale}],
                  }
                ]
            }>
              ORBYT
          </Animated.Text>
        </View>
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return { connected: state.connected };
}

export default connect(mapStateToProps)(Load);
