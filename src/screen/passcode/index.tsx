import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { numbers } from '../../constants';
import { style } from './style';
import { APP_NAME } from '@env';
import { useAuth } from 'context';

const Passcode = (props: any) => {
  const { route, navigation } = props;
  const { params } = route;
  const { passcodeState } = params;
  const { setAuthenticationPasscode, auth, unlock } = useAuth();
  const [state, setState] = useState(passcodeState);
  const [verify, setVerify] = useState<number[] | null[] | string[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [passcode, setPasscode] = useState<number[] | null[] | string[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const addToPasscode = (number: number | null | string) => {
    let slotFilled = false;
    if (number === null) return null;

    if (state === 'new' || state === 'unlock') {
      passcode.map((slot: any, index: number) => {
        if (slot === null && !slotFilled) {
          passcode[index] = number;
          //@ts-expect-error
          setPasscode([...passcode]);
          slotFilled = true;
        }
      });
    }

    if (state === 'verify') {
      verify.map((slot: any, index: number) => {
        if (slot === null && !slotFilled) {
          verify[index] = number;
          //@ts-expect-error
          setVerify([...verify]);
          slotFilled = true;
        }
      });
    }
  };

  const removePasscode = () => {
    if (state === 'new' || state === 'unlock') {
      setPasscode([null, null, null, null, null]);
    }

    if (state === 'verify') {
      setVerify([null, null, null, null, null]);
    }
  };

  const unlockWallet = async () => {
    const response = await unlock(
      `*${passcode[0]}!${passcode[1]}%${passcode[2]}^${passcode[3]}$${passcode[4]}+`
    );

    if (response) {
      navigation.replace('Home');
    } else {
      removePasscode();
    }
  };

  useEffect(() => {
    let totalPasscodes = 0;

    if (state === 'new' || state === 'unlock') {
      passcode.map((slot: any) => {
        if (slot !== null) {
          totalPasscodes++;
        }
      });
    }

    if (totalPasscodes === 5 && state === 'new') {
      setState('verify');
    }

    if (totalPasscodes === 5 && state === 'unlock') {
      unlockWallet();
    }
  }, [passcode]);

  useEffect(() => {
    let totalPasscodes = 0;

    if (state === 'verify') {
      verify.map((slot: any) => {
        if (slot !== null) {
          totalPasscodes++;
        }
      });
    }

    if (totalPasscodes === 5 && state === 'verify') {
      let match = true;

      verify.map((slot: any, index) => {
        if (slot !== passcode[index]) {
          match = false;
        }
      });

      if (match) {
        setAuthenticationPasscode(
          APP_NAME,
          `*${passcode[0]}!${passcode[1]}%${passcode[2]}^${passcode[3]}$${passcode[4]}+`
        );
      } else {
        setState('new');
        setPasscode([null, null, null, null, null]);
        setVerify([null, null, null, null, null]);
      }
    }
  }, [verify]);

  useEffect(() => {
    if (auth) {
      navigation.replace('Home');
    }
  }, [auth]);

  return (
    <View style={style.default}>
      <View style={style.passcodeContainer}>
        {state === 'new' ? (
          <View>
            <Text style={style.title}>{'CREATE NEW PASSCODE'}</Text>
            <Text style={style.subtitle}>
              {'passcode will be used to encrypt Wallet'}
            </Text>
          </View>
        ) : state === 'verify' ? (
          <Text style={style.title}>{'CONFIRM PASSCODE'}</Text>
        ) : (
          <View>
            <Text style={style.title}>{'Unlock Wallet'}</Text>
          </View>
        )}
      </View>
      <View style={style.passcodeContainer}>
        {state === 'new' ? (
          <>
            {passcode.map((number: any, index) => {
              return (
                <View key={index} style={style.passcodeInput}>
                  {number !== null ? (
                    <View style={style.passcodePlaceholder} />
                  ) : null}
                </View>
              );
            })}
          </>
        ) : state === 'verify' ? (
          <>
            {verify.map((number: any, index) => {
              return (
                <View key={index} style={style.passcodeInput}>
                  {number !== null ? (
                    <View style={style.passcodePlaceholder} />
                  ) : null}
                </View>
              );
            })}
          </>
        ) : (
          <>
            {passcode.map((number: any, index) => {
              return (
                <View key={index} style={style.passcodeInput}>
                  {number !== null ? (
                    <View style={style.passcodePlaceholder} />
                  ) : null}
                </View>
              );
            })}
          </>
        )}
      </View>
      <View style={style.buttonContainer}>
        {numbers.map((number: number | null | string) => {
          let buttonType = style.codeButton;
          let buttonText = style.buttonText;

          if (number === null) {
            buttonType = style.codeButtonNull;
          }

          if (number === 'X') {
            buttonType = style.codeButtonDelete;
            buttonText = style.buttonTextDelete;
          }

          return (
            <TouchableOpacity
              key={number}
              style={buttonType}
              onPress={
                number === 'X'
                  ? () => removePasscode()
                  : () => addToPasscode(number)
              }
            >
              <Text style={buttonText}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export { Passcode };
