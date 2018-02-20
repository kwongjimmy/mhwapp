import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../Themes'

// Styles
import styles from './Styles/ItemInfoScreenStyles'

export default class ItemInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item_name,
    tabBarLabel: 'Items',
    // tabBarVisible: false,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    }
  });

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      itemMapLoot: {},
      itemMonsterLoot: {},
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    db.transaction((tx) => {
      var item = [];
      tx.executeSql('SELECT * FROM items WHERE item_id=?', [this.props.navigation.state.params.item_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          this.setState({ item: row });
        }
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
    if(this.state.tab1) {
      return (
        <ScrollView>
          <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Buy</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Sell</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Carry</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Rarity</Text>
            </View>
          </View>
          <View style={{ paddingTop: 7., flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.buy_price}z`}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.sell_price}z`}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.carry}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.rarity}</Text>
            </View>
          </View>
        </ScrollView>
      );
    } else if(this.state.tab2) {
      return (
        <View>
          <Text>
            2
          </Text>
        </View>
      );
    } else if(this.state.tab3) {
      return (
        <View>
          <Text>
            3
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text>
          4
        </Text>
      </View>
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
      <View style={styles.itemInfoScreenContainer}>
        <View style={styles.headerContainer}>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab1')}>
            <View style={regStyle1}>
              <Text style={textStyle1}>Info</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab2')}>
            <View style={regStyle2}>
              <Text style={textStyle2}>Acquire</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab3')}>
            <View style={regStyle3}>
              <Text style={textStyle3}>Quest</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.5} underlayColor={'white'} style={styles.headerContainer} onPress={() => this.toggleHeader('tab4')}>
            <View style={regStyle4}>
              <Text style={textStyle4}>Equip</Text>
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
