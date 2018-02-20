import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../Themes'
import MonsterInfo from './MonsterInfo'
import MonsterLoot from './MonsterLoot'
import MonsterEquip from './MonsterEquip'
import MonsterQuest from './MonsterQuest'

// Styles
import styles from './Styles/MonsterInfoScreenStyles'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class MonsterInfoScreen2 extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.monster_name,
    tabBarLabel: 'Monsters',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    header: null,
    headerMode: 'none',
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
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      routes: [
        { key: 'first', title: 'Info' },
        { key: 'second', title: 'Loot' },
        { key: 'third', title: 'Equip' },
        { key: 'four', title: 'Quest' },
      ],
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Library'});
    db.transaction((tx) => {
      var monster_hit = [];
      var monster_loot = [];
      var monster_loot_high = [];
      var monster_armor = [{
        first: true,
        item_id: 0,
      }];
      var monster_weapons = [{
        first: true,
        item_id: 0,
      }];
      var monster_quest = [{
        first: true,
        quest_id: 0,
      }];
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
      monster_loot_high.push({
        first: true,
        loot_id: 0,
      });
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
      tx.executeSql(`SELECT A.quest_id, B.name as quest_name
        FROM monster_quest as A
        JOIN quest as B ON A.quest_id = B.quest_id
        where monster_id = ?`,
        [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_quest.push(row);
        }
        this.setState({ monster_hit, monster_loot, monster_loot_high, monster_armor, monster_weapons, monster_quest });
        db.close();
      });
    });
  }

  toggleHeader(text) {
    if(text === 'tab1' && !this.state.tab1) {
      this.setState({ tab1: true, tab2: false, tab3: false, tab4: false });
    } else if(text === 'tab2' && !this.state.tab2) {
      this.setState({ tab1: false, tab2: true, tab3: false, tab4: false });
    } else if(text === 'tab3' && !this.state.tab3) {
      this.setState({ tab1: false, tab2: false, tab3: true, tab4: false });
    } else if(text === 'tab4' && !this.state.tab4) {
      this.setState({ tab1: false, tab2: false, tab3: false, tab4: true });
    }
  }

  // renderContent() {
  //   if(this.state.tab1) {
  //     return renderTab1(this.state.monster_hit);
  //   } else if(this.state.tab2) {
  //     // return this.renderTab2();
  //     return <MonsterLoot navigation={this.props.navigation} monster_loot={this.state.monster_loot} monster_loot_high={this.state.monster_loot_high}/>
  //   } else if(this.state.tab3) {
  //     return (
  //       <MonsterEquip navigation={this.props.navigation} monster_armor={this.state.monster_armor} monster_weapons={this.state.monster_weapons}/>
  //     );
  //   }
  //   return (
  //     <MonsterQuest navigation={this.props.navigation} monster_quest={this.state.monster_quest} />
  //   )
  // }

  _renderScene = ({ route }) => {
    console.log(route.key);
    switch (route.key) {
    case 'first':
      return <MonsterInfo navigation={this.props.navigation} monsters={this.state.monster_hit} />;
    case 'second':
      return <MonsterLoot navigation={this.props.navigation} monster_loot={this.state.monster_loot} monster_loot_high={this.state.monster_loot_high}/>
    case 'third':
      return <MonsterEquip navigation={this.props.navigation} monster_armor={this.state.monster_armor} monster_weapons={this.state.monster_weapons}/>
    case 'fourth':
      return <MonsterQuest navigation={this.props.navigation} monster_quest={this.state.monster_quest} />
    default:
      return null;
    }
  }

  _handleIndexChange = index => this.setState({ index });
  _renderHeader = (props) => {
    return (
      <TabBar
        {...props}  style={{ paddingTop: 5, backgroundColor: 'white' }} labelStyle={{ color: '#191919' }}
        indicatorStyle={{ backgroundColor: 'red' }}
        useNativeDriver={false}
        scrollEnabled={false}
      />
    );
  }

  renderTab() {
    if(this.state.monster_hit.length > 1) {
      return (
        <TabViewAnimated
          style={{ flex: 1, backgroundColor: 'white'}}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      )
    }
    return (
      <Text>
        Hi
      </Text>
    )
  }
  render() {
    var regStyle1 = styles.headerTextContainer;
    var regStyle2 = styles.headerTextContainer;
    var regStyle3 = styles.headerTextContainer;
    var regStyle4 = styles.headerTextContainer;

    var textStyle1 = styles.headerText;
    var textStyle2 = styles.headerText;
    var textStyle3 = styles.headerText;
    var textStyle4 = styles.headerText;

    if(this.state.tab1) {
      regStyle1 = styles.headerTextContainerSelected;
      textStyle1 = styles.headerTextSelected;
    } else if(this.state.tab2) {
      regStyle2 = styles.headerTextContainerSelected;
      textStyle2 = styles.headerTextSelected;
    } else if(this.state.tab3){
      regStyle3 = styles.headerTextContainerSelected;
      textStyle3 = styles.headerTextSelected;
    } else {
      regStyle4 = styles.headerTextContainerSelected;
      textStyle4 = styles.headerTextSelected;
    }

    return (
      // <View style={styles.infoScreenContainer}>
      //   <View style={styles.headerContainer}>
      //     <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab1')}>
      //       <View style={regStyle1}>
      //         <Text style={textStyle1}>Info</Text>
      //       </View>
      //     </TouchableHighlight>
      //     <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab2')}>
      //       <View style={regStyle2}>
      //         <Text style={textStyle2}>Loot</Text>
      //       </View>
      //     </TouchableHighlight>
      //     <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab3')}>
      //       <View style={regStyle3}>
      //         <Text style={textStyle3}>Equip</Text>
      //       </View>
      //     </TouchableHighlight>
      //     <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab4')}>
      //       <View style={regStyle4}>
      //         <Text style={textStyle4}>Quest</Text>
      //       </View>
      //     </TouchableHighlight>
      //   </View>
      //   <View style={styles.scrollContainer}>
      //     {this.renderContent()}
      //   </View>
      // </View>
      <View>
        {this.renderTab()}
      </View>

   );
  }
}
