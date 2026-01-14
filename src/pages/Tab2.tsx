import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea, IonButton, IonToggle, IonLabel, IonItem, IonToast, IonLoading } from '@ionic/react';
import './Tab2.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createRepository } from '../services/GithubService';


const Tab2: React.FC = () => {

  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const saveRepository = async () => {
    if (name.trim() === '') {
      setToastMessage('El nombre del repositorio es obligatorio.');
      setToastColor('danger');
      setShowToast(true);
      return;
    }
    setLoading(true);
    try {
      await createRepository(name, description, isPrivate);
      setToastMessage('Repositorio creado exitosamente.');
      setToastColor('success');
      setShowToast(true);
      // Limpiar formulario
      setName('');
      setDescription('');
      setIsPrivate(false);
      // Redirigir después de un breve delay
      setTimeout(() => {
        history.push('/tab1');
      }, 1500);
    } catch (err) {
      setToastMessage('Error al crear el repositorio.');
      setToastColor('danger');
      setShowToast(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          ></IonInput>

          <IonTextarea
            label="Descripción Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter text"
            className="form-field"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            rows={6}
          ></IonTextarea>

          <IonItem className="form-field">
            <IonLabel>Repositorio Privado</IonLabel>
            <IonToggle
              checked={isPrivate}
              onIonChange={(e) => setIsPrivate(e.detail.checked)}
              slot="end"
            />
          </IonItem>

          <IonButton
            expand='block'
            className='form-field'
            onClick={saveRepository}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Repositorio'}
          </IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
        />
        <IonLoading isOpen={loading} message="Creando repositorio..." />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
