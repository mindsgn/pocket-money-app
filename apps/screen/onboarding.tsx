import React from 'react';
import { View, Animated } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import Button from '../components/button';
import { connect } from 'react-redux';
import WalletAction from '../redux/actions/wallet.action';

const Onboarding = (props: any) => {
  const {connected, navigation} = props
  const { connectWallet } = WalletAction(props);
  //animations
  const progress = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progress, { toValue: 1, useNativeDriver: true}).start();
    Animated.timing(scale, { toValue: 0.4, useNativeDriver: true}).start();
  },[]);

  React.useEffect(() => {
    console.log('onboarding update', props.connected)
    if(props.connected) navigation.navigate("Home")
  },[props.connected]);

  return (
    <View
      style={container.onboarding}>
        <View>
          <Animated.Text
            style={
                [
                    text.logo, 
                        {
                            opacity: progress,
                        }
                ]
            }>
              Set up your wallet
          </Animated.Text>
        </View>
        <View>
          <Animated.Text
            style={
                [
                  {
                    fontFamily:'SFMOono-Medium',
                    color: '#4C4C4C',
                    fontSize: 25,
                    width: 300
                  }
                ]
            }>
              welcome to the world of web3, you just one step closer to total fincancial freedom.
          </Animated.Text>
        </View>
        <View
          style={{
            marginTop: 40,
            width: '90%',
            flex: 1,
            flexDirection: 'row',
            display: 'flex',
            flexWrap:'wrap'
          }}>
          <Button
            flex={1}
            color={'#4C4C4C'}
            fontColor={'white'}
            minHeight={40}
            onPress={() => connectWallet()}
            text={'CONNNECT WALLET'} />
          <Button
            color={'#39B54A'}
            fontColor={'white'}
            minHeight={40}
            onPress={() => {}}
            text={'CREATE NEW WALLET'} />
          <Button
              color={'#F15A24'}
              fontColor={'white'}
              minHeight={40}
              onPress={() => {}}
              text='IMPORT WALLET' />
        </View>
    </View>
  );
};


const mapStateToProps = (state: any, props: any) => {
  return { connected: state.connected };
}

export default connect(mapStateToProps)(Onboarding);
