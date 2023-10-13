import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Header from "../../components/header";
import Content from "../../components/content";


const DashboardLayout = () => {
    const {t} = useTranslation()
    return (
        <div>
            <Header />
           <Content>
               <Outlet/>
           </Content>
        </div>
    );
};

export default DashboardLayout;