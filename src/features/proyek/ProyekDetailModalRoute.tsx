import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "./data/useProjects";
import { ProyekDetail } from "./DetailProyekModal";

export function ProyekDetailModalRoute() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: projects, loading } = useProjects();
  const proyek = projects.find((item) => item.slug === slug);

  // Beda dari sekadar "belum ada data": kalau masih loading, jangan tampilkan apa-apa
  // dulu (modal kosong sekejap terasa lebih wajar daripada kedip pesan "tidak
  // ditemukan" yang salah). Begitu selesai loading dan proyek tetap tidak ketemu
  // (slug salah/tautan lama), modal tetap dibuka dengan pesan yang jelas — bukan
  // diam-diam menutup tanpa penjelasan.
  if (loading) return null;

  return <ProyekDetail proyek={proyek ?? null} presentation="modal" onClose={() => navigate(-1)} />;
}
