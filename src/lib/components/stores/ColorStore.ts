import type { ColorStoreData } from "$lib/types/Colors";
import { writable } from "svelte/store";

export const ColorStore = writable<ColorStoreData>({mainColor: "rgb(255 255 255)"})