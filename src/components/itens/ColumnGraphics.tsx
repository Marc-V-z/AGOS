import React from "react";
import { Dimensions, StyleSheet, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

interface Valor {
  quantia: number;
}

interface GraphicsProps {
  //data: number[];
  data: Valor[];
  title: string;
}

export default function Graphics({ data, title }: GraphicsProps) {
  const scheme = useColorScheme();
  const textColor = scheme === "dark" ? "#fff" : "#000";

  // Limita os dados aos 12 últimos itens (ou menos se não houver 12)
  const limitedData = data.slice(Math.max(data.length - 12, 0));
  // Converte os valores de centavos para reais usando o array limitado
  const processedData = limitedData.map((item) => item.quantia / 100);
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