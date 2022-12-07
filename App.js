import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, StatusBar } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function App() {
  const [choosenDate, setChoosenDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [nasa, setNasa] = useState(null);

  const endpoint = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=';
  console.log(choosenDate);
  const loadData = () => {
    fetch(
      endpoint +
        choosenDate.getFullYear() +
        '-' +
        choosenDate.getMonth() +
        '-' +
        choosenDate.getDate(),
    )
      .then(res => res.json())
      .then(res => {
        setNasa(res.url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <StatusBar
        hidden={false}
        backgroundColor="#696969"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      {!nasa ? (
        <>
          <Text style={styles.texto}>
            {choosenDate.toLocaleDateString('fr')}
          </Text>
          <View style={styles.btn} />
          <Button title="Change date" onPress={() => setOpen(true)} />
          <View style={styles.btn} />
          <Button title="Search" onPress={() => loadData()} />
          <DatePicker
            modal
            open={open}
            date={choosenDate}
            onConfirm={data => {
              setOpen(false);
              setChoosenDate(data);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      ) : (
        <>
          <View style={styles.btn} />
          <Button title="Find Another Photo" onPress={() => setNasa(null)} />
          <Image
            source={{ uri: nasa }}
            style={styles.imagem}
            resizeMode="contain"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  texto: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 40,
  },
  btn: { margin: 0, padding: 5, marginLeft: 10, marginRight: 10 },
  imagem: { alignItems: 'center', alignContent: 'center' },
});
