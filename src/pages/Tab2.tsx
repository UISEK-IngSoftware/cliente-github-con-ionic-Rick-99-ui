import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea, IonButton } from '@ionic/react';
import './Tab2.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createdRepository } from '../services/GithubService';


const Tab2: React.FC = () => {

  const history = useHistory();

  const repoFormData : RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };
  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };
  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }
    createdRepository(repoFormData)
    .then(() => {
      history.push('/tab1');
    }).catch(() => {
      alert('Error al crear el repositorio.');
    });
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
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          ></IonInput>

          <IonTextarea
            label="Descripción Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter text"
            className="form-field"
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            rows={6}
          ></IonTextarea>

          <IonButton expand='block' className='form-field' onClick={saveRepository}>
            Guardar
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
