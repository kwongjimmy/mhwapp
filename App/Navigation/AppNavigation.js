import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import MonsterScreen from '../Containers/MonsterScreen'
import MonsterInfoScreen from '../Containers/MonsterInfoScreen'

import styles from './Styles/NavigationStyles'

const Monsters = StackNavigator(
  {
    Monsters: {
      screen : MonsterScreen,
    },
    MonsterInfo: {
      screen : MonsterInfoScreen,
    },
  },
  {
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
          fontWeight: '300',
          color: 'black',
          fontSize: 20,
      },
      headerTintColor: 'black',
    },
  },
);

// const Monsterss = TabNavigator({
//   Large: { screen: MonsterScreen },
//   Small: { screen: MonsterScreen },
//   All: { screen: MonsterScreen},
//   }, {
//   headerMode: 'none',
//   initialRouteName: 'Large',
//   navigationOptions: {
//     headerStyle: styles.header
//   },
//   tabBarPosition: 'top',
//   animationEnabled: true,
//   tabBarOptions: {
//     activeTintColor: 'white',
//     labelStyle: {
//       fontSize: 10,
//     },
//     style: {
//       backgroundColor: 'black',
//     },
//     indicatorStyle: {
//       backgroundColor: 'white'
//     }
//   },
// })

const PrimaryNav = TabNavigator({
  Monsters: { screen: Monsters },
  Equips: { screen: LaunchScreen },
  Items: { screen: LaunchScreen },
  Quests: { screen: LaunchScreen },
  Misc: { screen: LaunchScreen },
  }, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'Monsters',
  // navigationOptions: {
  //   headerStyle: styles.header
  // },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  // animationEnabled: true,
  tabBarOptions: {
    showIcon: false,
    activeTintColor: '#191919',
    inactiveTintColor: '#191919',
    labelStyle: {
      fontSize: 8.5,
      color: '#191919',
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      // backgroundColor: 'red',
      backgroundColor: 'white'
    },
    // backBehavior: 'none',
  },
});

// const Root = StackNavigator(
//   {
//     nav: { screen: PrimaryNav },
//     stack: { screen: LaunchScreen},
//   },
//   {
//     initialRouteName: 'nav',
//     headerMode: 'none'
//   }
// );

// const Root = StackNavigator(
//   {
//     // loginFlow: {
//     //   screen: StackNavigator({
//     //     splash: { screen: LaunchScreen },
//     //     login: { screen: LaunchScreen },
//     //     forgotPassword: { screen: LaunchScreen }
//     //   })
//     // },
//     mainFlow: {
//       screen: TabNavigator(
//       {
//         equip: { screen: LaunchScreen },
//         item: { screen: LaunchScreen },
//         misc: { screen: LaunchScreen },
//         quest: {
//           screen: StackNavigator({
//             someTab: {
//               screen: TabNavigator
//               (
//                 {
//                   Monsters: { screen: Monsters },
//                   Monsters1: { screen: Monsters },
//                   Monsters2: { screen: Monsters },
//                 },
//                 {
//                 }
//               )
//             },
//             MonnsterInfo: { screen: MonsterInfoScreen },
//             secondTab: { screen: LaunchScreen },
//             thirdTab: { screen: LaunchScreen }
//           })
//         },
//         monster: {
//           screen: StackNavigator({
//             someTab: {
//               screen: TabNavigator
//               (
//                 {
//                   Monsters: { screen: Monsters },
//                   Monsters1: { screen: Monsters },
//                   Monsters2: { screen: Monsters },
//                 },
//                 {
//                 }
//               )
//             },
//             MonnsterInfo: { screen: MonsterInfoScreen },
//             secondTab: { screen: LaunchScreen },
//             thirdTab: { screen: LaunchScreen }
//           })
//         }
//       },
//       {
//         headerMode: 'none',
//         header: null,
//         tabBarPosition: 'bottom',
//         swipeEnabled: false,
//         animationEnabled: false,
//         tabBarOptions: {
//           showIcon: false,
//           activeTintColor: '#191919',
//           inactiveTintColor: '#191919',
//           labelStyle: {
//             fontSize: 8.5,
//             color: '#191919',
//           },
//           style: {
//             backgroundColor: 'white',
//           },
//           indicatorStyle: {
//             backgroundColor: 'red'
//           },
//         }
//       },
//       )
//     }
//   },
//   {
//     initialRouteName: 'mainFlow',
//     headerMode: 'none'
//   }
// );

export default PrimaryNav
