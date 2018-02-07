import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import MonsterScreen from '../Containers/MonsterScreen'


import styles from './Styles/NavigationStyles'

const Monsters = TabNavigator({
  Large: { screen: MonsterScreen },
  Small: { screen: MonsterScreen },
  All: { screen: MonsterScreen},
  }, {
  headerMode: 'none',
  initialRouteName: 'Large',
  navigationOptions: {
    headerStyle: styles.header
  },
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 10,
    },
    style: {
      backgroundColor: 'black',
    },
    indicatorStyle: {
      backgroundColor: 'white'
    }
  },
})

const PrimaryNav = TabNavigator({
  Monsters: { screen: Monsters },
  Equipment: { screen: LaunchScreen },
  Quests: { screen: LaunchScreen },
  Items: { screen: LaunchScreen },
  Map: { screen: LaunchScreen },
  }, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Monsters',
  navigationOptions: {
    headerStyle: styles.header
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 7,
    },
    style: {
      backgroundColor: 'black',
    },
    indicatorStyle: {
      backgroundColor: 'white'
    }
  },
});

export default PrimaryNav
