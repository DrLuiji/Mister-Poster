/**
 * this is the sign in form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native'
import { getColor } from '../config'
import * as Animatable from 'react-native-animatable'

export default class SignInForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'
    const errorMessage = this.state.errMsg ? <Text style={styles.errMsg}>{this.state.errMsg}</Text> : null

    return (
      <Animatable.View
      animation={animation}
      style={styles.container}
      onAnimationEnd={this._handleAnimEnd.bind(this)}>
        <Text style={styles.title}>Sign In</Text>
        {errorMessage}
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='rgba(255,255,255,.6)'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='rgba(255,255,255,.6)'
          />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleForgotPassword.bind(this)}>
            <View style={styles.fogotBtnContainer}>
              <Text style={styles.forgotBtn}>{'Forgot Password?'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleSignIn.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Let\'s Go'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  }

  _handleForgotPassword() {
    // TODO: do something
  }

  _handleSignIn() {
    // TODO: do something
    this.setState({errMsg: 'Email/Password didn\'t match'})
  }

  _handleGoBack() {
    this.setState({ init: false })
  }

  _handleBackBtnPress() {
    this._handleGoBack()
    return true
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromSignIn()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)'
  },
  errMsg: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: '#ffffff'
  },
  btnContainers: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280
  },
  fogotBtnContainer: {

  },
  forgotBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#ffffff'
  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor()
  }
})