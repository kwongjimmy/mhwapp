import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { connect } from 'react-redux'

import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

class MonsterScreen extends Component {
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
      all: true,
      large: false,
      small: false,
    };
    // console.log(this.props)
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Library'});
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let allMonsters = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          allMonsters.push(row);
          // console.log(row);
          // this.setState({record: row});
        }
        this.setState({ allMonsters });
        // db.close();
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['small'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let smallMonsters = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          smallMonsters.push(row);
        }
        this.setState({ smallMonsters });
        // db.close();
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['large'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let largeMonsters = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          largeMonsters.push(row);
        }
        this.setState({ largeMonsters });
        db.close();
      });
    });
  }

  componentWillMount() {

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
    } else if(text === 'small' && !this.state.small) {
      this.setState({ all: false, large: false, small: true });
    }
  }

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
    var monsters = this.state.allMonsters;
    var regStyle1 = styles.monsterHeaderTextContainer;
    var regStyle2 = styles.monsterHeaderTextContainer;
    var regStyle3 = styles.monsterHeaderTextContainer;

    var textStyle1 = styles.monsterHeaderText;
    var textStyle2 = styles.monsterHeaderText;
    var textStyle3 = styles.monsterHeaderText;

    if(this.state.all) {
      regStyle1 = styles.monsterHeaderTextContainerSelected;
      textStyle1 = styles.monsterHeaderTextSelected;
      monsters = this.state.allMonsters;
    } else if(this.state.large) {
      regStyle2 = styles.monsterHeaderTextContainerSelected;
      textStyle2 = styles.monsterHeaderTextSelected;
      monsters = this.state.largeMonsters;
    } else {
      regStyle3 = styles.monsterHeaderTextContainerSelected;
      textStyle3 = styles.monsterHeaderTextSelected;
      monsters = this.state.smallMonsters;
    }
    return (
      <View style={styles.monsterScreenContainer}>
        <View style={styles.monsterHeaderContainer}>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('all')}>
            <View style={regStyle1}>
              <Text style={textStyle1}>All</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('large')}>
            <View style={regStyle2}>
              <Text style={textStyle2}>Large</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.monsterHeaderContainer} onPress={() => this.toggleHeader('small')}>
            <View style={regStyle3}>
              <Text style={textStyle3}>Small</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.monsterListContainer}>
          <FlatList
            contentContainerStyle={styles.monsterFlatListContext}
            style={styles.monsterFlatList}
            data={monsters}
            keyExtractor={(item) => item.monster_id}
            renderItem={this.renderMonster}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MonsterScreen);
