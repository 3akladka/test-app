import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext } from "./AppContext/AppContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Follows from "./components/Follows/Follows";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setLiked] = useState(() => {
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : [];
  });
  const [isAdded, setAdded] = useState(() => {
    const storedAdded = localStorage.getItem("adds");
    return storedAdded ? JSON.parse(storedAdded) : [];
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://b2b157cd02224c45.mokky.dev/items"
        );
        setData(response.data);
      } catch (error) {
        alert(`Произошла ошибка: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(isLiked));
  }, [isLiked]);

  useEffect(() => {
    localStorage.setItem("adds", JSON.stringify(isAdded));
  }, [isAdded]);

  const isInLikes = useCallback(
    (id) => {
      return isLiked.some((item) => item.id === id);
    },
    [isLiked]
  );

  const addToLikes = useCallback((item) => {
    setLiked((prev) => [...prev, item]);
  }, []);

  const removeFromLikes = useCallback((id) => {
    setLiked((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInAdded = useCallback(
    (id) => {
      return isAdded.some((i) => i.id === id);
    },
    [isAdded]
  );

  const addToAdded = useCallback((item) => {
    setAdded((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item]
    );
  }, []);

  const removeFromAdded = useCallback((id) => {
    setAdded((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const totalPrice = useMemo(
    () => isAdded.reduce((acc, item) => acc + item.price, 0),
    [isAdded]
  );

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <AppContext.Provider
        value={{
          data,
          loading,
          isLiked,
          setLiked,
          isAdded,
          setAdded,
          isOpen,
          setOpen,
          isInLikes,
          addToLikes,
          removeFromLikes,
          isInAdded,
          addToAdded,
          removeFromAdded,
          totalPrice,
        }}
      >
        <div className="wrapper">
          <div className="content">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/follows" element={<Follows />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
