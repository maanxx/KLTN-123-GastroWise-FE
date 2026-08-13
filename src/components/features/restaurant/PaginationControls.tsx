'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

interface PaginationControlsProps {
  totalPages: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) return null;

  const setPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNum.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
      <Button 
        variant="outline" 
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="mr-2"
      >
        {t('pagination.prev')}
      </Button>
      
      {getPageNumbers().map((pageNum, idx) => {
        if (pageNum === '...') {
          return <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>;
        }
        return (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "primary" : "outline"}
            onClick={() => setPage(pageNum as number)}
            className={`w-10 h-10 p-0 rounded-full ${currentPage === pageNum ? 'shadow-md shadow-primary-500/20' : ''}`}
          >
            {pageNum}
          </Button>
        );
      })}

      <Button 
        variant="outline" 
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="ml-2"
      >
        {t('pagination.next')}
      </Button>
    </div>
  );
};
