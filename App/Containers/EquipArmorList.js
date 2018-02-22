import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import EquipArmorContainer from './EquipArmorContainer'
import { MonsterImages } from '../Themes'

// Styles
import styles from './Styles/EquipScreenStyles'

export default class EquipArmorList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lowRank: [],
      highRank: [],
      all: [],
      low: true,
      data: []
    }

    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback)
    db.transaction((tx) => {
      var lowRank = [];
      var highRank = [];
      var all = [];
      tx.executeSql(`SELECT
      X.*,
      I1.name as head_name,
      I2.name as armor_name,
      I3.name as gloves_name,
      I4.name as belt_name,
      I5.name as pants_name
      FROM
      ( SELECT
        A.name, A.armor_set_id, B.rank,
        B.item_id as head_item_id, b.slot1 as head_slot1, b.slot2 as head_slot2, b.slot3 as head_slot3, b.skill1 as head_skill1, b.skill2 as head_skill2,
        C.item_id as armor_item_id, C.slot1 as armor_slot1, C.slot2 as armor_slot2, C.slot3 as armor_slot3, C.skill1 as armor_skill1, C.skill2 as armor_skill2,
        D.item_id as gloves_item_id, D.slot1 as gloves_slot1, D.slot2 as gloves_slot2, D.slot3 as gloves_slot3, D.skill1 as gloves_skill1, D.skill2 as gloves_skill2,
        E.item_id as belt_item_id, E.slot1 as belt_slot1, E.slot2 as belt_slot2, E.slot3 as belt_slot3, E.skill1 as belt_skill1, E.skill2 as belt_skill2,
        F.item_id as pants_item_id, F.slot1 as pants_slot1, F.slot2 as pants_slot2, F.slot3 as pants_slot3, F.skill1 as pants_skill1, F.skill2 as pants_skill2
          FROM armor_sets as A
          LEFT JOIN armor as B on A.item_1 = B.item_id
          LEFT JOIN armor as C on A.item_2 = C.item_id
          LEFT JOIN armor as D on A.item_3 = D.item_id
          LEFT JOIN armor as E on A.item_4 = E.item_id
          LEFT JOIN armor as F on A.item_5 = F.item_id
      ) as X
      LEFT JOIN items as I1 on X.head_item_id = I1.item_id
      LEFT JOIN items as I2 on X.armor_item_id = I2.item_id
      LEFT JOIN items as I3 on X.gloves_item_id = I3.item_id
      LEFT JOIN items as I4 on X.belt_item_id = I4.item_id
      LEFT JOIN items as I5 on X.pants_item_id = I5.item_id
      WHERE X.rank=?`, ['High'], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          highRank.push(row);
        }
      });
      tx.executeSql(`SELECT
      X.*,
      I1.name as head_name,
      I2.name as armor_name,
      I3.name as gloves_name,
      I4.name as belt_name,
      I5.name as pants_name
      FROM
      ( SELECT
      	A.name, A.armor_set_id, B.rank,
      	B.item_id as head_item_id, b.slot1 as head_slot1, b.slot2 as head_slot2, b.slot3 as head_slot3, b.skill1 as head_skill1, b.skill2 as head_skill2,
      	C.item_id as armor_item_id, C.slot1 as armor_slot1, C.slot2 as armor_slot2, C.slot3 as armor_slot3, C.skill1 as armor_skill1, C.skill2 as armor_skill2,
      	D.item_id as gloves_item_id, D.slot1 as gloves_slot1, D.slot2 as gloves_slot2, D.slot3 as gloves_slot3, D.skill1 as gloves_skill1, D.skill2 as gloves_skill2,
      	E.item_id as belt_item_id, E.slot1 as belt_slot1, E.slot2 as belt_slot2, E.slot3 as belt_slot3, E.skill1 as belt_skill1, E.skill2 as belt_skill2,
      	F.item_id as pants_item_id, F.slot1 as pants_slot1, F.slot2 as pants_slot2, F.slot3 as pants_slot3, F.skill1 as pants_skill1, F.skill2 as pants_skill2
      		FROM armor_sets as A
      		LEFT JOIN armor as B on A.item_1 = B.item_id
      		LEFT JOIN armor as C on A.item_2 = C.item_id
      		LEFT JOIN armor as D on A.item_3 = D.item_id
      		LEFT JOIN armor as E on A.item_4 = E.item_id
      		LEFT JOIN armor as F on A.item_5 = F.item_id
      ) as X
      LEFT JOIN items as I1 on X.head_item_id = I1.item_id
      LEFT JOIN items as I2 on X.armor_item_id = I2.item_id
      LEFT JOIN items as I3 on X.gloves_item_id = I3.item_id
      LEFT JOIN items as I4 on X.belt_item_id = I4.item_id
      LEFT JOIN items as I5 on X.pants_item_id = I5.item_id
      WHERE X.rank=?`, ['Low'], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          lowRank.push(row);
        }
        this.setState({ highRank, lowRank, data: lowRank });
      });
    });
  }

  toggleHeader(text) {
    if(text === 'low' && !this.state.low) {
      this.setState({ low: true, data: this.state.lowRank });
    } else if(text === 'high' && this.state.low) {
      this.setState({ low: false, data: this.state.highRank });
    }
  }

  renderHeader() {
    if(this.state.low) {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Low Rank</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity onPress={() => this.toggleHeader('high')}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>High Rank</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity onPress={() => this.toggleHeader('low')}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>Low Rank</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>High Rank</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderArmorSet = ({ item }) => {
    return (
      <EquipArmorContainer armor={item}/>
    );
  }
  
  render() {
    return (
      <FlatList
        // contentContainerStyle={styles.monsterFlatListContext}
        // style={styles.monsterFlatList}
        style={{ flex: 1 }}
        ListHeaderComponent={this.renderHeader.bind(this)}
        data={this.state.data}
        keyExtractor={(item) => item.armor_set_id}
        renderItem={this.renderArmorSet}
      />
    );
  }
}
