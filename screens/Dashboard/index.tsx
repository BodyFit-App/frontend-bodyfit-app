import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfilHeader from '../../components/ProfileHeader/ProfileHeader';
import theme from '../../theme';
import CustomButton from '../../components/CustomButton/CustomButton';
import PieChart from 'react-native-pie-chart';
import ObjectifCard from '../../components/ObjectifCard/ObjectifCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileById } from '../../api/profiles';
import { fetchFollowingsByProfileId } from '../../api/followings';
import { getPublicUrl } from '../../lib/supabase';
import ItemCard from '../../components/ItemCard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  const { data: profile } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => fetchProfileById(profileId),
    enabled: !!profileId,
  });

  const { data: followers } = useQuery({
    queryKey: ['followers', profileId],
    queryFn: () => fetchFollowingsByProfileId(profileId, 2),
    enabled: !!profileId,
  });

  const [chartData, setChartData] = useState<number[]>([]);
  const [sliceColors, setSliceColors] = useState<string[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      const exercises = profile.exercises || [];
  
      // Préparer les données pour baser le graphique sur les catégories, non sur les exercices
      const categoryData: { [key: string]: number } = {};
  
      exercises.forEach(exercise => {
        exercise.categories.forEach(category => {
          if (category.name && category.name !== 'Inconnu') {
            // Ajouter du temps à la catégorie si elle existe déjà, sinon l'initialiser
            if (categoryData[category.name]) {
              categoryData[category.name] += exercise.estimated_time_seconds || 0;
            } else {
              categoryData[category.name] = exercise.estimated_time_seconds || 0;
            }
          }
        });
      });
  
      const data = Object.values(categoryData); // Les données pour chaque catégorie
      const labels = Object.keys(categoryData); // Les labels des catégories
  
      if (data.every(value => value === 0)) {
        setChartData([]);
        setSliceColors([]);
        setChartLabels([]);
      } else {
        setChartData(data);
  
        // Attribuer les couleurs pour chaque catégorie
        const colors = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];
        const colorCount = Math.max(data.length, colors.length);
        const colorsForChart = colors.slice(0, colorCount);
  
        while (colorsForChart.length < data.length) {
          colorsForChart.push(colorsForChart[colorsForChart.length % colors.length]);
        }
  
        setSliceColors(colorsForChart.slice(0, data.length));
        setChartLabels(labels.slice(0, data.length)); // Mettre à jour les labels des catégories
      }
    }
  }, [profile]);
  
  const pieChartColors = chartData.length > 0 ? sliceColors : [];
  const pieChartLabels = chartData.length > 0 ? chartLabels : [];

  return (
    <ScrollView>
      <View style={styles.profilheader}>
        {profile && (
          <ProfilHeader
            name={profile.firstname ?? ''}
            username={profile.pseudo ?? ''}
            followers={followers?.length ?? 0}
            profileImage={getPublicUrl('images', profile.avatar_url ?? '')}
            exercisesCount={profile.exercises?.length ?? 0}
            programsCount={profile.programs?.length ?? 0}
            goalsCount={profile.goals?.length ?? 0}
            onEditProfile={() => {}}
            onShareProfile={() => {}}
          />
        )}
      </View>

      <View style={styles.containeract}>
        <Text style={styles.titletxt}>Mon activité</Text>
        <View style={styles.containerbtn}>
          <CustomButton
            children='Temps'
 
			
            labelStyle={{ fontSize: 12, fontWeight: '600' }}
            onPress={() => {}}
          />
        </View>

        <View style={styles.containergrah}>
          {chartData.length > 0 ? (
            <>
              <PieChart
                widthAndHeight={250}
                series={chartData}
                sliceColor={pieChartColors}
                doughnut={true}
                coverRadius={0.45}
                coverFill={theme.colors.background}
              />
              <View style={styles.legendContainer}>
                {pieChartLabels.map((label, index) => (
                  <View style={styles.legendItem} key={index}>
                    <View style={[styles.legendColor, { backgroundColor: pieChartColors[index] }]} />
                    <Text style={styles.legendText}>{label}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>Aucune donnée disponible</Text>
          )}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Mes objectifs</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() => navigation.navigate('GoalsScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.goals?.slice(-2).map((goal) => (
            <ObjectifCard
              key={goal.id}
              title={goal.title}
              description={goal.description ?? ''}
              progress={goal.achieved ? 1 : 0}
              startDate={goal.date_start ?? ''}
              endDate={goal.date_end ?? ''}
            />
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Mes exercices</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() => navigation.navigate('ExercisesScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.exercises?.slice(-2).map((exercise) => (
            <View style={styles.itemCardContainer} key={exercise.id}>
              <ItemCard
                title={exercise.title}
                time={exercise.estimated_time_seconds ?? 0}
                categories={exercise.categories.map((categorie) => categorie.name) ?? []}
                pseudo={profile.pseudo ?? ''}
                isFav={true}
                onPressFav={() => console.log('Toggle Favorite')}
                onPressNav={() => console.log('Go to exercise')}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Mes programmes</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() => navigation.navigate('ProgramsScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.programs?.slice(-2).map((program) => (
            <View style={styles.itemCardContainer} key={program.id}>
              <ItemCard
                title={program.title}
                description={program.description ?? ''}
                pseudo={profile.pseudo ?? ''}
                isFav={true}
                onPressFav={() => console.log('Toggle Favorite')}
                onPressNav={() => console.log('Go to program')}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilheader: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  containeract: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  containerobj: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  containerbtn: {
    flexDirection: 'row',
    marginTop: 20,
  },
  containercard: {
    flexDirection: 'column',
    marginTop: 20,
  },
  containergrah: {
    marginTop: 40,
    alignItems: 'center',
  },
  titletxt: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitletxt: {
    color: theme.colors.textPlaceholder,
    fontSize: 12,
    fontWeight: '600',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  noDataText: {
    color: theme.colors.textPlaceholder,
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCardContainer: {
    marginBottom: 10,
  },
});

export default DashboardScreen;
