import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { wrapper, store } from "../store/store";
import { Provider, useSelector } from "react-redux";
import { ConnectionBanner, connectionStateAndUserData } from '@/components/connection-banner';
import { MainNavigation } from '@/components/navigation-bar';
import { useDispatch } from 'react-redux';
import { DEVICE_STATE } from '@/store/types';
import { BannerState } from '@/components/connection-banner';

import { useState, useEffect } from 'react';

const NO_NAVIGATION_ROUTES = ["/login"]

function App({ Component, pageProps }: AppProps) {
  const deviceState = useSelector((state: any) => state.device)
  const width = useSelector((state: any) => state.device.width)
  const frontendSettings = useSelector((state: any) => state.frontendSettings)

  const router = useRouter();
  const dispatch = useDispatch();

  function handleWindowSizeChange() {
      const width = window.innerWidth;
      dispatch({
        type: DEVICE_STATE,
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile768: width <= 768,
          isDesktopLandScape: width > 1024
        }
      })
  }
  

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, [width]);

  return (
    <Provider store={store}>
      <div data-theme={frontendSettings?.theme}>
      {NO_NAVIGATION_ROUTES.includes(router.pathname) ? (
          <Component/>
      ): (
        <MainNavigation>
          <Component/>
        </MainNavigation>
      )}
        <ConnectionBanner/>
      </div>
    </Provider>
  )
}

export default wrapper.withRedux(App);
