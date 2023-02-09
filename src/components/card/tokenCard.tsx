//@ts-ignore
import { COINGECKO_API } from '@env';
import { colors } from '@orbyt/constants';
import { WalletAction } from '@orbyt/redux';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

export const TokenCard = ({
  name,
  symbol,
  amount,
  logo,
  props,
  currency,
  currencySymbol,
}: {
  name: string;
  symbol: any;
  amount: any;
  fiatAmount: string;
  logo: string;
  props: any;
  currency: string;
  currencySymbol: string;
}) => {
  const [fiat, setFiat] = React.useState<number>(0.0);
  const { updateBalance } = WalletAction(props);
  const getTokenData = async (token: string) => {
    if (token !== '' && token !== 'ORBYT') {
      if (token === 'usdc' || token === 'USDC') {
        token = 'usd-coin';
      }

      await fetch(`${COINGECKO_API}/${token}`, {
        method: 'GET',
      })
        .then((success) => {
          success.json().then(async (data) => {
            const { market_data } = data;
            const { ath } = market_data;
            const unitPrice = ath[`${currency}`];
            setFiat(unitPrice * amount);
            updateBalance(true, unitPrice * amount);
          });
        })
        .catch((error) => {
          setFiat(0);
          console.log(error);
        });
    } else {
      setFiat(0);
    }
  };

  React.useEffect(() => {
    getTokenData(name);
  }, [name]);

  return (
    <TouchableOpacity
      style={{
        height: 70,
        display: 'flex',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'black',
        borderWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        borderColor: 'white',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 100,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={{ uri: logo }}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontFamily: 'SF-Pro-Rounded-Bold',
              color: `${colors.white}`,
            }}
          >
            {name}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            color: `${colors.white}`,
            fontSize: 20,
          }}
        >
          {currencySymbol} {fiat.toFixed(2)}
        </Text>
        <Text
          style={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            color: `${colors.white}`,
            marginTop: -10,
          }}
        >
          {amount} {symbol}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
