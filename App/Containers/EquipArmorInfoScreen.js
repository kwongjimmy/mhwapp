import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
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
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      loading: true,
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback)
    db.transaction((tx) => {
      var monster_hit = [];
      tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.navigation.state.params.monster_id], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          monster_hit.push(row);
        }
        // this.setState({ monster_hit });
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

  renderContent() {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
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
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab4')}>
            <View style={regStyle4}>
              <Text style={textStyle4}>Quest</Text>
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
