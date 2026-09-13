import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "./data/useProjects";
import { ProyekDetail } from "./DetailProyekModal";

export function ProyekDetailModalRoute() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: projects, loading } = useProjects();
  const proyek = projects.find((item) => item.slug === slug);

  if (loading || !proyek) return null;

  return <ProyekDetail proyek={proyek} presentation="modal" onClose={() => navigate(-1)} />;
}
