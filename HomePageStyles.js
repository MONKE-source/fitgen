import { StyleSheet } from "react-native";
import homePageBg from './assets/homePageBg.jpeg'


const homePageStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingTop: 20,
      paddingLeft: 20,
    },
    label: {
      flexDirection: "row",
      alignItems: "center",
    },
    textWrapper: {
      color: "#333333",
      fontSize: 30,
      fontWeight: "400",
      letterSpacing: 0,
      textAlign: "left",
      marginLeft: 10,
    },
    text: {
      fontSize: 40,
      fontWeight: "bold",
    },
    checklist: {
      marginTop: 20,
    },
    checklistItem: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 40,
    },
    checkbox: {
      width: 40, // Increase checkbox size
      height: 40, // Increase checkbox size
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    addNewItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        borderColor: "#D3D3D3", // Faint gray color
        borderWidth: 1, // Add a border
        borderRadius: 5, // Add some border radius
        padding: 5, // Add some padding to create space around the input and button
      },
    
      addNewItemInput: {
        flex: 1, // Expand to take available space
        marginRight: 10, // Add space between input and button
        paddingVertical: 8, // Add vertical padding
        paddingHorizontal: 10, // Add horizontal padding
        fontSize: 16, // Adjust font size as needed
        borderColor: "#D3D3D3", // Faint gray color
        borderWidth: 1, // Add a border
        borderRadius: 5, // Add some border radius
      },
      container: {
        flex: 1, // Take up the entire screen
        position: 'relative', // Make sure the image stays in the background
      },
      backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1
      },
    
      backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity as needed
        zIndex: -1,
      },
      navyTextWrapper: {
        color: "navy", // Navy blue color
      },
      enableDisableButton: {
        position: 'absolute',
        top: 20, // Adjust the top value as needed
        right: 20, // Adjust the right value as needed
      },
  });
  
  

export default homePageStyles