import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import { MonsterImages } from '../Themes'
import MonsterList from './MonsterList'
// Styles
import styles from './Styles/MonsterScreenStyles'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class MonsterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerMode: 'none',
  });

  constructor(props) {
    super(props)
    this.state = {
      allMonsters: [],
      smallMonsters: [],
      largeMonsters: [],
      index: 0,
      routes: [
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Large' },
        { key: 'third', title: 'Small' },
      ],
    };
    // SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    // let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
  }

  okCallback(test) {
    console.log(test);
  }

  errorCallback(test) {
    console.log(test);
  }

  componentWillMount() {
    // // DELETE FROM IOS
    // SQLite.deleteDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
    // //DELETE FROM ANDROID
    // SQLite.deleteDatabase({name: 'mhworld.db', location: '~mhworld.db'}, this.okCallback, this.errorCallback);
  }

  componentDidMount() {
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      var allMonsters = [];
      var smallMonsters = [];
      var largeMonsters = [];
      tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          allMonsters.push(row);
          // this.setState({record: row});
        }
        // this.setState({ allMonsters });
        // db.close();
      });
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['small'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          smallMonsters.push(row);
        }
      });
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['large'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          largeMonsters.push(row);
        }
        this.setState({ allMonsters, smallMonsters, largeMonsters });
        db.close();
      });
    });
  }

  componentWillUnmount() {
    // db.close();
  }
  _handleIndexChange = index => this.setState({ index });
  _renderHeader = props =>
  <TabBar
    {...props}  style={{ paddingTop: 5, backgroundColor: 'white' }} labelStyle={{ color: '#191919' }}
    indicatorStyle={{ backgroundColor: 'red' }}
  />;

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

  renderAll() {
    return (
      <FlatList
        contentContainerStyle={styles.monsterFlatListContext}
        style={styles.monsterFlatList}
        data={this.state.allMonsters}
        keyExtractor={(item) => item.monster_id}
        renderItem={this.renderMonster}
      />
    );
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case 'first':
      return <MonsterList navigation={this.props.navigation} monsters={this.state.allMonsters} />;
    case 'second':
      return <MonsterList navigation={this.props.navigation} monsters={this.state.largeMonsters} />;
    case 'third':
      return <MonsterList navigation={this.props.navigation} monsters={this.state.smallMonsters} />;
    default:
      return null;
    }
  }

  render() {
    return (
      <TabViewAnimated
        style={{ flex: 1, backgroundColor: 'white'}}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}
