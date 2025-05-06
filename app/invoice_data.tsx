import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function InvoiceDataScreen() {
  const router = useRouter();
  const { company, invoiceNumber, issueDate, dueDate, amount } = useLocalSearchParams();
  const { imageUri: imageUriParam } = useLocalSearchParams();

  // Utilisation de useState pour gérer les données
  const [invoiceData, setInvoiceData] = useState({
    company: company || '',
    invoiceNumber: invoiceNumber || '',
    issueDate: issueDate || '',
    dueDate: dueDate || '',
    amount: amount || '',
  });

  // Utilisation de useState pour gérer l'image
  const [imageUri, setImageUri] = useState(imageUriParam || '');

  // Fonction pour réinitialiser les données
  const handleDelete = () => {
    setInvoiceData({
      company: '',
      invoiceNumber: '',
      issueDate: '',
      dueDate: '',
      amount: '',
    });
    setImageUri('');  // Réinitialiser l'image capturée
    console.log('Invoice data and image deleted');
  };

  // Fonction pour enregistrer les données
  const handleSave = () => {
    // Logique pour enregistrer les données
    console.log('Invoice data saved');
  };

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.left}>
          <Ionicons name="document-text-outline" size={30} color="#007bff" />
          <Text style={styles.title}>Invoice Data</Text>
        </View>
        <View style={styles.right}>
          <Ionicons name="search" size={24} color="#28a745" style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} color="#ffc107" style={styles.icon} />
          <MaterialIcons name="settings" size={24} color="#dc3545" style={styles.icon} />
        </View>
      </View>

      {/* CONTENU */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Invoice Detail</Text>
        <Text style={styles.description}>Here you'll be able to see your invoice</Text>

        <View style={styles.invoiceDetails}>
          {invoiceData.company && (
            <View style={styles.row}>
              <Text style={styles.labelText}>Company Name:</Text>
              <Text style={styles.valueText}>{invoiceData.company}</Text>
            </View>
          )}

          {invoiceData.invoiceNumber && (
            <View style={styles.row}>
              <Text style={styles.labelText}>Invoice Number:</Text>
              <Text style={styles.valueText}>{invoiceData.invoiceNumber}</Text>
            </View>
          )}

          {invoiceData.issueDate && (
            <View style={styles.row}>
              <Text style={styles.labelText}>Issue Date:</Text>
              <Text style={styles.valueText}>{invoiceData.issueDate}</Text>
            </View>
          )}

          {invoiceData.dueDate && (
            <View style={styles.row}>
              <Text style={styles.labelText}>Due Date:</Text>
              <Text style={styles.valueText}>{invoiceData.dueDate}</Text>
            </View>
          )}

          {invoiceData.amount && (
            <View style={styles.row}>
              <Text style={styles.labelText}>Amount:</Text>
              <Text style={styles.valueText}>{invoiceData.amount} TND</Text>
            </View>
          )}
        </View>

        {/* Affichage de l'image si elle existe */}
        {imageUri && (
          <View style={{ marginTop: -10, marginRight: 50 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Image capturée :</Text>
            <Image
              source={{ uri: imageUri.toString() }}
              style={{ width: 300, height: 200, resizeMode: 'contain', marginTop: 10, marginLeft: 50 }}
            />
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginLeft: 8,
  },
  icon: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b2169',
    marginBottom: 12,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  invoiceDetails: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // Ajuste pour mieux aligner les items
    width: '100%',
    marginBottom: 2,  // Réduit l'espace vertical entre chaque ligne
  },
  labelText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10, // Réduit l'espace entre le label et la valeur
    lineHeight: 22,  // Ajuste la hauteur de ligne pour mieux ajuster
  },
  valueText: {
    fontSize: 18,
    color: '#555',
    lineHeight: 22, // Ajuste la hauteur de ligne pour mieux ajuster
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red for delete button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
