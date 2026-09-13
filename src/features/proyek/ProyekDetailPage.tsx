import { useParams } from "react-router-dom";
import { useProjects } from "./data/useProjects";
import { ProyekDetail } from "./DetailProyekModal";

export function ProyekDetailPage() {
  const { slug } = useParams();
  const { data: projects, loading, error } = useProjects();
  const proyek = projects.find((item) => item.slug === slug);

  if (loading) {
    return (
      <main className="px-section-px py-section-py">
        <p className="mx-auto max-w-content text-body text-ink-muted">Memuat proyek…</p>
      </main>
    );
  }

  if (error || !proyek) {
    return (
      <main className="px-section-px py-section-py">
        <p className="mx-auto max-w-content text-body text-ink-muted">
          {error ? `Gagal memuat data proyek: ${error}` : "Proyek tidak ditemukan."}
        </p>
      </main>
    );
  }

  return (
    <main className="px-section-px py-section-py">
      <div className="mx-auto max-w-content">
        <ProyekDetail proyek={proyek} presentation="page" />
      </div>
    </main>
  );
}
