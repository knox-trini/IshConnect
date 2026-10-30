import { useEffect, useState } from "react";
import { getPublicContent, getPublicItem } from "@/lib/cms-api";

export function usePublicContent<T>(type: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  useEffect(() => {
    let active = true;
    getPublicContent<T>(type).then((records) => { if (active) setItems(records); }).catch(() => undefined);
    return () => { active = false; };
  }, [type]);
  return items;
}

export function usePublicItem<T>(type: string, slug: string, fallback?: T) {
  const [item, setItem] = useState<T | undefined>(fallback);
  useEffect(() => {
    let active = true;
    getPublicItem<T>(type, slug).then((record) => { if (active) setItem(record); }).catch(() => undefined);
    return () => { active = false; };
  }, [type, slug]);
  return item;
}
