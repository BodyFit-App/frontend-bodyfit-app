import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import ActualiteScreen from '../../screens/Actualites/index';
import { ExercisesScreen } from '../../screens/exercises/index';
import ProfilScreen from '../../screens/Profil/index';

const BottomNavigationComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'actualite', title: 'Actualité', focusedIcon: 'newspaper' },
      { key: 'exercices', title: 'Exercices', focusedIcon: 'dumbbell' },
      { key: 'profil', title: 'Profil', focusedIcon: 'account' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      actualite: ActualiteScreen,
      exercices: ExercisesScreen,
      profil: ProfilScreen,
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#161626' }}
        activeColor="#2F80ED"
        inactiveColor="#2F80ED"
      />
    );
  };
  
  export default BottomNavigationComponent;