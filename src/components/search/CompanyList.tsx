"use client";

import type { Company } from "../../models/types";
import { CompanyHorizontalCard } from "../ui/cards/CompanyHorizontalCard";

interface CompanyListProps {
  companies: Company[];
  articleCountMap: Map<number, number>;
}

export function CompanyList({ companies, articleCountMap }: CompanyListProps) {
  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">🏢</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          開発会社が見つかりませんでした
        </h3>
        <p className="text-gray-500">検索条件を変更して再度お試しください</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {companies.map((company) => {
        const articleCount = articleCountMap.get(company.id) || 0;

        return (
          <CompanyHorizontalCard
            key={company.id}
            company={company}
            articleCount={articleCount}
          />
        );
      })}
    </div>
  );
}
