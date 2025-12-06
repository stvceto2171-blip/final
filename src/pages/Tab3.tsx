import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonLoading
} from '@ionic/react';
import './Tab3.css';

interface Team {
  id: number;
  title: {
    rendered: string;
  };
  // Update: Allow acf to be 'any' or check for optional properties
  // This prevents TypeScript from complaining if ACF is sometimes an empty array
  acf?: {
    records?: string;
    statistics?: string;
    past_performances?: string;
    big_plays?: string;
  } | any; 
}

const Tab3: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://dev-cs55nflteams.pantheonsite.io/wp-json/wp/v2/team');
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NFL Teams</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NFL Teams</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Loading Teams..." />

        <div className="container">
          {teams.map((team) => (
            <IonCard key={team.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {/* Safely render title, check if it exists */}
                  {team.title?.rendered}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList lines="none">
                  
                  <IonItem>
                    <IonLabel>
                      <h2>Team Records</h2>
                      {/* USE ?. HERE - This prevents the crash */}
                      <p>{team.acf?.records || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Statistics</h2>
                      <p>{team.acf?.statistics || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Big Plays</h2>
                      <p>{team.acf?.big_plays || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Performance</h2>
                      <p>{team.acf?.past_performances || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                </IonList>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
