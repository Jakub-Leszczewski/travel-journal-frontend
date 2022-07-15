import React from 'react';
import './Pagination.css';
import PaginationCore from 'rc-pagination';

interface Props {
  totalPages: number;
  itemPerPage: number;
  onChangePage: (page: number) => void;
}

export function Pagination({
  totalPages, itemPerPage, onChangePage,
}: Props) {
  return (
    <div className="Pagination">
      <PaginationCore
        defaultCurrent={1}
        hideOnSinglePage
        showTitle={false}
        showLessItems
        total={totalPages}
        pageSize={itemPerPage}
        jumpNextIcon={null}
        onChange={onChangePage}
      />
    </div>
  );
}
