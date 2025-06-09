import React from "react";
import { Dimensions, StyleSheet, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

interface GraphicsProps {
  data: number[];
  title: string;
}

export default function Graphics({ data, title }: GraphicsProps) {
  // Obtém o tema atual ("dark" ou "light")
  const scheme = useColorScheme();
  // Se o tema for escuro ("dark"), define o título como branco; caso contrário, preto.
  const textColor = scheme === "dark" ? "#fff" : "#000";

  // Converte os valores de centavos para reais
  const processedData = data.map((value) => value / 100);
  // Cria um array de labels em branco para cada coluna
  const labels = processedData.map(() => "");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <BarChart
        data={{
          labels,
          datasets: [
            {
              data: processedData,
              colors: processedData.map(() => () => "#48c9b0"),//"#2fa500"),
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // Largura do gráfico com margem
        height={140} // Altura do gráfico
        fromZero={true}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "transparent",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "transparent",
          backgroundGradientToOpacity: 0,
          barPercentage: 0.6,
          color: () => "#48c9b0", //"#2fa500",
          propsForBackgroundLines: {
            stroke: "transparent",
          },
          paddingBottom: 5,
        }}
        flatColor={true}
        withCustomBarColorFromData={true}
        formatYLabel={(y: string) => {
          const num = parseFloat(y);
          return num.toFixed(2).replace(".", ",");
        }}
        containerStyle={styles.chartContainer}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 0,
    alignItems: "center",
    backgroundColor: "transparent", //"#000",
    borderWidth: 2,
    borderColor: "#48c9b0", //"#2fa500",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  chartContainer: {
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  chart: {
    backgroundColor: "transparent",
    borderRadius: 0,
    marginBottom: 0,
  },
});