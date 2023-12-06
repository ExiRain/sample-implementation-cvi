import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { useQuery } from '@tanstack/react-query';
import { Header } from "../../exportcomponents/src/index";
import useUserInfoStore from "../../exportcomponents/src/header/store/store";
import MainNavigation  from "../../exportmenu/menu";

const Layout: FC = () => {
    const CACHE_NAME = 'mainmenu-cache';
    const [MainMenuItems, setMainMenuItems] = useState([])

    const  {data, isLoading, status}  = useQuery({
        queryKey: [import.meta.env.REACT_APP_MENU_PATH,import.meta.env.REACT_APP_MENU_URL],
        onSuccess: (res: any) => {
            try {
                setMainMenuItems(res);
                localStorage.setItem(CACHE_NAME, JSON.stringify(res));
            } catch (e) {
                console.log(e);
            }
        },
        onError: (error: any) => {
            setMainMenuItems(getCache());
        }

    });

    function getCache(): any {
        const cache = localStorage.getItem(CACHE_NAME) || '{}';
        return JSON.parse(cache);
    }

    return (
    <div className='layout'>
      <div id='placeholder_for_main_navigation'><MainNavigation baseUrl={import.meta.env.REACT_APP_REDIRECT_BASE_URL} items={[]}/></div>
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'> <Header
            user={useUserInfoStore.getState()}
            baseUrl={"http://localhost:4003"}
            baseUrlV2={"http://localhost:5003"}
            analyticsUrl={"http://localhost:6003"}
        /></div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
