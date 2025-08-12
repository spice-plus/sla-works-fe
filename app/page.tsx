import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Building2, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            技術記事プラットフォーム
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            企業の技術事例や開発ストーリーを発見しよう
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/articles">
                <FileText className="mr-2 h-5 w-5" />
                記事を読む
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/companies">
                <Building2 className="mr-2 h-5 w-5" />
                企業を探す
              </Link>
            </Button>
          </div>
        </div>

        {/* 主要コンテンツセクション */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-6 w-6 text-blue-600" />
                技術記事
              </CardTitle>
              <CardDescription>
                最新の技術トレンドや実装事例を企業の実体験から学ぶ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                システム開発、DX、AI、セキュリティなど、様々な分野の技術記事を企業の実際のプロジェクト事例から学べます。
              </p>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/articles" className="flex items-center">
                  記事一覧を見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-6 w-6 text-green-600" />
                企業情報
              </CardTitle>
              <CardDescription>
                技術力の高い企業とその取り組みを知る
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                革新的な技術を活用している企業の情報や、その企業が手がけたプロジェクトの詳細を確認できます。
              </p>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/companies" className="flex items-center">
                  企業一覧を見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 特徴セクション */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            プラットフォームの特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">実践的な事例</h3>
              <p className="text-sm text-gray-600">
                実際のプロジェクトから得られた知見と経験を共有
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">信頼できる情報源</h3>
              <p className="text-sm text-gray-600">
                技術力の高い企業による質の高い情報を提供
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">継続的な学習</h3>
              <p className="text-sm text-gray-600">
                最新の技術トレンドを継続的にキャッチアップ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}