import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import LayoutCntr from "./containers/LayoutCntr";
import Main from "./pages/Main";
import BoardListPage from "./pages/board/BoardListPage";
import WritePage from "./pages/board/WritePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AreaListPage from "./pages/area/AreaListPage";
import ReadPage from "./pages/board/ReadPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TrafficListPage from "./pages/traffic/TrafficListPage";
import Roompage from "./pages/room/RoomPage";
import SearchPage from "./pages/search/SearchPage";
import SearchPwdPage from "./pages/auth/searchPwdPage";
import AdminLayoutCntr from "./containers/admin/AdminLayoutCntr";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminBoardPage from "./pages/admin/AdminboardPage";
import AdminThemePage from "./pages/admin/AdminThemePage";
import AdminTermsPage from "./pages/admin/AdminTermsPage";
import AdminStylePage from "./pages/admin/AdminStylePage";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import KoreaMap from "./components/area/KoreaMap";
import * as Theme from "./components/common/ThemeComp";
import { useEffect, useState } from "react";
import { getMainStyle } from "./modules/main/MainMod";

function App() {
  const dispatch = useDispatch();
  const { user, mainStyle } = useSelector(({ UserMod, MainMod }) => ({
    user: UserMod?.user,
    mainStyle: MainMod?.mainStyle,
  }));
  const [theme, setTheme] = useState({
    mainColor: "#99ccff", //파랑
    subColor: "#E1F0FF", //연하게
    nameColor: "#fff", //화이트
    border: "#000000", //블랙
    text: "#000000", //블랙
    buttonText: "#fff", //화이트
    button: "#333", //소프트 블랙
    hoverButton: "#666", //그레이
    smoke: "#F5F5F5", //스모크
    black: "#000", //블랙
    lightblack: "#666",
    softblack: "#333",
    white: "#fff",
    yellow: "#ebd258",
    green: "#009966",
    red: "#ff3300",
    shadow: "2px 7px 15px 8px rgba(0, 0, 0, 0.3)",
    adminColor: "#1a2b3c",
  });

  useEffect(() => {
    dispatch(getMainStyle());

    if (
      mainStyle === null ||
      mainStyle === undefined ||
      mainStyle === "basic"
    ) {
      return setTheme(Theme.basicTheme);
    }
    if (mainStyle === "dark") {
      return setTheme(Theme.darkTheme);
    }
    if (mainStyle === "green") {
      return setTheme(Theme.greenTheme);
    }
  }, [mainStyle]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <Routes>
            <Route element={<LayoutCntr />}>
              <Route path="/" element={<Main />} />
              <Route path="/chat" element={<Navigate to="/" />} />
              <Route path="/board" element={<BoardListPage />} />
              <Route path="/area" element={<AreaListPage />} />
              <Route path="/board/write" element={<WritePage />} />
              <Route path="/board/read/:readNo" element={<ReadPage />} />
              <Route
                path="/profile/:nick"
                element={user ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route path="/traffic" element={<TrafficListPage />} />
              <Route path="/room" element={<Roompage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route>
              <Route
                path="/auth/login"
                element={user ? <Navigate to="/" /> : <LoginPage />}
              />
              <Route
                path="/auth/register"
                element={user ? <Navigate to="/" /> : <RegisterPage />}
              />
              <Route
                path="/auth/searchPwd/:id/:sendTime"
                element={user ? <Navigate to="/" /> : <SearchPwdPage />}
              />
            </Route>
            <Route element={<AdminLayoutCntr />}>
              <Route
                path="/admin/user"
                element={
                  user?.grade === 2 ? <AdminUserPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/board"
                element={
                  user?.grade === 2 ? <AdminBoardPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/theme"
                element={
                  user?.grade === 2 ? <AdminThemePage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/notice"
                element={
                  user?.grade === 2 ? <AdminThemePage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/terms"
                element={
                  user?.grade === 2 ? <AdminTermsPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/style"
                element={
                  user?.grade === 2 ? <AdminStylePage /> : <Navigate to="/" />
                }
              />
            </Route>
            <Route path="map" element={<KoreaMap />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
export default App;
