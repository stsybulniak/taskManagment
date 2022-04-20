import { FC } from 'react';
import { ReactComponent as IconPlus } from '../../../assets/icons/plus.svg';
import './AddSign.scss';

interface IAddSignProps {
  text?: string;
  onClick: () => void;
}

const AddSign: FC<IAddSignProps> = (props) => {
  const { text = 'Add', onClick } = props;
  return (
    <div className='AddSign' onClick={onClick}>
      <IconPlus className='AddSign__icon' />
      <div className='AddSign__text'>{text}</div>
    </div>
  );
};

export default AddSign;
