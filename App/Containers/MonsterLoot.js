import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../Themes'

export default class MonsterLoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lowrank: true
    }
  }
  renderListHeader = (item) => {
    if(this.state.lowrank) {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Condition</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Low</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity onPress={() => this.toggleRank('high')}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>High</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Condition</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity onPress={() => this.toggleRank('low')}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>Low</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>High</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderListItems = (item) => {
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0}}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderWidth: 0}} onPress={() => this.props.navigation.navigate('ItemInfo', { item_id: item.item_id, item_name: item.item_name })}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.item_name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderMonsterLoot = ({ item }) => {
    if(item.loot_id === 0) {
      return this.renderListHeader();
    }
    return this.renderListItems(item);
  }

  toggleRank = (text) => {
    if(text === 'low' && !this.state.lowrank) {
      this.setState({ lowrank: true });
    } else if(text === 'high' && this.state.lowrank){
      this.setState({ lowrank: false });
    }
  }

  render() {
    if(this.state.lowrank) {
      return (
        <FlatList
          data={this.props.monster_loot}
          keyExtractor={(item) => item.loot_id}
          renderItem={this.renderMonsterLoot}
        />
      );
    }
    return (
      <FlatList
        data={this.props.monster_loot_high}
        keyExtractor={(item) => item.loot_id}
        renderItem={this.renderMonsterLoot}
      />
    );
  }
}
