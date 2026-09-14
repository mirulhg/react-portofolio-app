import { useRef } from "react";
import { useDialogA11y } from "../../shared/hooks/useDialogA11y";
import { useDialogTransition } from "../../shared/hooks/useDialogTransition";
import { ProyekTidakDitemukan } from "./ProyekTidakDitemukan";
import type { Proyek } from "./types";

type ProyekDetailProps =
  | { proyek: Proyek; presentation: "page" }
  // `proyek` boleh null di modal: slug yang tidak cocok (tautan lama/typo) tetap
  // membuka modal berisi pesan "tidak ditemukan", bukan diam-diam menutup.
  | { proyek: Proyek | null; presentation: "modal"; onClose: () => void };

const SAMPUL_PLACEHOLDER_CLASS =
  "bg-[repeating-linear-gradient(135deg,var(--line-strong)_0px,var(--line-strong)_1px,transparent_1px,transparent_12px)]";

// Durasi transisi masuk/keluar modal (HANDOFF §1 "Modal masuk": 280ms). Dipakai juga sebagai
// jeda sebelum benar-benar menutup (navigate), supaya animasi keluar sempat diputar penuh
// sebelum route-nya di-unmount.
const MODAL_TRANSITION_MS = 280;

export function ProyekDetail(props: ProyekDetailProps) {
  const { proyek } = props;
  const isModal = props.presentation === "modal";
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseProp = props.presentation === "modal" ? props.onClose : undefined;
  const { phase, requestClose } = useDialogTransition(isModal, onCloseProp ?? (() => {}), MODAL_TRANSITION_MS);

  useDialogA11y(panelRef, isModal, requestClose);

  const konten = !proyek ? (
    <ProyekTidakDitemukan />
  ) : (
    <div className="flex flex-col gap-6">
      <div aria-hidden="true" className={`h-[220px] w-full rounded-lg ${SAMPUL_PLACEHOLDER_CLASS}`} />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-label uppercase text-ink-faint">{proyek.category}</span>
        {proyek.anonim && (
          <span className="rounded-pill border border-line-strong px-2 py-0.5 font-mono text-label text-ink-muted">
            NDA
          </span>
        )}
        {proyek.mandiri && (
          <span className="rounded-pill border border-line-strong px-2 py-0.5 font-mono text-label text-ink-muted">
            Proyek Mandiri
          </span>
        )}
      </div>

      <h2 id="detail-proyek-judul" className="font-heading text-h2 font-semibold text-ink">
        {proyek.title}
      </h2>

      <section className="flex flex-col gap-2">
        <h3 className="font-heading text-h3 font-semibold text-ink">Masalahnya</h3>
        <p className="text-body text-ink-muted">{proyek.masalah}</p>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-heading text-h3 font-semibold text-ink">Peran saya</h3>
        <p className="text-body text-ink-muted">{proyek.peran}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-heading text-h3 font-semibold text-ink">Prosesnya</h3>
        <ol className="flex flex-col gap-3">
          {proyek.proses.map((langkah) => (
            <li key={langkah.no} className="flex gap-4">
              <span className="font-mono text-body-sm tabular-nums text-ink-faint">{langkah.no}</span>
              <span className="text-body text-ink-muted">{langkah.teks}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-2 rounded-lg bg-bg-alt p-5">
        <h3 className="font-heading text-h3 font-semibold text-ink">Hasilnya</h3>
        <p className="text-body text-ink-muted">{proyek.hasil}</p>
      </section>

      {proyek.tautan ? (
        <a
          href={proyek.tautan}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[48px] w-fit items-center justify-center rounded-md bg-grad-accent px-6 text-body font-medium text-bg-base transition-transform duration-[170ms] ease-out hover:-translate-y-0.5"
        >
          Buka situs
        </a>
      ) : (
        <p className="text-body-sm text-ink-muted">Situs sudah tidak tayang.</p>
      )}
    </div>
  );

  if (props.presentation === "page") {
    return konten;
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={requestClose}
        className={`fixed inset-0 z-50 bg-bg-base transition-opacity duration-200 ${
          phase === "exiting" ? "ease-in" : "ease-out"
        } ${phase === "open" ? "opacity-70" : "opacity-0"}`}
      />
      {/* Wrapper penengah panel ini menutupi seluruh viewport di z-index yang sama dengan
          backdrop dan ada di atasnya dalam urutan cat — tanpa handler di sini, klik di luar
          panel tidak pernah sampai ke backdrop. onClick di sini + stopPropagation di panel
          meniru "klik latar menutup" dengan benar. */}
      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" onClick={requestClose}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-proyek-judul"
          onClick={(event) => event.stopPropagation()}
          className={`flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-lg bg-bg-raised shadow-xl transition-[opacity,transform] duration-[280ms] md:max-w-[640px] md:rounded-lg ${
            phase === "exiting" ? "ease-in" : "ease-out"
          } ${
            phase === "open" ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[.98] opacity-0"
          }`}
        >
          <div className="sticky top-0 flex justify-end bg-bg-raised p-4">
            <button
              type="button"
              onClick={requestClose}
              className="flex h-11 w-11 items-center justify-center rounded-md"
            >
              <span className="sr-only">Tutup detail proyek</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          <div className="px-6 pb-6">{konten}</div>
        </div>
      </div>
    </>
  );
}
