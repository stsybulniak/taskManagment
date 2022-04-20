import { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ReactComponent as IconCheck } from '../../../assets/icons/check.svg';
import { ReactComponent as IconCross } from '../../../assets/icons/cross.svg';
import cn from 'classnames';
import './AddField.scss';

interface IAddFieldProps {
  placeholder?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValue?: string;
  fullWidth?: boolean;
  textArea?: boolean;
  className?: string;
}

const AddField: FC<IAddFieldProps> = (props) => {
  const { placeholder = 'Enter value', onSubmit, onCancel, defaultValue = '', fullWidth, textArea, className } = props;

  const formRef = useRef<any>();
  const validationSchema = Yup.object().shape({
    field: Yup.string()
      .trim()
      .required('field is required')
      .matches(/^[a-zA-Z0-9 \n]+$/, 'Only letters and numbers are allowed'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { field: defaultValue },
  });

  const field = watch('field');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn({ AddField__fullWidth: fullWidth })}>
      <div className={cn(className, 'AddField')}>
        <div className='AddField__input'>
          {!textArea && <input placeholder={placeholder} {...register('field')} />}
          {textArea && <textarea value={field} placeholder={placeholder} {...register('field')} />}
          {errors.field && <span className='AddField__error'>{errors.field.message}</span>}
          <input type='submit' style={{ display: 'none' }} ref={formRef} />
        </div>

        <div className='AddField__icons'>
          <IconCross className='AddField__iconCross' onClick={onCancel} />
          <IconCheck
            className='AddField__iconCheck'
            onClick={() => {
              formRef.current?.click?.();
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default AddField;
