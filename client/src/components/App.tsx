"use client";

import {
  setIsVisiable,
  setLastScrollY,
  setShowModalCategorys,
  setShowModalComment,
  setShowModalNotification,
  setShowModalSearch,
  setShowModalUpgradeLevelVip,
  setShowModalUserFeedback,
  setWidth,
} from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayNotification from "./DisplayNotification";
import NavBar from "./layout/header/NavBar";
import NavBarMobile from "./layout/header/NavBarMobile";
import Footer from "./layout/Footer";
import ModalSearch from "./modals/modal-search/ModalSearch";
import ModalCategorys from "./modals/ModalCategorys";
import ModalNotification from "./modals/modal-notification/ModalNotification";
import DrawerUser from "./layout/header/drawer/DrawerUser";
import ModalComment from "./modals/ModalComment";
import ModalUserFeedback from "./modals/ModalUserFeedback";
import ModalUpgradeLevelVip from "./modals/modal-upgrade-level-vip/ModalUpgradeLevelVip";
import FloatButtonGroup from "./FloatButtonGroup";
import { signOut, useSession } from "next-auth/react";
import { message } from "antd";

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { lastScrollY } = useSelector((state: RootState) => state.system);
  const {
    showModalCategorys,
    showModalNotification,
    showModalSearch,
    showModalComment,
    showModalUserFeedback,
    showModalUpgradeLevelVip,
    isVisiable,
  } = useSelector((state: RootState) => state.system);
  const { data: sesstion, status }: any = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (!sesstion?.user?.email) {
        message.error(
          "Toang rồi ní ơi! Không lấy được thông tin tài khoản! 😭"
        );

        setTimeout(async () => {
          await message.info("Đang đăng xuất ...");
          signOut({ callbackUrl: "/" });
        }, 2000);
      } else {
        message.success(`Xin chào, ${sesstion?.user?.name}!`);
      }
    }
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setWidth(window.innerWidth));
      setLoaded(true);
    }
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

  return (
    <DisplayNotification>
      <NavBar />
      {loaded && <NavBarMobile />}
      {children}
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

      <ModalComment
        isModalOpen={showModalComment}
        onCancel={() => dispatch(setShowModalComment(false))}
      />

      <ModalUserFeedback
        isModalOpen={showModalUserFeedback}
        onCancel={() => dispatch(setShowModalUserFeedback(false))}
      />

      <ModalUpgradeLevelVip
        isModalOpen={showModalUpgradeLevelVip}
        onCancel={() => dispatch(setShowModalUpgradeLevelVip(false))}
      />

      {!isVisiable && <FloatButtonGroup />}
    </DisplayNotification>
  );
};

export default App;
