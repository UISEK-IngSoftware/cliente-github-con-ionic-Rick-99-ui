import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            label="Nombre Del Repositorio"
            labelPlacement="floating"
            fill="solid"
            placeholder="Enter text"
            className="form-field"
          ></IonInput>

          <IonTextarea
            label="Descripción Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter text"
            className="form-field"
            rows={6}
          ></IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
