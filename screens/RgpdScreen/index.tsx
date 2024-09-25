import { ScrollView, Text, StyleSheet, Linking } from "react-native";
import { Title, Paragraph, Divider } from "react-native-paper";

const RgpdScreen = () => {
    
    return (
        <ScrollView style={styles.container}>
        <Title style={styles.title}>BodyFit App</Title>
        <Paragraph style={styles.date}>Dernière mise à jour : [17/09/2024]</Paragraph>
  
        <Paragraph>
          Bienvenue dans <Text style={styles.bold}>BodyFit App</Text>, une application mobile dédiée à la santé, au fitness
          et au bien-être. La protection de vos données personnelles est une priorité pour nous. Cette politique de
          confidentialité décrit les informations que nous collectons, comment elles sont utilisées, partagées et
          protégées. En utilisant <Text style={styles.bold}>BodyFit App</Text>, vous acceptez les pratiques décrites dans cette politique de confidentialité.
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>1. Informations que nous collectons</Title>
        <Paragraph>
          Lorsque vous utilisez <Text style={styles.bold}>BodyFit App</Text>, nous pouvons collecter les types d'informations suivants :
        </Paragraph>
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>a. Informations personnelles</Text> {"\n"}
          - Nom et prénom {"\n"}
          - Adresse e-mail {"\n"}
          - Données de connexion et mot de passe (si vous créez un compte)
        </Paragraph>
  
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>b. Données techniques</Text> {"\n"}
          - Modèle de l'appareil, système d'exploitation, version de l'application {"\n"}
          - Adresse IP et identifiants uniques des appareils mobiles
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>c. Données d'utilisation</Text> {"\n"}
          - Informations sur votre utilisation de l’application {"\n"}
          - Statistiques d'engagement
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>2. Comment nous utilisons vos informations</Title>
        <Paragraph>
          Nous utilisons vos données personnelles pour les finalités suivantes :
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>a. Améliorer l'expérience utilisateur</Text> {"\n"}
          - Personnaliser l'application en fonction de vos besoins de fitness {"\n"}
          - Fournir des recommandations d'entraînement
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>b. Fournir des services</Text> {"\n"}
          - Suivre vos progrès et performances {"\n"}
          - Envoyer des notifications liées à vos objectifs
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>c. Assurer la sécurité</Text> {"\n"}
          - Vérifier votre identité et protéger votre compte {"\n"}
          - Prévenir les fraudes et garantir une utilisation sécurisée de l'application
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>d. Communications</Text> {"\n"}
          - Vous envoyer des mises à jour, offres ou autres informations pertinentes, sous réserve de votre consentement
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>e. Analyses et recherches</Text> {"\n"}
          - Analyser les statistiques d'utilisation pour améliorer nos services {"\n"}
          - Réaliser des études internes pour optimiser nos fonctionnalités
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>3. Partage de vos informations</Title>
        <Paragraph>
          Nous ne vendons pas vos informations personnelles. Toutefois, vos données peuvent être partagées dans les cas
          suivants :
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>a. Partenaires de service</Text> {"\n"}
          - Avec des prestataires de services tiers (hébergement, maintenance, services d'analyse) pour nous aider à exploiter et améliorer l’application.
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>b. Exigences légales</Text> {"\n"}
          - Si la loi nous l’impose, nous pouvons divulguer vos données pour répondre à une demande des autorités.
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>c. Fusion ou acquisition</Text> {"\n"}
          - En cas de fusion, acquisition ou vente d'actifs, vos informations peuvent être transférées à la nouvelle entité responsable.
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>4. Protection et sécurité de vos données</Title>
        <Paragraph>
          Nous prenons la sécurité de vos informations très au sérieux. Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles adaptées, notamment :
        </Paragraph>
        <Paragraph style={styles.section}>
          - Cryptage des données sensibles (comme les mots de passe) {"\n"}
          - Surveillance régulière de notre infrastructure
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>5. Vos droits et vos choix</Title>
        <Paragraph>
          Vous disposez des droits suivants concernant vos informations personnelles :
        </Paragraph>
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>a. Accès et rectification</Text> {"\n"}
          - Vous pouvez accéder à vos données et demander leur modification.
        </Paragraph>
  
        <Paragraph style={styles.section}>
          <Text style={styles.bold}>b. Suppression</Text> {"\n"}
          - Vous pouvez demander la suppression de vos données personnelles.
        </Paragraph>
  
        <Divider style={styles.divider} />
  
        <Title style={styles.subtitle}>6. Contactez-nous</Title>
        <Paragraph>
          Si vous avez des questions, veuillez nous contacter sur notre <Text style={styles.link} onPress={() => Linking.openURL('https://discord.gg/SG4x8K7pf6')}>Discord</Text>
        </Paragraph>
  
    
      </ScrollView>
    )
}

export default RgpdScreen;

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    date: {
      fontStyle: 'italic',
      marginBottom: 16,
    },
    section: {
      marginBottom: 8,
    },
    divider: {
      marginVertical: 16,
    },
    bold: {
      fontWeight: 'bold',
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    address: {
      marginTop: 16,
    },
  });
  