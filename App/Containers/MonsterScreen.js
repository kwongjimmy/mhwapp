import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import SQLite from 'react-native-sqlite-storage'

import { Images } from '../Themes'

// Styles
import styles from './Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class MonsterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monster: [],
    };

    let db = SQLite.openDatabase({name: 'mhw.db', createFromLocation : "~mhworld.db", location: 'Library'}, this.openCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          // console.log(results);
          var monster = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            monster.push(row);
            // console.log(row);
            // this.setState({record: row});
          }
          this.setState({ monster });
        });
      });
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }


  componentWillMount() {
    console.log(this.props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // db.close();
  }

  renderMonster = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('MonsterInfo', { monster_id: item.monster_id, monster_name: item.monster_name })}>
        <View style={styles.monsterContainer}>
          <View style={styles.monsterImageContainer}>
            <Image
              style={styles.monsterImage}
              source={require('../Images/Monsters/MHW-Kulu-Ya-Ku_Icon.png')}
            />
          </View>
          <Text style={styles.monsterText}>{item.monster_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render () {
    return (
      <FlatList
        style={{ flex:1 }}
        data={this.state.monster}
        keyExtractor={(item) => item.monster_id}
        renderItem={this.renderMonster}
      />
    );
  }
}
