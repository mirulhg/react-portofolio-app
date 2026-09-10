import { useNavigate, useParams } from "react-router-dom";
import { projects } from "./data/projects";
import { ProyekDetail } from "./DetailProyekModal";

export function ProyekDetailModalRoute() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const proyek = projects.find((item) => item.slug === slug);

  if (!proyek) return null;

  return <ProyekDetail proyek={proyek} presentation="modal" onClose={() => navigate(-1)} />;
}
