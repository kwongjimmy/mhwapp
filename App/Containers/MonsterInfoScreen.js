import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../Themes'
import { renderTab1 } from './MonsterInfo'
// Styles
import styles from './Styles/MonsterInfoScreenStyles'

export default class MonsterInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.monster_name,
    tabBarLabel: 'Monsters',
    // tabBarVisible: false,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
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
      tab1: true,
      tab2: false,
      tab3: false,
      lowrank: true,
      highrank: false,
    };
    let db = SQLite.openDatabase({name: 'mhw.db', createFromLocation : "~mhworld.db", location: 'Library'});
    db.transaction((tx) => {
      var monster_hit = [];
      var monster_loot = [];
      monster_hit.push({
        // part_name: 'Part',
        part_name: '',
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
      monster_loot.push({
        first: true,
        loot_id: 0,
      });
      tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.navigation.state.params.monster_id], (tx, results) => {
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
        items.name as item_name,
        items.rarity,
        loot.quantity
        FROM monster_loot as loot
        INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
        INNER JOIN items as items ON loot.item_id = items.item_id
        WHERE loot.monster_id = ?
        ORDER BY cat.name`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_loot.push(row);
        }
        this.setState({ monster_loot });
        console.log(this.state.monster_loot);
      });
    });
  }

  renderMonsterLoot = ({ item }) => {
    if(item.loot_id === 0) {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1}}>
            <Text style={{ fontSize: 13, flex: 1, textAlign: 'center', color: '#191919' }}>Condition</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1}}>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 13, flex: 1, textAlign: 'center', color: '#191919' }}>Low</Text>
            </View>
            <View style={{ flex: 1, marginRight: 5}}>
              <Text style={{ fontSize: 13, flex: 1, textAlign: 'center', color: '#191919' }}>High</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1}}>
          <Text style={{ fontSize: 13, flex: 1, textAlign: 'center', color: '#191919' }}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1}}>
            <Text style={{ fontSize: 13, flex: 1, textAlign: 'center', color: '#191919' }}>{item.item_name}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderTab2() {
    if(this.state.lowrank) {
      return (
        <FlatList
          style={{ marginBottom: 5 }}
          data={this.state.monster_loot}
          keyExtractor={(item) => item.loot_id}
          renderItem={this.renderMonsterLoot}
        />
      );
    }
    return (
      <FlatList
        style={{ marginBottom: 5 }}
        data={this.state.monster_loot}
        keyExtractor={(item) => item.loot_id}
        renderItem={this.renderMonsterLoot}
      />
    );
  }

  toggleHeader(text) {
    if(text === 'tab1' && !this.state.tab1) {
      this.setState({ tab1: true, tab2: false, tab3: false });
    } else if(text === 'tab2' && !this.state.tab2) {
      this.setState({ tab1: false, tab2: true, tab3: false });
    } else if(text === 'tab3' && !this.state.tab3) {
      this.setState({ tab1: false, tab2: false, tab3: true });
    }
  }

  renderContent() {
    if(this.state.tab1) {
      return renderTab1(this.state.monster_hit);
    } else if(this.state.tab2) {
      return this.renderTab2();
    }
    return (
      <Text style={{ color: '#191919' }}>Tab3</Text>
    );
  }

  render() {
    var regStyle1 = styles.headerTextContainer;
    var regStyle2 = styles.headerTextContainer;
    var regStyle3 = styles.headerTextContainer;

    var textStyle1 = styles.headerText;
    var textStyle2 = styles.headerText;
    var textStyle3 = styles.headerText;

    if(this.state.tab1) {
      regStyle1 = styles.headerTextContainerSelected;
      textStyle1 = styles.headerTextSelected;
    } else if(this.state.tab2) {
      regStyle2 = styles.headerTextContainerSelected;
      textStyle2 = styles.headerTextSelected;
    } else {
      regStyle3 = styles.headerTextContainerSelected;
      textStyle3 = styles.headerTextSelected;
    }

    return (
      <View style={styles.infoScreenContainer}>
        <View style={styles.headerContainer}>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab1')}>
            <View style={regStyle1}>
              <Text style={textStyle1}>Info</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab2')}>
            <View style={regStyle2}>
              <Text style={textStyle2}>Loot</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab3')}>
            <View style={regStyle3}>
              <Text style={textStyle3}>Equip</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.scrollContainer}>
          {this.renderContent()}
        </View>
      </View>
   );
  }
}
