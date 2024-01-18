import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";

export default function Recipes({ categories, meals, mealsError }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          mealsError ? (
            <View style={{marginVertical: hp(3), alignItems: "center"}}>
              <Text style={{fontSize: hp(2),color: "#000000"}}>Please check your internet connection...</Text>
            </View>
          ) : (
            <ActivityIndicator style={styles.loader} size="large" />
          )
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <View>
      <Pressable
        style={[
          styles.card,
          {
            width: "100%",
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
          },
        ]}
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />
        <Text style={styles.itemText}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
  },
  title: {
    color: "#525252",
    fontSize: hp(3),
    fontWeight: "500",
  },
  loader: {
    marginTop: hp(5),
  },
  card: {
    display: "flex",
    justifyContent: "center",
    marginVertical: hp(1.4),
  },
  itemText: {
    fontSize: hp(1.6),
    fontWeight: "bold",
    marginLeft: wp(2),
    color: "#525252",
    marginTop: hp(0.5)
  },
});
