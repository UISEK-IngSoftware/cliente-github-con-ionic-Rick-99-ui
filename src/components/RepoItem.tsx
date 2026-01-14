import { IonItem, IonLabel, IonThumbnail, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonButtons, IonButton } from '@ionic/react';
import { createOutline, trashOutline, eyeOutline } from 'ionicons/icons';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';

const RepoItem: React.FC<{
  repo: RepositoryItem,
  onEdit: () => void,
  onDelete: () => void,
  onView?: () => void
}> = ({ repo, onEdit, onDelete, onView }) => {
  return (
    <IonItemSliding>
      <IonItem button={!!onView} onClick={onView}>
        <IonThumbnail slot="start">
          <img src={repo.imageUrl || "https://via.placeholder.com/50"} alt="Avatar" />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description || "Sin descripción"}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language || "No especificado"}</p>
        </IonLabel>
        <IonButtons slot="end" className="repo-item-buttons">
          {onView && (
            <IonButton fill="clear" color="secondary" onClick={(e) => { e.stopPropagation(); onView(); }}>
              <IonIcon icon={eyeOutline} />
            </IonButton>
          )}
          <IonButton fill="clear" color="primary" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <IonIcon icon={createOutline} />
          </IonButton>
          <IonButton fill="clear" color="danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            <IonIcon icon={trashOutline} />
          </IonButton>
        </IonButtons>
      </IonItem>
      <IonItemOptions side="end">
        {onView && (
          <IonItemOption color="secondary" onClick={onView}>
            <IonIcon slot="icon-only" icon={eyeOutline} />
          </IonItemOption>
        )}
        <IonItemOption color="primary" onClick={onEdit}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;