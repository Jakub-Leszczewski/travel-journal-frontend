import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorResponse, GetTravelsResponse } from 'types';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { useCompareUserId } from '../../hooks/useCompareUserId';
import { ProfileMain } from './ProfileMain/ProfileMain';

export function ProfileView() {
  const userIdCompare = useCompareUserId();
  const params = useParams();
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedTravelId, setExcludedTravelId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [travelsStatus, travelsData] = useApi<GetTravelsResponse | ErrorResponse>(
    `${apiUrl}/user/${params.id}/travel?page=${currentPage}`,
    [params, refreshFlag, currentPage],
  );

  useEffect(() => {
    setExcludedTravelId(null);
  }, [travelsData]);

  const refreshTravelsHandler = () => {
    setRefreshFlag((prev) => !prev);
  };

  const excludeTravel = (travelId: string) => {
    setExcludedTravelId(travelId);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <ProfileMain
      travelsData={travelsData}
      travelsStatus={travelsStatus}
      changePageHandler={changePageHandler}
      excludedTravelId={excludedTravelId}
      excludeTravel={excludeTravel}
      refreshTravelsHandler={refreshTravelsHandler}
      isOwner={userIdCompare(params.id)}
    />
  );
}
