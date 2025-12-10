import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';

const RepoItem: React.FC<{repo: RepositoryItem}> = ({ repo }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
        <img src={repo.imageUrl || ""}/>
        </IonThumbnail>
        <IonLabel>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <p>Proprietario: {repo.owner}</p>
        <p>Lenguaje: {repo.language}</p>
        </IonLabel>
    </IonItem>
  );
};

export default RepoItem;