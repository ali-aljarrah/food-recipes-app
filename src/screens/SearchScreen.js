import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, searchResult] = useState([]);

  const handleSearchSubmit = async () => {
    setLoading(true);
    searchResult([]);
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      );

      if (response && response.data) {
        searchResult(response.data.meals);
      }
    } catch (error) {
      console.log("error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={hp(3.5)} color="black" />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Search any meal"
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={true}
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={() => handleSearchSubmit()}
          />
        </View>
      </View>
      <View style={styles.resultsWrapper}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : results?.length > 0 ? (
          <FlatList
            data={results}
            contentContainerStyle={{ paddingBottom: hp(15) }}
            renderItem={({ item }) => (
              <Pressable
                key={item.idMeal}
                onPress={() =>
                  navigation.navigate("RecipeDetails", { ...item })
                }
              >
                <View style={styles.itemWrapper}>
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={styles.itemImage}
                  />
                  <Text style={{ fontSize: hp(2) }}>
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal} / {item.strArea}
                  </Text>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={styles.itemSeparator}
              />
            )}
          />
        ) : (
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyText}>
              No meals found...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp(5),
    paddingBottom: hp(1.8),
    marginHorizontal: wp(3),
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 1
  },
  inputWrapper: {
    flex: 1,
    marginLeft: wp(2),
  },
  input: {
    fontSize: hp(1.7),
    backgroundColor: "#e3e5e8",
    paddingVertical: hp(0.6),
    paddingHorizontal: hp(2),
    borderRadius: 30,
    color: "#404040",
  },
  resultsWrapper: {
    marginHorizontal: wp(3),
  },
  loader: {
    marginTop: hp(5)
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1),
    paddingTop: hp(2)
  },
  itemImage: {
    width: wp(8),
    height: wp(8),
    borderRadius: 10,
    marginRight: wp(5)
  },
  itemSeparator: {
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 1,
    height: hp(1),
  },
  emptyWrapper: {
    alignItems: "center",
    marginTop: hp(5)
  },
  emptyText: {
    fontSize: hp(2),
    color: "#000000",
  }
});