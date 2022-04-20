import { useEffect, useState, FC } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DraggableElement from '../../components/DraggbleElement/DraggableElement';
import { IApplicationState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import * as listActions from '../../store/list/actions';
import Spinner from '../common/Spinner/Spinner';
import AddField from '../common/AddField/AddField';
import { IList } from '../../store/list';
import AddSign from '../common/AddSign/AddSign';
import { Modal } from 'react-responsive-modal';
import SelectedCard from '../SelectedCard/SelectedCard';
import './Board.scss';

const Board: FC = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.fetchLists());
  }, []);

  const { isLoading, lists, selectedCardColumnInd, selectedCardInd } = useSelector(
    (state: IApplicationState) => state.list
  );

  const selectedCard =
    selectedCardColumnInd !== undefined && selectedCardInd !== undefined
      ? lists[selectedCardColumnInd].cards[selectedCardInd]
      : null;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    dispatch(listActions.dropCard(result));
  };

  const addNewColumn = (data: any) => {
    setIsAddingColumn(false);
    const newList: Partial<IList> = { title: data.field, cards: [] };
    dispatch(listActions.addNewColumn(newList));
  };

  const onCloseModal = () => dispatch(listActions.setSelectedCard());

  return (
    <>
      <Spinner isFullScreen isLoading={isLoading} />
      <Modal open={!!selectedCard} onClose={onCloseModal} onOverlayClick={onCloseModal} center>
        <SelectedCard cardIndex={selectedCardInd!} columnIndex={selectedCardColumnInd!} card={selectedCard!} />
      </Modal>

      <div className='Board'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='Board__list'>
            {lists.map((list, index) => (
              <DraggableElement list={list} key={list.id} index={index} />
            ))}
            {!isAddingColumn && (
              <div>
                <AddSign onClick={() => setIsAddingColumn(true)} text='Add column' />
              </div>
            )}
            {isAddingColumn && <AddField onSubmit={addNewColumn} onCancel={() => setIsAddingColumn(false)} />}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
