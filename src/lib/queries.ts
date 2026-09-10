import { supabase } from "./supabase";

export async function fetchCorridors() {
  const { data, error } = await supabase.from("corridors").select("*");
  if (error) throw error;
  return data;
}

export async function fetchCorridorBySlug(slug: string) {
  const { data, error } = await supabase
    .from("corridors")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*, corridors(slug, name_en, name_fr)");
  if (error) throw error;
  return data;
}

export async function fetchEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*, corridors(slug, name_en, name_fr)")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchTradeStates() {
  const { data, error } = await supabase
    .from("trade_states")
    .select("*, corridors(slug, name_en, name_fr), obligations(*)");
  if (error) throw error;
  return data;
}

export async function fetchTradeStateBySlug(slug: string) {
  const { data, error } = await supabase
    .from("trade_states")
    .select("*, corridors(slug, name_en, name_fr), obligations(*)")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchSignals() {
  const { data, error } = await supabase
    .from("signals")
    .select("*, corridors(slug, name_en, name_fr)");
  if (error) throw error;
  return data;
}