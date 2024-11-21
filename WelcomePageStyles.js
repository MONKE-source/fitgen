import { StyleSheet } from 'react-native';
import welcomePagebg from './assets/welcomePagebg.jpeg'
const logInPageStyles = StyleSheet.create({
  onLogIn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  div: {
    position: 'relative', // Remove 'position: relative'
    width: '100%', // Adjust the width to cover the entire screen
    height: '100%', // Adjust the height to cover the entire screen
  },
  welcome: {
    color: '#ffffff',
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
    textAlign: 'center',
  },
  textWrapper: {
    color: 'black',
  },
  span: {
    color: '#000000',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#69c9ff',
    borderRadius: 8,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 70,
  },
  textWrapper2: {
    color: '#f5f7ff',
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  textWrapper3Container: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textWrapper3: {
    color: '#279db7',
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },

  // Overlay View
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity (0.5 for 50% opacity)
    zIndex: 0, // Place it behind other content
  },
});


export default logInPageStyles;
