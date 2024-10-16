import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import Header from '../Header/Header';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './Dashboard.scss'

export default function Dashboard() {
    const [drawerState, setDrawerState] = useState(false);
    const navigate=useNavigate()

    const toggleDrawer = (action='demo') => {
        setDrawerState(!drawerState)
        if(action!=='demo'){
            navigate(action)
        }
        
        
    };

    return (
        <div className='dashboard-main-container'>
            <Header toggleDrawer={toggleDrawer} />
            {/* <Button onClick={toggleDrawer}>Open Drawer</Button> */}
            <Drawer className='db-drawer-main-container' anchor="left" open={drawerState} onClose={() => toggleDrawer()}>
            <div className='db-drawer-main-container'>
                <div className='db-drawer-left-icon' onClick={()=>toggleDrawer("notes")} > <LightbulbOutlinedIcon /> <span className='db-drawer-icon'> Notes </span> </div>    
                <div className='db-drawer-left-icon' onClick={()=>toggleDrawer("archive")} > <ArchiveOutlinedIcon/> <span className='db-drawer-icon' > Archive </span> </div>
                <div className='db-drawer-left-icon' onClick={()=>toggleDrawer("trash")}>  <DeleteOutlineOutlinedIcon/> <span className='db-drawer-icon'> Trash </span></div>
                <div className='db-drawer-left-icon'  > <NotificationsNoneOutlinedIcon  /> <span  className='db-drawer-icon' > Notifications  </span></div>
                {/* <RestoreFromTrashTwoToneIcon  /> */}
                </div> 
            </Drawer>
            <div className='db-main-container'>
                <div className='db-left-main-container'>
                <div className='db-left-icon' onClick={()=>navigate('notes')} > <LightbulbOutlinedIcon/> </div>    
                <div className='db-left-icon'onClick={()=>navigate('archive')} > <ArchiveOutlinedIcon/> </div>
                <div className='db-left-icon' onClick={()=>navigate('trash')} >  <DeleteOutlineOutlinedIcon/> </div>
                <div className='db-left-icon'  > <NotificationsNoneOutlinedIcon  />  </div>
                
                
                {/* <RestoreFromTrashTwoToneIcon  /> */}
                </div> 
                <Outlet />
               
            </div>
           
          
        </div>
    );
}
