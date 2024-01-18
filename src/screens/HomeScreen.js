import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/recipes";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigarion = useNavigation();
  const [activeCategoty, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [mealsError, setMealsError] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    setCategoryError(false);
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      setCategoryError(true);
      console.log("error: " + error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    setMealsError(false);
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      setMealsError(true);
      console.log("error: " + error.message);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View style={styles.wrapperContainer}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={styles.scrollContainer}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <View>
            <Text style={styles.makeFoodText}>Make your own food.</Text>
          </View>
          <Text style={styles.stayText}>
            Stay at <Text style={styles.amber400}>Home</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigarion.navigate("Search")}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchTextWrapper}>
              <Text style={styles.searchText}>
                Search any meal
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <EvilIcons name="search" size={hp(3)} color="gray" />
            </View>
          </View>
        </TouchableOpacity>

        <View>
          {categories.length > 0 ? (
            <Categories
              categories={categories}
              activeCategoty={activeCategoty}
              handleChangeCategory={handleChangeCategory}
            />
          ) : ( categoryError ? (
            <View style={{marginVertical: hp(3), alignItems: "center"}}>
              <Text style={{fontSize: hp(2),color: "#000000"}}>Please check your internet connection...</Text>
            </View>
          ) : (
            <ActivityIndicator size="large" style={styles.loader} />
          )
          )}
        </View>

        <View>
          <Recipes categories={categories} meals={meals} mealsError={mealsError} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    marginTop: hp(1.2),
    paddingTop: hp(5),
  },
  textWrapper: {
    marginHorizontal: wp(5),
    marginTop: hp(1.2),
    marginBottom: hp(3),
  },
  welcomeText: {
    color: "#525252",
    fontSize: hp(1.7),
  },
  makeFoodText: {
    color: "#525252",
    fontSize: hp(3.8),
    fontWeight: "600",
  },
  stayText: {
    fontSize: hp(3.8),
    fontWeight: "500",
    color: "#525252",
  },
  amber400: {
    color: "#fbbf24",
  },
  searchWrapper: {
    marginHorizontal: wp(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    borderRadius: 9999,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  searchTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  searchText: {
    fontSize: hp(1.5),
    color: "#404040",
    paddingHorizontal: wp(1)
  },
  iconWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    paddingTop: hp(1),
    paddingBottom: hp(1.3),
    paddingHorizontal: wp(2),
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  loader: {
    marginTop: hp(5),
  }
});
