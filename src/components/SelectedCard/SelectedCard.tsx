import { FC, useState } from 'react';
import { ICard } from '../../store/list';
import { ReactComponent as IconPencil } from '../../assets/icons/pencil.svg';
import AddField from '../common/AddField/AddField';
import './SelectedCard.scss';
import { useDispatch } from 'react-redux';
import * as listActions from '../../store/list/actions';
import Button from '../common/Button/Button';

interface ISelectedCardProps {
  card?: ICard;
  columnIndex: number;
  cardIndex: number;
}

enum EditField {
  title = 'title',
  description = 'description',
}

const SelectedCard: FC<ISelectedCardProps> = (props) => {
  const { card, columnIndex, cardIndex } = props;
  const [editField, setEditField] = useState<EditField | null>(null);

  const dispatch = useDispatch();

  if (!card) {
    return null;
  }

  const onUpdateCard = (card: Partial<ICard>) => {
    dispatch(listActions.updateCard({ card, columnIndex, cardIndex }));
    setEditField(null);
  };

  const onDeleteCard = () => {
    dispatch(listActions.deleteCard({ columnIndex, cardIndex }));
    dispatch(listActions.setSelectedCard());
  };

  return (
    <div className='SelectedCard'>
      {editField !== EditField.title && (
        <div className='SelectedCard__title'>
          {card.title} <IconPencil className='SelectedCard__iconEdit' onClick={() => setEditField(EditField.title)} />
        </div>
      )}
      {editField === EditField.title && (
        <AddField
          defaultValue={card.title}
          onSubmit={(data: { field: string }) => onUpdateCard({ title: data.field })}
          onCancel={() => setEditField(null)}
        />
      )}
      {editField !== EditField.description && (
        <div className='SelectedCard__description'>
          <h4>Description</h4>

          {card.description}
          <IconPencil className='SelectedCard__iconEdit' onClick={() => setEditField(EditField.description)} />
        </div>
      )}
      {editField === EditField.description && (
        <AddField
          className='SelectedCard__editDesc'
          textArea
          defaultValue={card.description}
          onSubmit={(data: { field: string }) => onUpdateCard({ description: data.field })}
          onCancel={() => setEditField(null)}
        />
      )}

      <div className='SelectedCard__delete'>
        <Button danger onClick={onDeleteCard}>
          Delete card
        </Button>
      </div>
    </div>
  );
};

export default SelectedCard;
