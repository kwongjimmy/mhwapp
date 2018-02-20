import React, { Component, PureComponent } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'

import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class MonsterList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerMode: 'none',
  });

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.name;
    if(item.name !== 'Gajalaka' && item.name !== 'Grimalkyne') {
      name = name.replace(/["'-]/g, "");
      name = name.replace(' ', '');
      src = MonsterImages[name];
    }
    return (
      <TouchableHighlight style={styles.monsterTouchContainer2} activeOpacity={0.5} underlayColor={'white'} onPress={() => this.props.navigation.navigate('MonsterInfo', { monster_id: item.monster_id, monster_name: item.name })}>
        <View style={styles.monsterContainer}>
          <View style={styles.monsterImageContainer}>
            <Image
              resizeMode="contain"
              style={styles.monsterImage2}
              source={src}
            />
          </View>
          <View style={styles.monsterTextContainer}>
            <Text style={styles.monsterText}>{item.name}</Text>
            <Text style={styles.monsterTypeText}>{item.category}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <FlatList
        contentContainerStyle={styles.monsterFlatListContext}
        style={styles.monsterFlatList}
        data={this.props.monsters}
        keyExtractor={(item) => item.monster_id}
        renderItem={this.renderMonster}
      />
    );
  }
}
