import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfilHeader from '../../components/ProfileHeader/ProfileHeader';
import theme from '../../theme';
import CustomButton from '../../components/CustomButton/CustomButton';
import PieChart from 'react-native-pie-chart';
import ObjectifCard from '../../components/ObjectifCard/ObjectifCard';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileById } from '../../api/profiles';
import { fetchGoalById } from '../../api/goals'; // Exemples d'API à ajouter
import { fetchExerciseById } from '../../api/exercises';
import { fetchProgramById } from '../../api/programs';
import { fetchFollowingsByProfileId } from '../../api/followings';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  const { data: profile, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => fetchProfileById(profileId),
    enabled: !!profileId,
  });

  const { data: goals } = useQuery({
    queryKey: ["goals", profileId],
    queryFn: () => fetchGoalById(profileId),
    enabled: !!profileId,
  });

  const { data: exercises } = useQuery({
    queryKey: ["exercises", profileId],
    queryFn: () => fetchExerciseById(profileId),
    enabled: !!profileId,
  });

  const { data: programs } = useQuery({
    queryKey: ["programs", profileId],
    queryFn: () => fetchProgramById(profileId),
    enabled: !!profileId,
  });

  const { data: followers } = useQuery({
	queryKey: ["followers", profileId],
	queryFn: () => fetchFollowingsByProfileId(profileId, 1),
	enabled: !!profileId,
  });

  const [chartType, setChartType] = useState<'time' | 'exercises'>('time');

  const getChartData = () => {
    if (chartType === 'time') {
      return exercises?.map((exercise) => exercise.duration) || [];
    } else {
      return exercises?.map((exercise) => exercise.count || 1) || [];
    }
  };

  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

  const recentGoals = goals?.slice?.(-2) || [];
  const recentExercises = exercises?.slice(-2) || [];
  const recentPrograms = programs?.slice(-2) || [];

  const renderLegend = () => {
    const legendData = [
      { category: 'Course à pied', color: '#F44336' },
      { category: 'Natation', color: '#2196F3' },
      { category: 'Cyclisme', color: '#FFEB3B' },
      { category: 'Yoga', color: '#4CAF50' },
      { category: 'Musculation', color: '#FF9800' },
    ];

    return (
      <View style={styles.legendContainer}>
        {legendData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.category}</Text>
          </View>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.profilheader}>
        {profile && (
          <ProfilHeader
            name={profile.firstname ?? ''}
            username={profile.pseudo ?? ''}
            followers={followers. || 0}
            profileImage={profile.avatar_url ?? ''}
            exercisesCount={recentExercises.length}
            programsCount={recentPrograms.length}
            goalsCount={recentGoals.length}
            onEditProfile={() => {}}
            onShareProfile={() => {}}
          />
        )}
      </View>

      <View style={styles.containeract}>
        <Text style={styles.titletxt}>Mon activité</Text>
        <View style={styles.containerbtn}>
          <CustomButton
            children='Exercices'
            style={[styles.btn, chartType === 'exercises' && styles.btnActive]}
            labelStyle={{ fontSize: 12, fontWeight: '600' }}
            onPress={() => setChartType('exercises')}
          />
          <CustomButton
            children='Temps'
            style={[styles.btn, chartType === 'time' && styles.btnActive]}
            labelStyle={{ fontSize: 12, fontWeight: '600' }}
            onPress={() => setChartType('time')}
          />
        </View>

        <View style={styles.containergrah}>
          <PieChart
            widthAndHeight={250}
            series={getChartData()}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={theme.colors.background}
          />
        </View>
        {renderLegend()}
      </View>

      <View style={styles.containerobj}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.titletxt}>Mes objectifs</Text>
          <Text style={styles.subtitletxt} onPress={() => navigation.navigate('GoalsScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {recentGoals.map((goal) => (
            <ObjectifCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              progress={goal.progress}
              startDate={goal.start_date}
              endDate={goal.end_date}
            />
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.titletxt}>Mes exercices</Text>
          <Text style={styles.subtitletxt} onPress={() => navigation.navigate('ExercisesScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {recentExercises.map((exercise) => (
            <ActivityCard
              key={exercise.id}
              exerciseTitle={exercise.title}
              duration={`${exercise.duration} min`}
              isFavorite={exercise.is_favorite}
              username={exercise.username}
              tags={exercise.tags || ['N/A']}
              onToggleFavorite={() => console.log('Toggle Favorite')}
              onExercisePress={() => console.log('Go to exercise')}
            />
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.titletxt}>Mes programmes</Text>
          <Text style={styles.subtitletxt} onPress={() => navigation.navigate('ProgramsScreen' as never)}>
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {recentPrograms.map((program) => (
            <ActivityCard
              key={program.id}
              exerciseTitle={program.title}
              duration={`${program.duration} min`}
              isFavorite={program.is_favorite}
              username={program.username}
              description={program.description}
              tags={program.tags || ['N/A']}
              onToggleFavorite={() => console.log('Toggle Favorite')}
              onExercisePress={() => console.log('Go to program')}
            />
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
  btn: {
    marginRight: 10,
    padding: 0,
  },
  btnActive: {
    backgroundColor: theme.colors.primary,
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
});

export default DashboardScreen;
