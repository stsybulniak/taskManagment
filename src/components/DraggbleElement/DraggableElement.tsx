import { useState, FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ICard, IList } from '../../store/list';
import { ReactComponent as IconCross } from '../../assets/icons/cross.svg';
import { ReactComponent as IconPencil } from '../../assets/icons/pencil.svg';
import { useDispatch } from 'react-redux';
import * as listActions from '../../store/list/actions';
import AddField from '../common/AddField/AddField';
import AddSign from '../common/AddSign/AddSign';
import Card from '../Card/Card';
import './DraggableElement.scss';

interface IDraggableElement {
  list: IList;
  index: number;
}

const DraggableElement: FC<IDraggableElement> = ({ list, index }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const dispatch = useDispatch();

  const updateColumnName = (data: { field: string }) => {
    setIsEditName(false);
    dispatch(listActions.updateColumn({ list: { title: data.field }, index }));
  };

  const addNewCardToColumn = (data: { field: string }) => {
    setIsAddingCard(false);
    const card: Partial<ICard> = { title: data.field, description: '' };
    dispatch(listActions.addCard({ card, columnIndex: index }));
  };

  return (
    <div className='DraggableElement'>
      <div className='DraggableElement__header'>
        {!isEditName && (
          <>
            <div className='DraggableElement__header-title'>{list.title}</div>
            <div className='DraggableElement__header-iconsBlock'>
              <IconPencil className='DraggableElement__header-iconPencil' onClick={() => setIsEditName(true)} />
              <IconCross
                className='DraggableElement__header-icon'
                onClick={() => dispatch(listActions.removeColumn(list.id))}
              />
            </div>
          </>
        )}
        {isEditName && (
          <AddField
            fullWidth
            onSubmit={updateColumnName}
            onCancel={() => setIsEditName(false)}
            defaultValue={list.title}
          />
        )}
      </div>
      <div className='DraggableElement__contentWrapper'>
        <div className='DraggableElement__content'>
          <Droppable droppableId={`${index}`}>
            {(provided) => (
              <div className='DraggableElement__contentItem' {...provided.droppableProps} ref={provided.innerRef}>
                {list.cards.map((card, cardIndex) => (
                  <Card key={card.id} card={card} index={cardIndex} columnIndex={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
      <div className='DraggableElement__footer'>
        {!isAddingCard && <AddSign text='Add card' onClick={() => setIsAddingCard(true)} />}
        {isAddingCard && (
          <AddField
            fullWidth
            placeholder='Enter card name'
            onCancel={() => setIsAddingCard(false)}
            onSubmit={addNewCardToColumn}
          />
        )}
      </div>
    </div>
  );
};

export default DraggableElement;
