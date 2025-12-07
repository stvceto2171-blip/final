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
import './Tab1.css'; 

// 1. CORRECTED INTERFACE for Sport data
interface SportItem {
  id: number;
  title: {
    rendered: string;
  };
  // Using optional chaining safety
  acf?: {
    sport?: string;
    team?: string;
    player?: string;
    comment?: string;
  } | any; 
}

// Renamed component for clarity, though "Tab1" would also work if that's your file name
const SportList: React.FC = () => {
  const [sportItems, setSportItems] = useState<SportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSportItems = async () => {
      try {
        // 2. CORRECTED ENDPOINT URL
        const response = await fetch('https://dev-cs55nflteams.pantheonsite.io/wp-json/wp/v2/sport');
        const data = await response.json();
        setSportItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sport items:', error);
        setLoading(false);
      }
    };

    fetchSportItems();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sport Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sport Details</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Loading Sport Data..." />

        <div className="container">
          {/* 3. CORRECTED JSX MAPPING */}
          {sportItems.map((item) => (
            <IonCard key={item.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {item.title?.rendered}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList lines="none">
                  
                  <IonItem>
                    <IonLabel>
                      <h2>Sport Type</h2>
                      {/* Using Optional Chaining for safe access */}
                      <p>{item.acf?.sport || 'N/A'}</p> 
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Team Name</h2>
                      <p>{item.acf?.team || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Player Position</h2>
                      <p>{item.acf?.player || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Commentary</h2>
                      <p>{item.acf?.comment || 'N/A'}</p>
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

export default SportList;
