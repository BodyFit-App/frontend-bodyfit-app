import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, Icon } from 'react-native-paper';
import theme from '../../theme';

interface DateChipProps {
  title: string;
  date?: Date;
}

/**
 * `DateChip` component displays a card with a title and an optional date, 
 * along with a calendar icon.
 *
 * @param {DateChipProps} props - The props for the `DateChip` component.
 * @param {string} props.title - The title text to display in the chip.
 * @param {Date} [props.date] - Optional date to display, formatted as a string. 
 * If no date is provided, an empty string is shown.
 * @returns {JSX.Element} The rendered `DateChip` component.
 */

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
          <Text style={styles.titleLarge}>{title}</Text>
          <Text style={styles.bodyMedium}>{formattedDate}</Text>
        </View>
        <Icon source="calendar" size={24} color={theme.colors.primary} />
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
    paddingVertical: 6, 
    paddingHorizontal: 12, 
  },
  containerInfo: {
    flexDirection: 'column',
    marginRight: 16,
    alignItems: 'flex-start',
  },
  titleLarge: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  bodyMedium: {
    fontSize: 12,
    color: theme.colors.textFollow,
    marginTop: 4,
  },
});
