import Link from 'next/link';
import { MapPin, Users, Calendar, Building2, ExternalLink } from 'lucide-react';
import { getAllCompanies, getArticlesByCompanyId } from '@/lib/data';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: '企業一覧',
  description: '様々な企業の情報をご覧いただけます。システム開発、DX、AI、セキュリティなど幅広い分野で活躍する企業の開発事例をご紹介しています。',
  path: '/companies',
});

export default function CompaniesPage() {
  const companies = getAllCompanies();

  // 従業員規模の日本語表示
  const employeeRangeMap = {
    small: '1-50名',
    medium: '51-300名',
    large: '301-1000名',
    enterprise: '1000名以上',
  };

  // 各企業の記事数を取得
  const companiesWithStats = companies.map(company => {
    const articles = getArticlesByCompanyId(company.id);
    const totalViews = articles.reduce((sum, article) => sum + article.viewCount, 0);
    const avgPopularity = articles.length > 0 
      ? articles.reduce((sum, article) => sum + article.popularityScore, 0) / articles.length 
      : 0;
    
    return {
      ...company,
      articleCount: articles.length,
      totalViews,
      avgPopularity,
      latestArticle: articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0],
    };
  });

  // 記事数でソート
  const sortedCompanies = companiesWithStats.sort((a, b) => b.articleCount - a.articleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          企業一覧
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          様々な企業の情報と事例をご覧いただけます
        </p>
        <div className="text-sm text-gray-500">
          全 {companies.length} 社の企業情報
        </div>
      </div>

      {/* 企業一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {sortedCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src={company.logoUrl} 
                    alt={`${company.name}のロゴ`}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/companies/${company.id}`}
                      className="hover:text-[#2E3A97] transition-colors"
                    >
                      {company.name}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {company.location}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {company.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {employeeRangeMap[company.employeeRange]}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  設立 {company.establishedYear}年
                </div>
              </div>

              {/* 企業統計 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#2E3A97]">
                      {company.articleCount}
                    </div>
                    <div className="text-xs text-gray-600">事例記事</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#2E3A97]">
                      {company.totalViews.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">総閲覧数</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#2E3A97]">
                      {company.avgPopularity.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600">平均人気度</div>
                  </div>
                </div>
              </div>

              {/* 最新記事 */}
              {company.latestArticle && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">最新事例</h4>
                  <Link 
                    href={`/articles/${company.latestArticle.id}`}
                    className="text-sm text-gray-600 hover:text-[#2E3A97] line-clamp-2"
                  >
                    {company.latestArticle.title}
                  </Link>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Link 
                  href={`/companies/${company.id}`}
                  className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium text-sm"
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  詳細を見る
                </Link>
                <a 
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  公式サイト
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 統計情報 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">企業統計</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {companies.length}
            </div>
            <div className="text-gray-600">掲載企業数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {sortedCompanies.reduce((sum, company) => sum + company.articleCount, 0)}
            </div>
            <div className="text-gray-600">総事例記事数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {sortedCompanies.reduce((sum, company) => sum + company.totalViews, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">総閲覧数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {(sortedCompanies.reduce((sum, company) => sum + company.avgPopularity, 0) / companies.length).toFixed(1)}
            </div>
            <div className="text-gray-600">平均人気度</div>
          </div>
        </div>

        {/* 企業規模別統計 */}
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">企業規模別分布</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(employeeRangeMap).map(([key, label]) => {
              const count = companies.filter(company => company.employeeRange === key).length;
              return (
                <div key={key} className="text-center">
                  <div className="text-xl font-bold text-[#475569] mb-1">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}