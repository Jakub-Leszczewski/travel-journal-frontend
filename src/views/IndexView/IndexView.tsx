import React, { useState } from 'react';
import { ErrorResponse, GetUserIndexResponse } from 'types';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { useUser } from '../../hooks/useUser';
import { IndexMain } from './IndexMain/IndexMain';

export function IndexView() {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [indexStatus, indexData] = useApi<GetUserIndexResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id ?? ''}/index?page=${currentPage ?? 1}`,
    [currentPage],
  );

  const changePageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <IndexMain
      indexData={indexData}
      indexStatus={indexStatus}
      changePageHandler={changePageHandler}
    />
  );
}
