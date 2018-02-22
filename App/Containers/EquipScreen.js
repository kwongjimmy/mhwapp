import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import EquipArmorList from './EquipArmorList'
import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/EquipScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class EquipScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerMode: 'none',
  });

  constructor(props) {
    super(props)
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      all: [],
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  renderContent(screen) {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    } else {
      if(screen === 'weapon') {
        return (
          <EquipArmorList />
        );
      } else if(screen === 'armor') {
        return (
          <EquipArmorList />
        );
      }
      return (
        <EquipArmorList />
      );
    }
  }

  render () {
    return (
      <Container style={{ backgroundColor: 'white' }}>
         <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Weapon">
             {this.renderContent('tab1')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Armor">
             {this.renderContent('tab2')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Charm">
             {this.renderContent('tab3')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
