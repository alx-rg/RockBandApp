import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'
import * as data from './metal.json'


function BandsScreen() {
  const renderBand = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
    <Text key={item.id} style={{ fontWeight: 'bold' }}>
      {item.split === "-" ? (
        <Text>{item.band_name}</Text>
      ) : (
        <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'gray', color: 'gray' }}>{item.band_name}</Text>
      )}
    </Text>
      <Text>{item.origin}</Text>
      <Text>{item.formed}</Text>
      <Text>{(item.fans * 1000).toLocaleString()}</Text>
    </View>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%",
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data.default}
        renderItem={renderBand}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}


function StatsScreen() {
  // Filter active bands
  const totalBands = data.default.length;
  const activeBands = data.default.filter((band) => band.split === '-');
  const splitBands = data.default.length - activeBands.length;

  // Map to extract required information

  const totalFans = (data.default.reduce((total, band) => total + band.fans, 0) * 1000).toLocaleString();

  // const fans = data.default.reduce((acc, band) => acc + band.fans, 0);
  const countries = activeBands.map((band) => band.origin);

  // Count the number of bands for each style
  const styleCounts = data.default.reduce((acc, band) => {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>METAL🤘🎸</Text>
      <Text>Count: {totalBands} </Text>
      <Text>Fans: {totalFans} </Text>
      <Text>Countries: {distinctCountries} </Text>
      <Text>Active: {activeBands.length} </Text>
      <Text>Split: {splitBands} </Text>
      <Text>Styles: {numStyles} </Text>
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
    <NavigationContainer>
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
          tabBarActiveTintColor: 'tomato', // Active/focussed color
          tabBarInactiveTintColor: 'gray' // Inactive color
          })}
      >
        <Tab.Screen name="Bands" component={BandsScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Styles" component={StylesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
