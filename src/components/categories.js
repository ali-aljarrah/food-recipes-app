import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Categories({activeCategoty, handleChangeCategory, categories}) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.spaceView}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories?.map((cat, index) => {
            let isActive = cat.strCategory === activeCategoty;
            let activeButtonClass = isActive ? "#fbbf24" : '#e3e5e8'
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.itemAnchor}
            >
              <View style={[styles.imageWrapper, {backgroundColor: activeButtonClass}]}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={styles.image}
                />
              </View>
                <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spaceView: {
    marginHorizontal: wp(1),
    marginVertical: hp(3)
  },
  itemAnchor: {
    display: "flex",
    alignItems: "center",
    marginHorizontal: wp(2)
  },
  image: {
    borderRadius: 999,
    height: hp(6), 
    width: hp(6)
  },
  imageWrapper: {
    borderRadius: 999,
    padding: 5,
    marginBottom: hp(0.8)
  },
  categoryText: {
    textAlign: 'center',
    color: "#525252",
    fontSize: hp(1.5),
  }
});