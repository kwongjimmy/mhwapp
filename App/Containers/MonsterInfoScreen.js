import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import SQLite from 'react-native-sqlite-storage'

import { Images } from '../Themes'

// Styles
import styles from './Styles/MonsterScreenStyles'

export default class MonsterInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.monster_name,
    // header: navigation => ({
    //   style: {
    //     height: 80,
    //     backgroundColor: 'yellow',
    //     shadowColor: 'black',
    //     shadowRadius: 5,
    //     shadowOpacity: 0.1,
    //     shadowOffset: {
    //       height: 3,
    //       width: 0,
    //     },
    //   },
    //   titleStyle: { color: 'red' },
    //   left: <Text style={{color: 'red'}} onPress={() => navigation.goBack()}>LEFT</Text>,
    //   right: <Text style={{color: 'red'}} onPress={() => navigation.goBack()}>RIGHT</Text>,
    // })
  });

  constructor(props) {
    super(props)
    this.state = {
      monster_hit: [],
      monster_loot: [],
    };
    let db = SQLite.openDatabase({name: 'mhw.db', createFromLocation : "~mhworld.db", location: 'Library'});
    db.transaction((tx) => {
      // tx.executeSql('SELECT * FROM monster WHERE monster_id = ?', [this.props.navigation.state.params.monster_id], (tx, results) => {
      //   // Get rows with Web SQL Database spec compliance.
      //   // console.log(results);
      //   let row = results.rows.item(0);
      //   console.log(row);
      // });
      var monster_hit = [];
      var monster_loot = [];
      monster_hit.push({
        part_name: 'Part',
        sever: 'Sever',
        blunt: 'Blunt',
        shot: 'Shot',
        stun: 'Stun',
        fire: 'Fire',
        water: 'Water',
        ice: 'Ice',
        thunder: 'Thun',
        dragon: 'Drag',
        extract_color: 'Ext',
        first: true,
      });
      tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.navigation.state.params.monster_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_hit.push(row);
        }
        this.setState({ monster_hit });
      });
      tx.executeSql(`SELECT
        loot.loot_id,
        loot.item_id,
        loot.category_id,
        cat.rank,
        cat.name,
        items.name,
        items.rarity,
        loot.quantity
        FROM monster_loot as loot
        INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
        INNER JOIN items as items ON loot.item_id = items.item_id
        WHERE loot.monster_id = ?`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_loot.push(row);
        }
        this.setState({ monster_loot });
      });
    });
  }

  renderMonsterLoot = ({ item }) => {
    return (
      <Text>Hi</Text>
    );
  }

  renderMonsterHit = ({ item }) => {
    if(item.first) {
      return (
        <View style={styles.monsterHitContainer}>
          <Text style={[styles.monsterHitText , { flex: 1.5 }]}>{item.part_name}</Text>
          <Text style={styles.monsterHitText}>{item.sever}</Text>
          <Text style={styles.monsterHitText}>{item.blunt}</Text>
          <Text style={styles.monsterHitText}>{item.shot}</Text>
          <Text style={styles.monsterHitText}>{item.stun}</Text>
          <Text style={styles.monsterHitText}>{item.fire}</Text>
          <Text style={styles.monsterHitText}>{item.water}</Text>
          <Text style={styles.monsterHitText}>{item.ice}</Text>
          <Text style={styles.monsterHitText}>{item.thunder}</Text>
          <Text style={styles.monsterHitText}>{item.dragon}</Text>
          <Text style={[styles.monsterHitText , { flex: 0.5 }]}>{item.extract_color}</Text>
        </View>
      );
    }
    return (
      <View style={styles.monsterHitContainer}>
        <Text style={[styles.monsterHitText , { flex: 1.5 }]}>{item.part_name}</Text>
        <Text style={styles.monsterHitText}>{item.sever}</Text>
        <Text style={styles.monsterHitText}>{item.blunt}</Text>
        <Text style={styles.monsterHitText}>{item.shot}</Text>
        <Text style={styles.monsterHitText}>{item.stun}</Text>
        <Text style={styles.monsterHitText}>{item.fire}</Text>
        <Text style={styles.monsterHitText}>{item.water}</Text>
        <Text style={styles.monsterHitText}>{item.ice}</Text>
        <Text style={styles.monsterHitText}>{item.thunder}</Text>
        <Text style={styles.monsterHitText}>{item.dragon}</Text>
        <View style={{ flex: 0.5, borderWidth: 0 }}>
          <View style={[styles.monsterExtractContainer, { backgroundColor: item.extract_color }]} />
        </View>
      </View>
    );
  }
 render() {
   console.log(this.state.monster_loot);
   return (
     <View style={{ flex: 1 }}>
       <FlatList
         style={{ flex:1 }}
         data={this.state.monster_hit}
         keyExtractor={(item) => item.part_name}
         renderItem={this.renderMonsterHit}
       />
       <FlatList
         style={{ flex:1 }}
         data={this.state.monster_loot}
         keyExtractor={(item) => item.loot_id}
         renderItem={this.renderMonsterLoot}
       />
     </View>
  );
 }

}
