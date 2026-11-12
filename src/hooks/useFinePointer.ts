import { useMediaQuery } from "@/hooks/useMediaQuery";

/** True on devices with a precise pointer that can hover (mouse / trackpad). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
