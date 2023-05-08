import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'
import * as data from './metal.json'
import styles from './styles';

function BandsScreen() {
  const renderBand = ({ item }) => (
    <View style={{ marginVertical: 10, flexDirection: 'column'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text key={item.id} style={{ fontWeight: 'bold', color: 'white' }}>
          {item.split === "-" ? (
            <Text>{item.band_name}</Text>
          ) : (
            <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'gray', color: 'gray' }}>{item.band_name}</Text>
          )}
        </Text>
        <Text style={{color: 'grey'}}>{item.origin}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5}}>
        <Text style={{color: 'white'}}>{item.formed}</Text>
        <Text style={{color: 'white'}}>{(item.fans * 1000).toLocaleString()}</Text>
      </View>
    </View>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE"
      }}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black'}}>
      <FlatList
        data={data.default}
        renderItem={renderBand}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        ItemSeparatorComponent={renderSeparator}
        style={{ paddingLeft: 20, paddingRight: 20}}
      />
    </View>
  );
}


function StatsScreen() {
  // Create new array with spread operator
  const allBands = [...data.default]
  // Filter active bands
  const totalBands = allBands.length;
  const activeBands = allBands.filter((band) => band.split === '-');
  const splitBands = allBands.length - activeBands.length;
  const totalFans = (allBands.reduce((total, band) => total + band.fans, 0) * 1000).toLocaleString();
  const countries = allBands.map((band) => band.origin);
  // Count the number of bands for each style
  const styleCounts = allBands.reduce((acc, band) => {
    const styles = band.style.split(",");
    for (const style of styles) {
      acc[style] = (acc[style] || 0) + 1;
    }
    return acc;
  }, {});
  // Count the number of unique styles
  const numStyles = Object.keys(styleCounts).length;
  // Compute statistics using reduce
  const distinctCountries = new Set(countries).size;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
      <Text style={styles.title}>METAL🤘🎸</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Count:</Text>
        <Text style={styles.value}> {totalBands}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Fans:</Text>
        <Text style={styles.value}> {totalFans}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Countries:</Text>
        <Text style={styles.value}> {distinctCountries}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Active::</Text>
        <Text style={styles.value}> {activeBands.length}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Split:</Text>
        <Text style={styles.value}> {splitBands}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Styles:</Text>
        <Text style={styles.value}> {numStyles}</Text>
      </View>
    </View>
  );
}

function StylesScreen() {
  // Extract all styles from data
  const styles = data.default.reduce((acc, band) => {
    const bandStyles = band.style.split(",");
    return acc.concat(bandStyles);
  }, []);

  // Remove duplicate styles
  const uniqueStyles = [...new Set(styles)];
  // Sort by Alphabetical order
  const sortedStyles = uniqueStyles.sort();

  // Render each style with a separator
  const renderItem = ({ item }) => (
    <View sortedStyles={sortedStyles.item}>
      <Text>{item}</Text>
    </View>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedStyles}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer styles={{backgroundColor: 'black'}}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Bands') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Stats') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Styles') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f00', // Active/focussed color
          tabBarInactiveTintColor: '#600', // Inactive color
          tabBarStyle: { backgroundColor: 'black' },
          tabBarInactiveBackgroundColor: '#000',
          tabBarActiveBackgroundColor: '#111',
         })}
      >
        <Tab.Screen name="Bands" component={BandsScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Styles" component={StylesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
