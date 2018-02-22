import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../Themes'

export default class MonsterQuest extends Component {

  renderHeader() {
    return (
      <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Name</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Type</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Rank</Text>
        </View>
      </View>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.quest_name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.type}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.required_rank}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.props.monster_quest}
        keyExtractor={(item) => item.quest_id}
        renderItem={this.renderListItems}
      />
    );
  }
}
