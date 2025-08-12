import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, MapPin, Users, Calendar, Building2 } from 'lucide-react';
import { getCompanyWithRelatedData } from '@/lib/data';
import { generatePageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  // 静的エクスポート用に事前生成するIDを指定
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: CompanyDetailPageProps) {
  const companyData = getCompanyWithRelatedData(parseInt(params.id));
  
  if (!companyData) {
    return generatePageMetadata({
      title: '企業が見つかりません',
      description: 'お探しの企業は存在しません。',
      noIndex: true,
    });
  }

  const { company } = companyData;
  
  return generatePageMetadata({
    title: company.name,
    description: company.description,
    path: `/companies/${params.id}`,
    image: company.logoUrl,
  });
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const companyData = getCompanyWithRelatedData(parseInt(params.id));

  if (!companyData) {
    notFound();
  }

  const { company, articles } = companyData;

  // 従業員規模の日本語表示
  const employeeRangeMap = {
    small: '1-50名',
    medium: '51-300名',
    large: '301-1000名',
    enterprise: '1000名以上',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくずナビ */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#2E3A97]">ホーム</Link>
          <span>/</span>
          <Link href="/companies" className="hover:text-[#2E3A97]">企業一覧</Link>
          <span>/</span>
          <span className="text-gray-900">{company.name}</span>
        </div>
      </nav>

      {/* 企業ヘッダー */}
      <header className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={company.logoUrl} 
              alt={`${company.name}のロゴ`}
              className="w-24 h-24 object-cover rounded-lg shadow-sm"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {company.name}
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {company.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {company.location}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {employeeRangeMap[company.employeeRange]}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                設立 {company.establishedYear}年
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <a 
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#2E3A97] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E2875] transition-colors"
            >
              公式サイト
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </header>

      {/* 企業情報詳細 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {/* 事例記事一覧 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Building2 className="w-6 h-6 mr-3" />
              事例記事
            </h2>
            
            {articles.length > 0 ? (
              <div className="space-y-6">
                {articles.map((article) => (
                  <article key={article.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={article.thumbnailUrl} 
                          alt={article.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          <Link 
                            href={`/articles/${article.id}`}
                            className="hover:text-[#2E3A97] transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {article.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                          <span>{article.viewCount.toLocaleString()} 回閲覧</span>
                          <span>人気度: {article.popularityScore}/10</span>
                        </div>
                        
                        {/* 技術スタック */}
                        {article.techStack.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {article.techStack.slice(0, 3).map((tech, index) => (
                                <span 
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                              {article.techStack.length > 3 && (
                                <span className="text-gray-500 text-xs">
                                  +{article.techStack.length - 3}個
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>まだ事例記事がありません</p>
              </div>
            )}
          </div>
        </div>
        
        {/* サイドバー */}
        <div className="space-y-6">
          {/* 企業統計 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">企業統計</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">事例記事数</span>
                <span className="font-semibold">{articles.length}件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">総閲覧数</span>
                <span className="font-semibold">
                  {articles.reduce((sum, article) => sum + article.viewCount, 0).toLocaleString()}回
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">平均人気度</span>
                <span className="font-semibold">
                  {articles.length > 0 
                    ? (articles.reduce((sum, article) => sum + article.popularityScore, 0) / articles.length).toFixed(1)
                    : '0'
                  }/10
                </span>
              </div>
            </div>
          </div>
          
          {/* 使用技術 */}
          {articles.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">主要技術</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(articles.flatMap(article => article.techStack)))
                  .slice(0, 10)
                  .map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Link 
          href="/companies"
          className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          企業一覧に戻る
        </Link>
        
        {articles.length > 0 && (
          <Link 
            href="/articles"
            className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium"
          >
            すべての記事を見る
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
}