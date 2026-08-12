import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  fundoMenu:{
    backgroundColor: '#ffffff',
    width: width,
    height: 100,
    position: 'absolute',
    bottom:0,
    zIndex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  icon:{
    width: width*0.12,
    height: width*0.12
  }
})

export default styles