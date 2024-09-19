import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, Icon, IconButton } from 'react-native-paper';
import theme from '../../theme';

interface DateChipProps {
  title: string;
  date?: Date;

}

export default function DateChip({
  title,
  date,
}: DateChipProps) {
  // Formatage de la date avant l'affichage
  const formattedDate = date ? date.toLocaleDateString() : '';
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.container}>
        <View style={styles.containerInfo}>
          <Text style={styles.titleLarge}>Date de début</Text>
          <Text style={styles.bodyMedium}>02/02/1994</Text>
        </View>
        <Icon source="calendar" size={26} color={theme.colors.primary} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundNav,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  containerInfo: {
    flexDirection: 'column',
    marginRight: 16,
    alignItems:'flex-start'
  },
  titleLarge: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700', 
  },
  bodyMedium: {
    fontSize: 17,
    color: theme.colors.textFollow,
    marginTop: 4,
   
  },
});
