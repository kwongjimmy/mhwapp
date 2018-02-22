import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    // backgroundColor: '#191919'
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'white',
    paddingTop: 5,
  },
  headerTextContainerSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'red',
    paddingTop: 5,
  },
  headerText: {
    fontSize: 15,
    color: '#5e5e5e',
    textAlign: 'center',
  },
  headerTextSelected: {
    fontSize: 15,
    color: '#191919',
    textAlign: 'center',
  },
  listContainer: {
    flex: 10.5,
  },
  flatList: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: '#191919'
    // backgroundColor: 'white'
  },
  flatListContext: {
    paddingBottom: 10,
  },
});