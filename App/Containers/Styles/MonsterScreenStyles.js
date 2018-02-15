import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  monsterScreenContainer: {
    flex: 1,
    backgroundColor: '#191919'
  },
  monsterHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  monsterHeaderTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderColor: 'white',
    paddingTop: 5,
  },
  monsterHeaderText: {
    fontSize: 15,
    color: '#191919',
    textAlign: 'center',
  },
  monsterListContainer: {
    flex: 10.5
  },
  monsterFlatList: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#191919'
  },
  monsterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monsterTouchContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 7.5,
    marginRight: 7.5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#191919',
    backgroundColor: 'white',
  },
  monsterTextContainer: {
    flex: 2,
  },
  monsterText: {
    flex: 1,
    fontSize: 22,
    color: '#191919',
  },
  monsterTypeText: {
    flex: 1,
    fontSize: 13,
    color: '#464646',
  },
  monsterImageContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
  },
  monsterImage: {
    height: 65,
    width: 65,
  },
  monsterHitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monsterHitText: {
    flex: 1,
    fontSize: 10,
    color: '#191919',
  },
  monsterExtractContainer: {
    borderRadius: 25,
    height: 10,
    marginRight: 2.5,
    marginLeft: 2.5,
  }
});
