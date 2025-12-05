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

// 1. Define the Interface based on the "Team" JSON structure
interface Team {
  id: number;
  title: {
    rendered: string;
  };
  // We use the 'acf' object to access the custom fields
  acf: {
    records: string;
    statistics: string;
    past_performances: string;
    big_plays: string;
  };
}

const Tab3: React.FC = () => {
  // 2. State for storing the list of teams
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 3. Fetch data from the Team endpoint
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

        {/* Loading Indicator */}
        <IonLoading isOpen={loading} message="Loading Teams..." />

        <div className="container">
          {/* 4. Map through the teams */}
          {teams.map((team) => (
            <IonCard key={team.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {team.title.rendered}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList lines="none">
                  
                  <IonItem>
                    <IonLabel>
                      <h2>Team Records</h2>
                      <p>{team.acf.records}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Statistics</h2>
                      <p>{team.acf.statistics}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Big Plays</h2>
                      <p>{team.acf.big_plays}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Performance</h2>
                      <p>{team.acf.past_performances}</p>
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
