import { Image, Text, View, TouchableOpacity } from 'react-native';
import fitness from '../data/fitness';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const FitnessCards = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ marginTop: 80, marginHorizontal: 20, marginBottom: 20 }}>
      {fitness.map((item, id) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Workout", {
              image: item.image,
              exercises: item.exercises,
              id: item.id
            })
          }
          style={{
            alignItems: 'center',
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10
          }}
          key={id}
        >
          <Image
            style={{ width: "100%", height: 120, borderRadius: 12 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20
            }}
          >
            {item.name}
          </Text>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={30}
            color="#dfbe04"
            style={{ position: "absolute", bottom: 15, left: 15 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FitnessCards;
