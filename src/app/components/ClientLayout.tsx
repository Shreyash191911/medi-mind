"use client";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../../../createEmotionCache"; 
import Header from "./Header";

const clientSideEmotionCache = createEmotionCache();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Header />
      {children}
    </CacheProvider>
  );
}