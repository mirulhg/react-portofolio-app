import { useEffect, useState } from "react";
import { supabase } from "../../../shared/lib/supabaseClient";
import { proyekSchema, type Proyek } from "../types";

// Cache sederhana di level modul: data proyek jarang berubah dalam satu sesi
// pemakaian situs, jadi cukup diambil sekali dan dipakai bersama oleh
// ProyekSection, ProyekDetailPage, dan ProyekDetailModalRoute.
let cache: Proyek[] | null = null;
let inflight: Promise<Proyek[]> | null = null;

async function fetchProjects(): Promise<Proyek[]> {
  if (cache) return cache;
  if (!inflight) {
    inflight = (async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        const parsed = (data ?? []).map((row) => proyekSchema.parse(row));
        cache = parsed;
        return parsed;
      } finally {
        inflight = null;
      }
    })();
  }
  return inflight;
}

// Panggil ini setelah menambah/mengubah/menghapus baris di Supabase (mis. lewat
// tombol "muat ulang") supaya cache lama tidak terus dipakai.
export function invalidateProjectsCache() {
  cache = null;
}

export interface UseProjectsResult {
  data: Proyek[];
  loading: boolean;
  error: string | null;
}

export function useProjects(): UseProjectsResult {
  const [state, setState] = useState<UseProjectsResult>({
    data: cache ?? [],
    loading: !cache,
    error: null,
  });

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : "Gagal memuat data proyek dari Supabase.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
