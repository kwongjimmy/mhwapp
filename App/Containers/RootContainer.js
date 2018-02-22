import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import SQLite from 'react-native-sqlite-storage'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
    // DELETE FROM IOS
    // console.log('test');
    // SQLite.deleteDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
    // //DELETE FROM ANDROID
    // SQLite.deleteDatabase({name: 'mhworld.db', location: '~mhworld.db'}, this.okCallback, this.errorCallback);
  }

  okCallback(test) {

  }

  errorCallback(test) {

  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
