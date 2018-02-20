import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../Themes'

export default class MonsterInfo extends Component {

  renderMonsterHit = ({ item }) => {
    if(item.first) {
      return (
        <View style={[styles.monsterHitContainer, { paddingTop: 10, paddingBottom: 5, borderColor: 'red', borderBottomWidth: 1, marginLeft: 7.5, marginRight: 7.5 }]}>
          <Text style={[styles.monsterHitText, { flex: 2 }]}>{item.part_name}</Text>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Sever}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Blunt}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Shot}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Stun}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Fire}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Water}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Ice}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Thunder}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Dragon}
            />
          </View>
          <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5}}
              source={ElementStatusImages.Extract}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.monsterHitContainer, { marginLeft: 7.5, marginRight: 7.5 }]}>
        <Text style={[styles.monsterHitText, { flex: 2 }]}>{item.part_name}</Text>
        <Text style={styles.monsterHitText}>{item.sever}</Text>
        <Text style={styles.monsterHitText}>{item.blunt}</Text>
        <Text style={styles.monsterHitText}>{item.shot}</Text>
        <Text style={styles.monsterHitText}>{item.stun}</Text>
        <Text style={styles.monsterHitText}>{item.fire}</Text>
        <Text style={styles.monsterHitText}>{item.water}</Text>
        <Text style={styles.monsterHitText}>{item.ice}</Text>
        <Text style={styles.monsterHitText}>{item.thunder}</Text>
        <Text style={styles.monsterHitText}>{item.dragon}</Text>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <View style={[styles.monsterExtractContainer, { backgroundColor: item.extract_color }]} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.monster_hit}
        keyExtractor={(item) => item.part_name}
        renderItem={this.renderMonsterHit}
      />
    );
  }
}
