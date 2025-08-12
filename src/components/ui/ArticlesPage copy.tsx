import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc, SortDesc, Eye, Settings, MapPin } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem } from '../components/ui/form';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { ArticleCard } from '../components/ui/ArticleCard';
import { GradientBox } from '../components/ui/GradientBox';
import { AdvancedSearchModal } from '../components/features/AdvancedSearchModal';
import { Pagination } from '../components/ui/Pagination';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useArticles } from '../hooks/useArticles';
import { useCompanies, useCategories, useTags } from '../hooks/useData';
import { SearchFilters, Article } from '../models/types';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import { Link } from 'react-router-dom';

interface SearchFormData {
  keyword: string;
}

export const ArticlesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // URLパラメータから初期フィルターを構築
  const getInitialFilters = (): SearchFilters => {
    const initialFilters: SearchFilters = {
      sortBy: 'date',
      sortOrder: 'desc'
    };

    // キーワード
    const keyword = searchParams.get('keyword');
    if (keyword) {
      initialFilters.keyword = keyword;
    }

    // カテゴリ（複数対応）
    const categories = searchParams.get('categories');
    if (categories) {
      initialFilters.categories = categories.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    }

    // 記事タイプ（複数対応）
    const articleTypes = searchParams.get('articleTypes');
    if (articleTypes) {
      initialFilters.articleTypes = articleTypes.split(',') as SearchFilters['articleTypes'];
    }

    // 企業ID（複数対応）
    const companyIds = searchParams.get('companyIds');
    if (companyIds) {
      initialFilters.companyIds = companyIds.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    }

    // 都道府県（複数対応）
    const prefectures = searchParams.get('prefectures') || searchParams.get('prefecture');
    if (prefectures) {
      // 単一の都道府県の場合は配列に変換、複数の場合はカンマ区切りで分割
      initialFilters.prefectures = prefectures.includes(',') 
        ? prefectures.split(',') 
        : [prefectures];
    }

    // ソート
    const sortBy = searchParams.get('sortBy') as SearchFilters['sortBy'];
    if (sortBy && ['date', 'popularity', 'views'].includes(sortBy)) {
      initialFilters.sortBy = sortBy;
    }

    const sortOrder = searchParams.get('sortOrder') as SearchFilters['sortOrder'];
    if (sortOrder && ['asc', 'desc'].includes(sortOrder)) {
      initialFilters.sortOrder = sortOrder;
    }

    return initialFilters;
  };

  const [filters, setFilters] = useState<SearchFilters>({
    ...getInitialFilters()
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      keyword: filters.keyword || '',
    },
  });

  const { data: articlesData, isLoading: articlesLoading } = useArticles(filters, currentPage, 12);
  const { data: companies } = useCompanies();
  const { data: categories } = useCategories();
  const { data: tags } = useTags();

  const articles = articlesData?.data || [];
  const totalPages = articlesData?.totalPages || 1;

  // ページ遷移時にスクロール位置をリセット
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  // ページ変更時にスクロール位置をリセット
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // フィルター更新関数
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  // キーワード検索
  const handleKeywordSearch = (data: SearchFormData) => {
    updateFilters({ keyword: data.keyword || undefined });
  };

  // カテゴリフィルター
  const handleCategoryToggle = (categoryId: number) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    updateFilters({ categories: newCategories.length > 0 ? newCategories : undefined });
  };

  // 記事タイプフィルター
  const handleArticleTypeToggle = (articleType: Article['articleType']) => {
    const currentTypes = filters.articleTypes || [];
    const newTypes = currentTypes.includes(articleType)
      ? currentTypes.filter(type => type !== articleType)
      : [...currentTypes, articleType];
    updateFilters({ articleTypes: newTypes.length > 0 ? newTypes : undefined });
  };

  // ソート変更
  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'desc' ? 'asc' : 'desc';
    updateFilters({ sortBy, sortOrder: newSortOrder });
  };

  // フィルターリセット
  const resetFilters = () => {
    setFilters({ sortBy: 'date', sortOrder: 'desc' });
    setCurrentPage(1);
  };

  // 詳細検索の実行
  const handleAdvancedSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // アクティブフィルター数
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.categories?.length) count++;
    if (filters.articleTypes?.length) count++;
    // 詳細検索のフィルターをまとめてカウント
    const advancedFiltersCount = 
      (filters.companyIds?.length || 0) +
      (filters.prefectures?.length || 0);
    if (advancedFiltersCount > 0) count++;
    return count;
  }, [filters]);

  // SEOメタデータを動的に生成
  const seoMetadata = useMemo(() => {
    const baseSeo = {
      title: "記事一覧",
      description: "テック企業の事例記事一覧。システム開発、DX、AI、セキュリティなど様々な分野の事例記事を検索・フィルタリングして探せます。",
      keywords: "事例記事,記事一覧,システム開発,DX,AI,セキュリティ,検索,フィルタリング"
    };

    // 都道府県フィルターが適用されている場合
    if (filters.prefectures && filters.prefectures.length > 0) {
      const prefectureNames = filters.prefectures;
      
      if (prefectureNames.length === 1) {
        const prefecture = prefectureNames[0];
        return {
          title: `${prefecture}の開発事例記事一覧`,
          description: `${prefecture}のテック企業・開発会社による事例記事一覧。${prefecture}でのシステム開発、DX推進、AI導入、セキュリティ対策などの実績・事例を探せます。`,
          keywords: `${prefecture},開発事例,システム開発,DX,AI,セキュリティ,テック企業,開発会社,実績`
        };
      } else if (prefectureNames.length <= 3) {
        const prefectureList = prefectureNames.join('・');
        return {
          title: `${prefectureList}の開発事例記事一覧`,
          description: `${prefectureList}のテック企業・開発会社による事例記事一覧。各地域でのシステム開発、DX推進、AI導入などの実績・事例を探せます。`,
          keywords: `${prefectureNames.join(',')},開発事例,システム開発,DX,AI,地域別,テック企業`
        };
      } else {
        return {
          title: `複数地域の開発事例記事一覧（${prefectureNames.length}都道府県）`,
          description: `全国${prefectureNames.length}都道府県のテック企業・開発会社による事例記事一覧。地域を横断したシステム開発、DX推進、AI導入などの実績・事例を探せます。`,
          keywords: `全国,複数地域,開発事例,システム開発,DX,AI,テック企業,地域別`
        };
      }
    }

    // カテゴリフィルターが適用されている場合
    if (filters.categories && filters.categories.length > 0 && categories) {
      const selectedCategories = categories.filter(cat => filters.categories?.includes(cat.id));
      if (selectedCategories.length === 1) {
        const category = selectedCategories[0];
        return {
          title: `${category.name}の事例記事一覧`,
          description: `${category.name}分野の事例記事一覧。${category.description}に関する実績・導入事例を探せます。`,
          keywords: `${category.name},事例記事,実績,導入事例,${category.slug}`
        };
      }
    }

    // 企業フィルターが適用されている場合
    if (filters.companyIds && filters.companyIds.length > 0 && companies) {
      const selectedCompanies = companies.filter(comp => filters.companyIds?.includes(comp.id));
      if (selectedCompanies.length === 1) {
        const company = selectedCompanies[0];
        return {
          title: `${company.name}の事例記事一覧`,
          description: `${company.name}による開発事例記事一覧。${company.description}`,
          keywords: `${company.name},事例記事,開発実績,${company.prefecture}`
        };
      }
    }

    // キーワード検索が適用されている場合
    if (filters.keyword) {
      return {
        title: `「${filters.keyword}」の検索結果 - 事例記事一覧`,
        description: `「${filters.keyword}」に関する事例記事の検索結果。システム開発、DX、AI、セキュリティなどの分野から関連記事を探せます。`,
        keywords: `${filters.keyword},検索結果,事例記事,システム開発,DX,AI`
      };
    }

    return baseSeo;
  }, [filters, categories, companies]);

  const articleTypeLabels = {
    interview: 'インタビュー',
    process: 'プロセス',
    survey: 'アンケート',
    deliverable: '成果物'
  };

  return (
    <GradientBox gradient="background" className="min-h-screen">
      <SEOHead
        title={seoMetadata.title}
        description={seoMetadata.description}
        keywords={seoMetadata.keywords}
      />

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページタイトル */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">記事一覧</h1>
          <p className="text-gray-600">
            {articlesData?.total || 0}件の記事が見つかりました
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左サイドバー - 検索・フィルター */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* モバイル用フィルター切り替え */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full justify-between"
                >
                  <span className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    フィルター
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={clsx("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
                </Button>
              </div>

              <div className={clsx("space-y-6", "lg:block", !showFilters && "hidden")}>
                <Card>
                  <CardContent className="space-y-6">
                    {/* キーワード検索 */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">キーワード検索</h3>
                      <Form {...searchForm}>
                        <form onSubmit={searchForm.handleSubmit(handleKeywordSearch)}>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <FormField
                              control={searchForm.control}
                              name="keyword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="記事タイトルを検索..."
                                      className="pl-10"
                                      {...field}
                                      onBlur={(e) => {
                                        field.onBlur();
                                        handleKeywordSearch({ keyword: e.target.value });
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </form>
                      </Form>
                    </div>

                    {/* カテゴリフィルター */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">カテゴリ</h3>
                      <div className="space-y-2">
                        {categories?.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                            id={`category-${category.id}`}
                            checked={filters.categories?.includes(category.id) || false}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                            <label htmlFor={`category-${category.id}`} className="text-sm font-medium">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 記事タイプフィルター */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">記事タイプ</h3>
                      <div className="space-y-2">
                        {Object.entries(articleTypeLabels).map(([type, label]) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                            id={`article-type-${type}`}
                            checked={filters.articleTypes?.includes(type as Article['articleType']) || false}
                            onCheckedChange={() => handleArticleTypeToggle(type as Article['articleType'])}
                          />
                            <label htmlFor={`article-type-${type}`} className="text-sm font-medium">
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 選択中の詳細検索条件 */}
                    {(filters.prefectures?.length || filters.companyIds?.length) && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">選択中の詳細条件</h3>
                        <div className="space-y-2">
                          {filters.prefectures && filters.prefectures.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">都道府県</p>
                              <div className="flex flex-wrap gap-1">
                                {filters.prefectures.length > 3 ? (
                                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    {filters.prefectures.slice(0, 3).join('、')}他{filters.prefectures.length - 3}件
                                  </span>
                                ) : (
                                  filters.prefectures.map((prefecture) => (
                                    <span key={prefecture} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                      {prefecture}
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                          {filters.companyIds && filters.companyIds.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">開発会社</p>
                              <div className="flex flex-wrap gap-1">
                                {(() => {
                                  const selectedCompanies = companies?.filter(c => filters.companyIds?.includes(c.id)) || [];
                                  return selectedCompanies.length > 2 ? (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                      {selectedCompanies.slice(0, 2).map(c => c.name).join('、')}他{selectedCompanies.length - 2}社
                                    </span>
                                  ) : (
                                    selectedCompanies.map((company) => (
                                      <span key={company.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {company.name}
                                      </span>
                                    ))
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 詳細検索ボタン */}
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => setShowAdvancedSearch(true)}
                        size="sm"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        詳細検索
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* フィルターリセット */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    フィルターをリセット
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* 右メインコンテンツ - 記事一覧 */}
          <div className="flex-1">
            {/* ツールバー */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* ソート */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">並び順:</span>
                <Button
                  variant={filters.sortBy === 'date' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleSortChange('date')}
                  className="flex items-center"
                >
                  新着順
                  {filters.sortBy === 'date' && (
                    filters.sortOrder === 'desc' ? <SortDesc className="w-3 h-3 ml-1" /> : <SortAsc className="w-3 h-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant={filters.sortBy === 'views' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleSortChange('views')}
                  className="flex items-center"
                >
                  閲覧数順
                  {filters.sortBy === 'views' && (
                    filters.sortOrder === 'desc' ? <SortDesc className="w-3 h-3 ml-1" /> : <SortAsc className="w-3 h-3 ml-1" />
                  )}
                </Button>
              </div>

              {/* 表示切り替え */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 記事一覧 */}
            {articlesLoading ? (
              <LoadingSkeleton count={12} type={viewMode === 'grid' ? 'card' : 'list'} />
            ) : articles.length === 0 ? (
              <EmptyState
                icon={Search}
                title="記事が見つかりませんでした"
                description="検索条件を変更してお試しください"
                actionLabel="フィルターをリセット"
                onAction={resetFilters}
              />
            ) : (
              <>
                <div className={clsx(
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                )}>
                  {articles.map((article) => (
                    viewMode === 'grid' ? (
                      <ArticleCard key={article.id} article={article} />
                    ) : (
                      <Link key={article.id} to={`/articles/${article.id}`}>
                        <Card hover className="flex rounded-xl overflow-hidden">
                          <div className="w-48 h-48 flex-shrink-0">
                            <img
                              src={article.thumbnailUrl}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-l-xl"
                            />
                          </div>
                          <CardContent className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex gap-2 mb-2">
                                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded">
                                  {article.category?.name}
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  {articleTypeLabels[article.articleType]}
                                </span>
                                <span className="flex items-center text-gray-500 text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {article.viewCount.toLocaleString()}
                                </span>
                              </div>
                              <h3 className="font-bold text-gray-900 hover:text-primary-500 transition-colors line-clamp-2 mb-2">
                                {article.title.length > 37 ? `${article.title.substring(0, 37)}...` : article.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                {article.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-3">
                                <span className="flex items-center">
                                  <img 
                                    src={article.company?.logoUrl} 
                                    alt={article.company?.name}
                                    className="w-4 h-4 rounded mr-2"
                                  />
                                  {article.company?.name}
                                </span>
                                <span className="flex items-center text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {article.company?.prefecture}
                                </span>
                              </div>
                              <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  ))}
                </div>

                {/* ページネーション */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 詳細検索モーダル */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        currentFilters={{
          ...filters,
          categories: filters.categories,
          articleTypes: filters.articleTypes,
          companyIds: filters.companyIds,
          prefectures: filters.prefectures
        }}
        onSearch={handleAdvancedSearch}
      />

      <Footer />
    </GradientBox>
  );
};