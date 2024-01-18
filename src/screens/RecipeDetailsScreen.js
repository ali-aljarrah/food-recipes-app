import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Linking from "expo-linking";

export default function RecipeDetailsScreen(props) {
  let item = props.route.params;
  const [meal, setMeal] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: " + error.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];

    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <StatusBar style="light" />
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(100),
            height: hp(50),
            borderRadius: 0,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
      </View>
      <View style={styles.chevronWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.chevronAnchor}
        >
          <Entypo name="chevron-left" size={hp(3.5)} color="#fbbf24" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <View style={styles.infoWrapper}>
          <View>
            <Text style={[styles.title, { fontSize: hp(3) }]}>
              {meal?.strMeal}
            </Text>
            <Text style={[styles.subTitle, { fontSize: hp(2) }]}>
              {meal?.strArea}
            </Text>
          </View>

          <View style={styles.space2}>
            <Text style={[styles.title, { fontSize: hp(2.5), marginBottom: hp(1.5) }]}>
              Ingredients
            </Text>
            <View>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View
                    key={i}
                    style={{ flexDirection: "row", marginBottom: hp(1.5), alignItems: "center" }}
                  >
                    <View style={styles.bullet} />
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: hp(1.7),color: "#525252", fontWeight: "bold" }}>
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text style={{ fontSize: hp(1.7), color: "#525252" }}>
                        {"  "}{meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.space2}>
            <Text style={[styles.title, { fontSize: hp(2.5), marginBottom: hp(1.5) }]}>
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.8), color: "#525252", lineHeight: hp(2.5) }}>
              {meal?.strInstructions}
            </Text>
          </View>

          {meal.strYoutube && (
            <View style={styles.space2}>
              <Text
                style={[styles.title ,{ fontSize: hp(2.5) }]}>
                Recipe video
              </Text>
              <View>
                <TouchableOpacity
                  style={{marginVertical: hp(2)}}
                  onPress={() => handleOpenLink(meal.strYoutube)}
                >
                  <Text style={{ fontSize: hp(2), color: "rgb(37 99 235)" }}>
                    {meal.strYoutube}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  chevronWrapper: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(6),
  },
  chevronAnchor: {
    padding: 2,
    borderRadius: 999,
    marginLeft: wp(4),
    backgroundColor: "#FFFFFF",
  },
  loader: {
    marginTop: hp(5),
  },
  infoWrapper: {
    marginHorizontal: wp(5),
    justifyContent: "space-between",
    marginTop: hp(2),
  },
  space2: {
    marginVertical: hp(1.5),
  },
  title: {
    fontWeight: "bold",
    flex: 1,
    color: "#525252",
  },
  subTitle: {
    fontWeight: "500",
    flex: 1,
    color: "#525252",
  },
  bullet: {
    borderRadius: 999,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
    backgroundColor: "rgb(252 211 77)"
  },
});
