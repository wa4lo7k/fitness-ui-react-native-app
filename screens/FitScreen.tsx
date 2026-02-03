import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { FitnessItems } from '../Context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../StackNavigator';

type FitScreenRouteProp = RouteProp<RootStackParamList, 'Fit'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Fit'>;

const FitScreen = () => {
  const route = useRoute<FitScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [index, setIndex] = useState(0);
  const exercise = route.params.exercises;
  const current = exercise[index];
  const context = useContext(FitnessItems);

  if (!context) {
    throw new Error('FitScreen must be used within FitnessContext');
  }

  const {
    completed,
    setCompleted,
    calories,
    setCalories,
    minutes,
    setMinutes,
    workout,
    setWorkout,
  } = context;

  const handleDone = () => {
    setCompleted([...completed, current.name]);
    setWorkout(workout + 1);
    setMinutes(minutes + 2.5);
    setCalories(calories + 6.3);
    setTimeout(() => {
      setIndex(index + 1);
    }, 2000);
  };

  const handleSkip = () => {
    setTimeout(() => {
      setIndex(index + 1);
    }, 2000);
  };

  const handlePrev = () => {
    setTimeout(() => {
      setIndex(index - 1);
    }, 2000);
  };

  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 400 }}
        source={{ uri: current.image }}
      />

      <Text style={{
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
      }}>
        {current.name} <Octicons name="question" size={22} color="#6d6868" />
      </Text>

      <Text style={{
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 45,
        fontWeight: "bold",
        marginTop: 10
      }}>
        x{current.sets}
      </Text>

      {index + 1 >= exercise.length ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            handleDone();
          }}
          style={{
            backgroundColor: "#198f51",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            borderRadius: 30,
            padding: 10,
            width: "90%",
          }}
        >
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center"
          }}>
            <Ionicons name="checkmark-circle" size={24} color="white" /> DONE
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Rest");
            handleDone();
          }}
          style={{
            backgroundColor: "#198f51",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            borderRadius: 30,
            padding: 10,
            width: "90%",
          }}
        >
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center"
          }}>
            <Ionicons name="checkmark-circle" size={24} color="white" /> DONE
          </Text>
        </TouchableOpacity>
      )}

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 25
      }}>
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");
            handlePrev();
          }}
          style={{ borderRadius: 30, padding: 10, width: "42%" }}
        >
          <Text style={{
            color: "#6d6868",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center"
          }}>
            <Ionicons name="play-skip-back" size={22} color="#6d6868" /> PREV
          </Text>
        </TouchableOpacity>

        {index + 1 >= exercise.length ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ borderRadius: 30, padding: 10, width: "42%" }}
          >
            <Text style={{
              color: "#3f3d3d",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}>
              <Ionicons name="play-skip-forward" size={22} color="#3f3d3d" /> SKIP
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Rest");
              handleSkip();
            }}
            style={{ borderRadius: 30, padding: 10, width: "42%" }}
          >
            <Text style={{
              color: "#3f3d3d",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}>
              <Ionicons name="play-skip-forward" size={22} color="#3f3d3d" /> SKIP
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;
