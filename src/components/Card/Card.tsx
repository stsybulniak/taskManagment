import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { ICard } from '../../store/list';
import * as listActions from '../../store/list/actions';
import './Card.scss';

interface ICardProps {
  card: ICard;
  index: number;
  columnIndex: number;
}

const Card: FC<ICardProps> = ({ card, index, columnIndex }) => {
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            className='Card'
            onDoubleClick={() => dispatch(listActions.setSelectedCard({ columnIndex, cardIndex: index }))}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{card.title}</div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
