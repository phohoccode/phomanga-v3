"use client";

import {
  setIsVisiable,
  setLastScrollY,
  setLoaded,
  setShowModalCategorys,
  setShowModalNotification,
  setShowModalSearch,
  setWidth,
} from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayNotification from "./DisplayNotification";
import NavBar from "./layout/header/NavBar";
import NavBarMobile from "./layout/header/NavBarMobile";
import Footer from "./layout/Footer";
import ModalSearch from "./modals/modal-search/ModalSearch";
import ModalCategorys from "./modals/ModalCategorys";
import ModalNotification from "./modals/modal-notification/ModalNotification";
import DrawerUser from "./layout/header/DrawerUser";

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const { lastScrollY } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
    dispatch(setLoaded(true));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setWidth(window.innerWidth));

      const handleResize = () => dispatch(setWidth(window.innerWidth));
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        dispatch(setIsVisiable(false));
      } else {
        dispatch(setIsVisiable(true));
      }

      dispatch(setLastScrollY(currentScrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const showModalCategorys = useSelector(
    (state: RootState) => state.system.showModalCategorys
  );
  const showModalSearch = useSelector(
    (state: RootState) => state.system.showModalSearch
  );
  const showModalNotification = useSelector(
    (state: RootState) => state.system.showModalNotification
  );

  return (
    <DisplayNotification>
      <NavBar />

      {children}

      <NavBarMobile />

      <Footer />

      <DrawerUser />

      <ModalSearch
        isModalOpen={showModalSearch}
        onCancel={() => dispatch(setShowModalSearch(false))}
      />

      <ModalCategorys
        isModalOpen={showModalCategorys}
        onCancel={() => dispatch(setShowModalCategorys(false))}
      />

      <ModalNotification
        isModalOpen={showModalNotification}
        onCancel={() => dispatch(setShowModalNotification(false))}
      />
    </DisplayNotification>
  );
};

export default App;
