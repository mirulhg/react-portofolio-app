import { Route, Routes, useLocation, type Location } from "react-router-dom";
import { SiteHeader } from "./app/layout/SiteHeader";
import { SiteFooter } from "./app/layout/SiteFooter";
import { HomePage } from "./app/HomePage";
import { ProyekDetailPage, ProyekDetailModalRoute } from "./features/proyek";

interface NavigationState {
  backgroundLocation?: Location;
}

export function App() {
  const location = useLocation();
  const backgroundLocation = (location.state as NavigationState | null)?.backgroundLocation;

  return (
    <>
      <SiteHeader />
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyek/:slug" element={<ProyekDetailPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/proyek/:slug" element={<ProyekDetailModalRoute />} />
        </Routes>
      )}
      <SiteFooter />
    </>
  );
}
