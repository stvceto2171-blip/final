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

// 1. UPDATED INTERFACE to match the new ACF fields (deporte, equipo, jugador, comentario)
interface DeporteItem {
  id: number;
  title: {
    rendered: string;
  };
  // Allow acf to be optional/any to handle empty ACF data safely
  acf?: {
    deporte?: string;
    equipo?: string;
    jugador?: string;
    comentario?: string;
  } | any; 
}

const Tab3: React.FC = () => {
  // Use the new interface for state
  const [deporteItems, setDeporteItems] = useState<DeporteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDeporteItems = async () => {
      try {
        // 2. UPDATED ENDPOINT URL
        const response = await fetch('https://dev-cs55nflteams.pantheonsite.io/wp-json/wp/v2/deporte');
        const data = await response.json();
        // Set the state with the new data
        setDeporteItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deporte items:', error);
        setLoading(false);
      }
    };

    fetchDeporteItems();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Deporte Information</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Deporte Information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Loading Deporte Data..." />

        <div className="container">
          {/* 3. UPDATED JSX MAPPING */}
          {deporteItems.map((item) => (
            <IonCard key={item.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {/* Title of the Post (e.g., nfl football) */}
                  {item.title?.rendered}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList lines="none">
                  
                  <IonItem>
                    <IonLabel>
                      <h2>Deporte (Sport)</h2>
                      {/* Using the new ACF field name 'deporte' */}
                      <p>{item.acf?.deporte || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Equipo (Team)</h2>
                      {/* Using the new ACF field name 'equipo' */}
                      <p>{item.acf?.equipo || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Jugador (Player)</h2>
                      {/* Using the new ACF field name 'jugador' */}
                      <p>{item.acf?.jugador || 'N/A'}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <h2>Comentario (Comment)</h2>
                      {/* Using the new ACF field name 'comentario' */}
                      <p>{item.acf?.comentario || 'N/A'}</p>
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
