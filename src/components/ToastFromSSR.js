"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function ToastFromSSR({ quote, news }) {
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;

    if (quote?.content) {
      toast.info(`"${quote.content}" — ${quote.author}`, {
        autoClose: 6000,
      });
    }

    if (news?.title) {
      toast.success(news.title, { autoClose: 6000 });
    }
  }, [quote, news]);

  return null;
}
