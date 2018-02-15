import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'

import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class MonsterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props)
    this.state = {
      monster: [],
      all: true,
      large: false,
      small: false,
    };

    let db = SQLite.openDatabase({name: 'mhw.db', createFromLocation : "~mhworld.db", location: 'Library'});
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

  componentWillMount() {
    console.log(this.props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // db.close();
  }

  toggleHeader(text) {
    if(text === 'all' && !this.state.all) {
      this.setState({ all: true, large: false, small: false });
    } else if(text === 'large' && !this.state.large) {
      this.setState({ all: false, large: true, small: false });
    } else if(text === 'small' && !this.state.large) {
      this.setState({ all: false, large: false, small: true });
    }
  }

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.monster_name;
    if(item.monster_name !== 'Gajalaka' && item.monster_name !== 'Grimalkyne') {
      name = name.replace(/["'-]/g, "");
      name = name.replace(' ', '');
      src = MonsterImages[name];
    }
    return (
      <TouchableHighlight style={styles.monsterTouchContainer} activeOpacity={0.5} underlayColor={'white'} onPress={() => this.props.navigation.navigate('MonsterInfo', { monster_id: item.monster_id, monster_name: item.monster_name })}>
        <View style={styles.monsterContainer}>
          <View style={styles.monsterImageContainer}>
            <Image
              style={styles.monsterImage}
              source={src}
            />
          </View>
          <View style={styles.monsterTextContainer}>
            <Text style={styles.monsterText}>{item.monster_name}</Text>
            <Text style={styles.monsterTypeText}>Elder Dragons</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    var regStyle1 = styles.monsterHeaderTextContainer;
    var regStyle2 = styles.monsterHeaderTextContainer;
    var regStyle3 = styles.monsterHeaderTextContainer;
    if(this.state.all) {
      regStyle1 = [ styles.monsterHeaderTextContainer, { borderBottomWidth: 5, borderColor: 'red' }];
    } else if(this.state.large) {
      regStyle2 = [ styles.monsterHeaderTextContainer, { borderBottomWidth: 5, borderColor: 'red' }];
    } else  {
      regStyle3 = [ styles.monsterHeaderTextContainer, { borderBottomWidth: 5, borderColor: 'red' }];
    }
    return (
      <View style={styles.monsterScreenContainer}>
        <View style={styles.monsterHeaderContainer}>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('all')}>
            <View style={regStyle1}>
              <Text style={styles.monsterHeaderText}>All</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('large')}>
            <View style={regStyle2}>
              <Text style={styles.monsterHeaderText}>Large</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('small')}>
            <View style={regStyle3}>
              <Text style={styles.monsterHeaderText}>Small</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.monsterListContainer}>
          <FlatList
            style={styles.monsterFlatList}
            data={this.state.monster}
            keyExtractor={(item) => item.monster_id}
            renderItem={this.renderMonster}
          />
        </View>
      </View>
    );
  }
}
