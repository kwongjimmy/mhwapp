import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../Themes'

export default class MonsterEquip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      armor: true,
      data: this.props.monster_armor,
    }
  }

  renderHeader() {
    if(this.state.armor) {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 15, flex: 1, textAlign: 'center', color: '#191919' }}>Name</Text>
          </View> */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 25 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Armor</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 25 }}>
              <TouchableOpacity onPress={() => this.toggleEquip('weapons')}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>Weapons</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 15, flex: 1, textAlign: 'center', color: '#191919' }}>Name</Text>
          </View> */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 25 }}>
              <TouchableOpacity onPress={() => this.toggleEquip('armor')}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>Armor</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 25 }}>
              <TouchableOpacity>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Weapons</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.name}</Text>
        </View>
      </View>
    );
  }

  toggleEquip = (text) => {
    if(text === 'armor' && !this.state.armor) {
      this.setState({ armor: true, data: this.props.monster_armor });
    } else if(text === 'weapons' && this.state.armor){
      this.setState({ armor: false, data: this.props.monster_weapons });
    }
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader.bind(this)}
        data={this.state.data}
        keyExtractor={(item) => item.item_id}
        renderItem={this.renderListItems}
      />
    );
  }
}
