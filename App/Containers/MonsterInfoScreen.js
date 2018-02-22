import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';
// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../Themes'
// import { renderTab1 } from './MonsterInfo'
import MonsterInfo from './MonsterInfo'
import MonsterLoot from './MonsterLoot'
import MonsterEquip from './MonsterEquip'
import MonsterQuest from './MonsterQuest'

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
      monster_loot_high: [],
      monster_armor: [],
      monster_weapons: [],
      monster_quest: [],
      loading: true,
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback)
    db.transaction((tx) => {
      var monster_hit = [];
      var monster_loot = [];
      var monster_loot_high = [];
      var monster_armor = [];
      var monster_weapons = [];
      var monster_quest = [];
      tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_hit.push(row);
        }
        // this.setState({ monster_hit });
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
        WHERE loot.monster_id = ? AND cat.rank = 0`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_loot.push(row);
        }
        // this.setState({ monster_loot });
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
        WHERE loot.monster_id = ? AND cat.rank = 1`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_loot_high.push(row);
        }
        // this.setState({ monster_loot_high });
      });
      tx.executeSql(`SELECT C.name, C.item_id FROM monster_loot as A
        JOIN monster_loot_categories as B on A.category_id = B.category_id
        JOIN items as C ON A.item_id = C.item_id
        WHERE A.monster_id = ? AND B.category_id = 51`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_armor.push(row);
        }
        // this.setState({ monster_armor });
      });
      tx.executeSql(`SELECT C.name, C.item_id FROM monster_loot as A
        JOIN monster_loot_categories as B on A.category_id = B.category_id
        JOIN items as C ON A.item_id = C.item_id
        WHERE A.monster_id = ? AND B.category_id = 50`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_weapons.push(row);
        }
        // this.setState({ monster_weapons });
      });
      tx.executeSql(`SELECT A.quest_id, B.name as quest_name, B.required_rank, B.type
        FROM quest_monsters as A
        JOIN quests as B ON A.quest_id = B.quest_id
        where A.monster_id = ?`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_quest.push(row);
        }
        this.setState({ monster_hit, monster_loot, monster_loot_high, monster_armor, monster_weapons, monster_quest, loading: false });
            console.log(this.state);
        db.close();
      });
    });
  }

  renderContent(screen) {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    } else {
      if(screen === 'tab1') {
        return <MonsterInfo navigation={this.props.navigation} monster_hit={this.state.monster_hit}/>
      } else if(screen === 'tab2') {
        return <MonsterLoot navigation={this.props.navigation} monster_loot={this.state.monster_loot} monster_loot_high={this.state.monster_loot_high}/>
      } else if(screen === 'tab3') {
        return <MonsterEquip navigation={this.props.navigation} monster_armor={this.state.monster_armor} monster_weapons={this.state.monster_weapons}/>
      }
      return (
        <MonsterQuest navigation={this.props.navigation} monster_quest={this.state.monster_quest} />
      );
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
         <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Info">
             {this.renderContent('tab1')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Loot">
             {this.renderContent('tab2')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Equip">
             {this.renderContent('tab3')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Quest">
             {this.renderContent('tab4')}
           </Tab>
         </Tabs>
      </Container>
   );
  }
}
