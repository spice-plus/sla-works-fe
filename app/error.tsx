"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをエラー報告サービスにログ出力
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">何かが間違っています！</h2>
        <p className="text-muted-foreground">
          リクエストの処理中にエラーが発生しました。
        </p>
        <Button
          onClick={
            // セグメントの再レンダリングを試行して復旧を試みる
            () => reset()
          }
        >
          もう一度試す
        </Button>
      </div>
    </div>
  );
}
