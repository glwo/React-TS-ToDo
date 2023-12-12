import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import Divider from '@mui/joy/Divider';

import DashboardIcon from '@mui/icons-material/SpaceDashboardOutlined';
import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import FAQIcon from '@mui/icons-material/HelpOutlineOutlined';

interface LayoutProps {
  tabIndex: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ tabIndex, children }) => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState<number>(tabIndex);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/');
    } else if (index === 1) {
      navigate('/tasks');
    } else if (index === 2) {
      navigate('/FAQ');
    }
  };

  return (
    <div className='Layout'>
      <div className='Sidebar'>
        <h1>Todo List</h1>
        <Divider></Divider>
        <div className='Menu'>
          <div
            className={selectedIndex === 0 ? 'Menu-item-selected' : 'Menu-item'}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <DashboardIcon />
            <p>
              <strong>Dashboard</strong>
            </p>
          </div>
          <div
            className={selectedIndex === 1 ? 'Menu-item-selected' : 'Menu-item'}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <UsersIcon />
            <p>
              <strong>Tasks</strong>
            </p>
          </div>
          <div
            className={selectedIndex === 2 ? 'Menu-item-selected' : 'Menu-item'}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <FAQIcon />
            <p>
              <strong>FAQ</strong>
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
