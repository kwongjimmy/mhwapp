import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  monsterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  monsterText: {
    flex: 2,
    fontSize: 20,
    color: 'black',
    // borderWidth: 1
  },
  monsterImageContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center'
  },
  monsterImage: {
    height: 65,
    width: 65,
  },
  monsterHitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  monsterHitText: {
    flex: 1,
    fontSize: 10,
    color: 'black',
  },
  monsterExtractContainer: {
    flex: 0.5,
    borderRadius: 25,
    height: 15,
    // marginTop: 5,
    justifyContent: 'center',
  }
});
