import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Drift Masck" src="https://www.stitchedinfaith.com/images/Drift_mask4.jpg" />
      <IonCardHeader>
        <IonCardTitle>Riccardo Ceron</IonCardTitle>
        <IonCardSubtitle>Rick-99-ui</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Me presento me llamo Riccardo Alessandro Ceron Carrera</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
