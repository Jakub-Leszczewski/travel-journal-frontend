import React from 'react';
import './Pagination.css';
import PaginationCore from 'rc-pagination';

interface Props {
  totalItems: number;
  itemPerPage: number;
  onChangePage: (page: number) => void;
}

export function Pagination({
  totalItems, itemPerPage, onChangePage,
}: Props) {
  return (
    <div className="Pagination">
      <PaginationCore
        defaultCurrent={1}
        hideOnSinglePage
        showTitle={false}
        showLessItems
        total={totalItems}
        pageSize={itemPerPage}
        jumpNextIcon={null}
        onChange={onChangePage}
      />
    </div>
  );
}
