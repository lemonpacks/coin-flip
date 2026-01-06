import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const COIN_SIZE = width * 0.55;

// 硬币正面 SVG 组件
const CoinFrontSVG = () => (
  <Svg width={COIN_SIZE} height={COIN_SIZE} viewBox="0 0 1024 1024">
    <Path d="M63.317333 496.298667a448 448 0 1 0 896 0 448 448 0 0 0-896 0z" fill="#FFD96B" />
    <Path d="M828.16 179.712L194.730667 813.226667a448 448 0 0 0 633.429333-633.6z" fill="#FDC223" />
    <Path d="M185.6 496.298667a325.717333 325.717333 0 1 0 651.434667 0 325.717333 325.717333 0 0 0-651.434667 0z" fill="#F9AB10" />
    <Path d="M734.634667 259.669333a325.546667 325.546667 0 0 0-453.632 6.314667 325.546667 325.546667 0 0 0-6.314667 453.632l459.946667-459.946667z" fill="#F9B721" />
    <Path d="M483.328 588.373333h-80.213333v-47.786666h80.213333v-25.856h-80.213333v-47.786667h56.32l-67.157334-136.448h66.56l43.264 92.16c5.461333 11.434667 9.386667 21.674667 11.690667 30.464 2.730667-9.557333 6.570667-19.712 11.690667-30.549333l44.117333-92.074667h66.56l-68.096 136.362667h57.344v47.786666h-81.322667v25.941334h81.322667v47.786666h-81.322667v101.205334h-60.672V588.373333h-0.085333z" fill="#D3830D" />
    <Path d="M571.989333 459.008L442.624 588.373333h40.704v101.205334h60.757333V588.373333h81.322667v-47.786666h-81.322667v-25.856h81.322667v-47.786667h-57.344z" fill="#BF790A" />
    <Path d="M288 213.248c-70.570667 22.954667-89.088 41.472-111.957333 112.042667C153.173333 254.805333 134.570667 236.202667 64 213.333333c70.570667-22.869333 89.088-41.386667 111.957333-112.042666 22.954667 70.656 41.472 89.088 112.042667 111.957333M400.042667 119.978667c-35.328 11.434667-44.629333 20.736-56.064 56.064-11.434667-35.328-20.736-44.629333-55.978667-56.064 35.242667-11.434667 44.544-20.650667 55.978667-55.978667 11.434667 35.328 20.736 44.544 56.064 55.978667" fill="#FFFFFF" />
  </Svg>
);

// 硬币反面 SVG 组件
const CoinBackSVG = () => (
  <Svg width={COIN_SIZE} height={COIN_SIZE} viewBox="0 0 1024 1024">
    <Path d="M63.317333 496.298667a448 448 0 1 0 896 0 448 448 0 0 0-896 0z" fill="#FFD96B" />
    <Path d="M828.16 179.712L194.730667 813.226667a448 448 0 0 0 633.429333-633.6z" fill="#8a8a8a" />
    <Path d="M185.6 496.298667a325.717333 325.717333 0 1 0 651.434667 0 325.717333 325.717333 0 0 0-651.434667 0z" fill="#F9AB10" />
    <Path d="M734.634667 259.669333a325.546667 325.546667 0 0 0-453.632 6.314667 325.546667 325.546667 0 0 0-6.314667 453.632l459.946667-459.946667z" fill="#8a8a8a" />
    <Path d="M483.328 588.373333h-80.213333v-47.786666h80.213333v-25.856h-80.213333v-47.786667h56.32l-67.157334-136.448h66.56l43.264 92.16c5.461333 11.434667 9.386667 21.674667 11.690667 30.464 2.730667-9.557333 6.570667-19.712 11.690667-30.549333l44.117333-92.074667h66.56l-68.096 136.362667h57.344v47.786666h-81.322667v25.941334h81.322667v47.786666h-81.322667v101.205334h-60.672V588.373333h-0.085333z" fill="#D3830D" />
    <Path d="M571.989333 459.008L442.624 588.373333h40.704v101.205334h60.757333V588.373333h81.322667v-47.786666h-81.322667v-25.856h81.322667v-47.786667h-57.344z" fill="#BF790A" />
    <Path d="M288 213.248c-70.570667 22.954667-89.088 41.472-111.957333 112.042667C153.173333 254.805333 134.570667 236.202667 64 213.333333c70.570667-22.869333 89.088-41.386667 111.957333-112.042666 22.954667 70.656 41.472 89.088 112.042667 111.957333M400.042667 119.978667c-35.328 11.434667-44.629333 20.736-56.064 56.064-11.434667-35.328-20.736-44.629333-55.978667-56.064 35.242667-11.434667 44.544-20.650667 55.978667-55.978667 11.434667 35.328 20.736 44.544 56.064 55.978667" fill="#FFFFFF" />
  </Svg>
);

export default function App() {
  const [isHeads, setIsHeads] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    const randomResult = Math.random() > 0.5;
    const rotations = 5;
    const targetRotation = rotations * 360 + (randomResult ? 0 : 180);
    
    rotation.value = withSequence(
      withTiming(targetRotation, {
        duration: 2500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
    
    translateY.value = withSequence(
      withTiming(-COIN_SIZE * 0.8, { duration: 200, easing: Easing.out(Easing.cubic) }),
      withTiming(-COIN_SIZE * 1.2, { duration: 100, easing: Easing.in(Easing.cubic) }),
      withTiming(-COIN_SIZE * 0.4, { duration: 150, easing: Easing.out(Easing.cubic) }),
      withTiming(-COIN_SIZE * 0.8, { duration: 100, easing: Easing.in(Easing.cubic) }),
      withTiming(0, { duration: 250, easing: Easing.out(Easing.bounce) })
    );
    
    scale.value = withSequence(
      withTiming(1.1, { duration: 150, easing: Easing.out(Easing.cubic) }),
      withTiming(0.95, { duration: 100, easing: Easing.in(Easing.cubic) }),
      withTiming(1.02, { duration: 100, easing: Easing.out(Easing.cubic) }),
      withTiming(0.98, { duration: 100, easing: Easing.in(Easing.cubic) }),
      withTiming(1, { duration: 100, easing: Easing.out(Easing.cubic) })
    );
    
    setTimeout(() => {
      rotation.value = rotation.value % 360;
      setIsHeads(randomResult);
      setIsFlipping(false);
    }, 2500);
  };

  // 正面硬币动画样式
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = rotation.value;
    const normalizedRotation = rotateY % 360;
    const opacity = normalizedRotation > 90 && normalizedRotation < 270 ? 0 : 1;
    return {
      position: 'absolute',
      width: COIN_SIZE,
      height: COIN_SIZE,
      backfaceVisibility: 'hidden',
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  // 反面硬币动画样式
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = rotation.value;
    const normalizedRotation = rotateY % 360;
    const opacity = normalizedRotation > 90 && normalizedRotation < 270 ? 1 : 0;
    return {
      position: 'absolute',
      width: COIN_SIZE,
      height: COIN_SIZE,
      backfaceVisibility: 'hidden',
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY + 180}deg` }],
      opacity,
    };
  });

  // 硬币容器动画样式
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>抛硬币</Text>
      
      <View style={styles.coinWrapperContainer}>
        {/* 硬币容器 */}
        <Animated.View style={[styles.coinContainer, containerAnimatedStyle]}>
          {/* 正面硬币 */}
          <Animated.View style={frontAnimatedStyle}>
            <CoinFrontSVG />
          </Animated.View>
          
          {/* 反面硬币 */}
          <Animated.View style={backAnimatedStyle}>
            <CoinBackSVG />
          </Animated.View>
        </Animated.View>
      </View>
      
      <Text style={styles.result}>
        {isFlipping ? '抛硬币中...' : isHeads ? '正面 (Heads)' : '反面 (Tails)'}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, isFlipping && styles.buttonDisabled]}
        onPress={flipCoin}
        disabled={isFlipping}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isFlipping ? '抛硬币中...' : '抛硬币'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  coinWrapperContainer: {
    height: COIN_SIZE * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  coinContainer: {
    width: COIN_SIZE,
    height: COIN_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    width: COIN_SIZE,
    height: COIN_SIZE,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  coinFront: {
    // 正面硬币初始状态：正面朝上
    backfaceVisibility: 'hidden',
  },
  coinBack: {
    // 反面硬币初始状态
    backfaceVisibility: 'hidden',
  },
  result: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffd700',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 18,
    paddingHorizontal: 56,
    borderRadius: 35,
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
