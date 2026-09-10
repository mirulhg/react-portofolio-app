import { useParams } from "react-router-dom";
import { projects } from "./data/projects";
import { ProyekDetail } from "./DetailProyekModal";

export function ProyekDetailPage() {
  const { slug } = useParams();
  const proyek = projects.find((item) => item.slug === slug);

  if (!proyek) {
    return (
      <main className="px-section-px py-section-py">
        <p className="mx-auto max-w-content text-body text-ink-muted">Proyek tidak ditemukan.</p>
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
