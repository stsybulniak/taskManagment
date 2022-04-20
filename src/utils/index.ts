import { v4 as uuidv4 } from 'uuid';
import { ICard, IList } from '../store/list';

export const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const getCards = (prefix: string, cnt: number): ICard[] =>
  Array.from({ length: cnt }).map((_, ind) => ({
    id: uuidv4(),
    title: `Card for ${prefix}  ${ind + 1}`,
    description: `description for card ${prefix}  ${ind + 1}`,
  }));

export const getListData = (title: string, cardsCnt: number): IList => {
  const cards: ICard[] = getCards(title, cardsCnt);

  return { id:  uuidv4(), title, cards };
};
