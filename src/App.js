import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import PostListPage from './pages/PostListPage';
import PostFormPage from './pages/PostFormPage';
import PostItemPage from './pages/PostItemPage';
import PreferencesPage from './pages/PreferencesPage';
import AboutUsPage from './pages/AboutUsPage';
import AboutUsIntroductionPage from './pages/AboutUsPage/Introduction';
import AboutUsMissionPage from './pages/AboutUsPage/Mission';
import AboutUsPrivacyPage from './pages/AboutUsPage/Privacy';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as database from './database';
import { setPosts } from './redux/postSlice';
import { useDispatch } from 'react-redux';
import Loading from './components/Loading';

export default function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //IIFE - Immediately Invoked Function Expresion
    (async () => {
      //Load the database.
      const data = await database.load();
      dispatch(setPosts(data));
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, []);
  // Alt + Z
  return (
    <>
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/posts"
            element={<PostListPage />}
          />
          <Route
            path="/preferences"
            element={<PreferencesPage />}
          />
          <Route
            path="/posts/add"
            element={<PostFormPage />}
          />

          <Route
            path="/posts/:id"
            element={<PostItemPage />}
          />

          {/* Nested Routes for About */}
          <Route
            path="/about-us"
            element={<AboutUsPage />}
          >
            <Route
              path=""
              element={<AboutUsIntroductionPage />}
            />
            <Route
              path="mission"
              element={<AboutUsMissionPage />}
            />
            <Route
              path="privacy"
              element={<AboutUsPrivacyPage />}
            />
          </Route>

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      )}

      <Footer />
    </>
  );
}

//export default App;
