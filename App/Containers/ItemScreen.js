import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { connect } from 'react-redux'

import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/ItemScreenStyles'

class ItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    // header: null,
    // headerMode: 'none',
    tabBarLabel: 'Items',
    title: "Items"
  });

  constructor(props) {
    super(props)
    this.state = {
      items: [],
    };
    // console.log(this.props)
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    db.transaction((tx) => {
      let items = [{
        item_id: 0,
        first: true,
      }];
      tx.executeSql('SELECT item_id, name FROM items', [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          items.push(row);
        }
        this.setState({ items });
        db.close();
      });
    });
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ItemInfo', { item_id: item.item_id, item_name: item.name })}>
            <Text style={{ fontSize: 15.5, flex: 1, color: '#191919' }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.itemScreenContainer}>
        <FlatList
          data={this.state.items}
          keyExtractor={(item) => item.item_id}
          renderItem={this.renderListItems}
        />
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ItemScreen);
