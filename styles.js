import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Basic styles
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  text: {
    color: 'white',
  },

  // Metal stats
  metalStats: {
    color: '#fff',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white'
  },

  // Labels
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  value: {
    fontSize: 18,
    color: 'white'
  },

  // Band List: Cell styles
  bandCell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  bandName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formationDate: {
    flex: 1,
    fontSize: 18,
  },
  country: {
    flex: 1,
    fontSize: 18,
  },
  fans: {
    flex: 1,
    fontSize: 12,
    color: '#999',
  },
});
