import { Text } from "react-native";

export function MontserratText(props: Text["props"]): JSX.Element {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Montserrat" }]} />
  );
}
