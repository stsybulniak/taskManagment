import { FC } from 'react';
import Header from './Header/Header';
import './Layout.scss';


const Layout: FC = ({ children }) => <main className='Layout'><Header />{children}</main>;

export default Layout;
