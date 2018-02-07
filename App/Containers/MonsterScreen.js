import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  render () {
    return (
      <View style={styles.mainContainer}>
      </View>
    )
  }
}
