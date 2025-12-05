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
import './Tab1.css'; // or your specific page css

// Interface matches your JSON structure
interface Player {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    records: string;
    statistics: string;
    past_performances: string;
    big_plays: string;
  };
}

const PlayerList: React.FC = () => {
  // State to store the players
  const [players, setPlayers] = useState<Player[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://dev-cs55nflteams.pantheonsite.io/wp-json/wp/v2/players');
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NFL Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NFL Players</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Show a loading spinner while fetching */}
        <IonLoading isOpen={loading} message="Scouting players..." />

        <div className="container">
            {/* Map through the player data */}
            {players.map((player) => (
              <IonCard key={player.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {/* Capitalize name as it comes in lowercase */}
                    {player.title.rendered.toUpperCase()}
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonList lines="none">
                    
                    <IonItem>
                      <IonLabel>
                        <h2>Statistics</h2>
                        <p>{player.acf.statistics}</p>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <h2>Records</h2>
                        <p>{player.acf.records}</p>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <h2>Big Plays</h2>
                        <p>{player.acf.big_plays}</p>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <h2>Past Performance</h2>
                        <p>{player.acf.past_performances}</p>
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

export default PlayerList;
