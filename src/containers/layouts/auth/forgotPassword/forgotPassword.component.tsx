import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ForgotPasswordForm,
  ForgotPasswordFormType,
} from '@src/components/auth';
import {
  AvoidKeyboard,
  Button,
  ImageOverlay,
  Text,
} from '@src/components/common';

interface ComponentProps {
  onResetPress: (formValue: ForgotPasswordFormType) => void;
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formValue: ForgotPasswordFormType | undefined;
}

class ForgotPasswordComponent extends React.Component<ForgotPasswordProps, State> {

  public state: State = {
    formValue: undefined,
  };

  private backgroundImage: ImageSourcePropType = {
    uri: 'https://images.unsplash.com/photo-1457459686225-c7db79d4e59f',
  };

  private onFormValueChange = (formValue: ForgotPasswordFormType) => {
    this.setState({ formValue });
  };

  private onResetPasswordButtonPress = () => {
    this.props.onResetPress(this.state.formValue);
  };

  private resetPasswordEnabled = (): boolean => {
    const { formValue } = this.state;

    return formValue !== undefined;
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <AvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          source={this.backgroundImage}>
          <Text style={themedStyle.forgotPasswordLabel}>Forgot Password</Text>
          <Text style={themedStyle.enterEmailLabel}>Please enter your email address</Text>
          <ForgotPasswordForm
            style={themedStyle.formContainer}
            onFormValueChange={this.onFormValueChange}
          />
          <Button
            style={themedStyle.resetButton}
            size='giant'
            disabled={!this.resetPasswordEnabled()}
            onPress={this.onResetPasswordButtonPress}>
            Reset Password
          </Button>
        </ImageOverlay>
      </AvoidKeyboard>
    );
  }
}

export const ForgotPassword = withStyles(ForgotPasswordComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  forgotPasswordLabel: {
    alignSelf: 'center',
    marginTop: 24,
    fontFamily: 'raleway-bold',
    fontSize: 32,
  },
  enterEmailLabel: {
    alignSelf: 'center',
    marginTop: 64,
    fontFamily: 'opensans-semibold',
  },
  resetButton: {
    fontFamily: 'opensans-extrabold',
    textTransform: 'uppercase',
  },
}));