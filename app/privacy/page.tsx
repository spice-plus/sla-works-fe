import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "/WORKSのプライバシーポリシーについて説明しています。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-[90%] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            プライバシーポリシー
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              /WORKS（以下「当サイト」）は、ユーザーの個人情報の保護を重要視し、個人情報保護法を遵守し、適切な取り扱いを行います。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. 収集する情報
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトでは、以下の情報を収集する場合があります：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  アクセスログ（IPアドレス、ブラウザ情報、アクセス日時等）
                </li>
                <li>Cookie及び類似技術による情報</li>
                <li>
                  お問い合わせフォームに入力された情報（お名前、メールアドレス等）
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. 情報の利用目的
              </h2>
              <p className="text-gray-700 mb-4">
                収集した情報は以下の目的で利用いたします：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>サイトの運営・改善</li>
                <li>ユーザーサポート</li>
                <li>アクセス解析による利用状況の把握</li>
                <li>お問い合わせへの対応</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Cookieについて
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトでは、ユーザーの利便性向上のためCookieを使用する場合があります。Cookieは、ユーザーのブラウザに保存される小さなデータファイルです。
              </p>
              <p className="text-gray-700 mb-4">
                Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができますが、サイトの一部機能が正常に動作しない場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. アクセス解析ツールについて
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトでは、Google
                Analyticsなどのアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用してユーザーの行動を分析しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. 第三者への提供
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. 個人情報の管理
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. お問い合わせ
              </h2>
              <p className="text-gray-700 mb-4">
                個人情報の取り扱いに関するお問い合わせは、運営会社までご連絡ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. プライバシーポリシーの変更
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、必要に応じてプライバシーポリシーを変更する場合があります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                制定日：2025年1月1日
                <br />
                最終更新日：2025年1月1日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
