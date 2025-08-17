import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "/WORKSの利用規約について説明しています。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-[90%] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              この利用規約（以下「本規約」）は、/WORKS（以下「当サイト」）の利用条件を定めるものです。ユーザーは、当サイトを利用することで、本規約に同意したものとみなされます。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第1条（適用）
              </h2>
              <p className="text-gray-700 mb-4">
                本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第2条（利用資格）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、どなたでも無料でご利用いただけます。ただし、以下に該当する方の利用をお断りする場合があります：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>本規約に違反したことがある方</li>
                <li>反社会的勢力に該当し、または関係する方</li>
                <li>その他、当サイトが不適切と判断した方</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第3条（禁止事項）
              </h2>
              <p className="text-gray-700 mb-4">
                ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当サイトのサーバーやネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>
                  当サイトに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li>その他、当サイトが不適切と判断する行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第4条（著作権）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトに掲載されている記事、画像、その他のコンテンツの著作権は、当サイトまたは権利者に帰属します。
              </p>
              <p className="text-gray-700 mb-4">
                ユーザーは、当サイトのコンテンツを、個人的な利用の範囲を超えて複製、転載、配布することはできません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第5条（免責事項）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </p>
              <p className="text-gray-700 mb-4">
                当サイトは、ユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、当サイトとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第6条（サービス内容の変更等）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、ユーザーに通知することなく、サービスの内容を変更しまたはサービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第7条（利用規約の変更）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、当サイトの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第8条（個人情報の取扱い）
              </h2>
              <p className="text-gray-700 mb-4">
                当サイトは、ユーザーの個人情報について、当サイトの「プライバシーポリシー」に従い適切に取り扱うものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第9条（通知または連絡）
              </h2>
              <p className="text-gray-700 mb-4">
                ユーザーと当サイトとの間の通知または連絡は、当サイトの定める方法によって行うものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第10条（権利義務の譲渡の禁止）
              </h2>
              <p className="text-gray-700 mb-4">
                ユーザーは、当サイトの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                第11条（準拠法・裁判管轄）
              </h2>
              <p className="text-gray-700 mb-4">
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p className="text-gray-700 mb-4">
                当サイトに関して紛争が生じた場合には、当サイトの本店所在地を管轄する裁判所を専属的合意管轄とします。
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
