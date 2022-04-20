import { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import cn from 'classnames';
import './Spinner.scss';

interface ISpinner {
  size?: number;
  speedMultiplier?: number;
  margin?: number;
  className?: string;
  isFullScreen?: boolean;
  isLoading?: boolean;
}

const FullScreenWrapper: FC = ({ children }) => {
  return (
    <>
      <div className={'spinnerBackdrop'} />
      <div className={'spinnerContainer'}>{children}</div>
    </>
  );
};

const Spinner: FC<ISpinner> = (props) => {
  const {
    size = props.isFullScreen ? 35 : 20,
    speedMultiplier = 1,
    margin = 10,
    className,
    isFullScreen,
    isLoading = true,
  } = props;

  if (!isLoading) {
    return null;
  }

  return isFullScreen ? (
    <FullScreenWrapper>
      <span className={cn('spinnerWrapper', className)}>
        <BeatLoader color='#324571' loading margin={margin} size={size} speedMultiplier={speedMultiplier} />
      </span>
    </FullScreenWrapper>
  ) : (
    <span className={cn('spinnerWrapper', className)}>
      <BeatLoader color='#324571' loading margin={margin} size={size} speedMultiplier={speedMultiplier} />
    </span>
  );
};

export default Spinner;
