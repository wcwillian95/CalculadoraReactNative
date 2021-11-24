import React, { Component } from "react";
import styled from "styled-components/native";
import { StyleSheet, Text, Dimensions, TouchableHighlight } from "react-native";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

const AlunoView = styled.View`
  justify-content: center;
  align-items: center;
`;

const AlunoText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  margin-bottom: 20px;
`;

const DisplayView = styled.View`
  padding: 10px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: flex-end;
`;

const DisplayText = styled.Text`
  font-size: 60px;
  color: "#fff";
`;

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

const ViewButtons = styled.View`
  flex-direction: "row";
  flex-wrap: "wrap";
`;

function Botoes(props) {
  const stylesButton = [styles.button];
  if (props.double) stylesButton.push(styles.buttomDouble);
  if (props.triple) stylesButton.push(styles.buttonTriple);
  if (props.operation) stylesButton.push(styles.operationButton);
  return (
    <TouchableHighlight onPress={() => props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableHighlight>
  );
}

const RowOne = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default class App extends Component {
  state = { ...initialState };

  addDigit = (n) => {
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (n === "." && !clearDisplay && this.state.displayValue.includes(".")) {
      return;
    }

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  };

  render() {
    return (
      <Container>
        <AlunoView>
          <AlunoText>
            Willian Cirino Cavalcante{"\n"}
            RA: 2019100575
          </AlunoText>
        </AlunoView>
        <DisplayView>
          <DisplayText numberOfLines={1}>{this.state.displayValue}</DisplayText>
        </DisplayView>
        <ViewButtons>
          <RowOne>
            <Botoes label="AC" triple onClick={this.clearMemory} />
            <Botoes label="/" operation onClick={this.setOperation} />
          </RowOne>
          <RowOne>
            <Botoes label="7" onClick={this.addDigit} />
            <Botoes label="8" onClick={this.addDigit} />
            <Botoes label="9" onClick={this.addDigit} />
            <Botoes label="*" operation onClick={this.setOperation} />
          </RowOne>
          <RowOne>
            <Botoes label="4" onClick={this.addDigit} />
            <Botoes label="5" onClick={this.addDigit} />
            <Botoes label="6" onClick={this.addDigit} />
            <Botoes label="-" operation onClick={this.setOperation} />
          </RowOne>
          <RowOne>
            <Botoes label="1" onClick={this.addDigit} />
            <Botoes label="2" onClick={this.addDigit} />
            <Botoes label="3" onClick={this.addDigit} />
            <Botoes label="+" operation onClick={this.setOperation} />
          </RowOne>
          <RowOne>
            <Botoes label="0" double onClick={this.addDigit} />
            <Botoes label="." onClick={this.addDigit} />
            <Botoes label="=" operation onClick={this.setOperation} />
          </RowOne>
        </ViewButtons>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: 300 / 4,
    width: 166,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#888"
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231"
  },
  buttomDouble: {
    width: (Dimensions.get("window").width / 4) * 2
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3
  }
});
