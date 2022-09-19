import React from 'react';
import './TravelMain.css';
import { ErrorResponse, GetTravelResponse } from 'types';
import { IconButtonBlack } from '../../../components/common/IconButtonBlack/IconButtonBlack';
import { TravelInfo } from '../TravelInfo/TravelInfo';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { AddButton } from '../../../components/common/AddButton/AddButton';

interface Props {
  travelStatus: number | null;
  travelData: GetTravelResponse | ErrorResponse | null;
  isOwner: boolean;
  goBackHandler: () => void;
  goAddPost: () => void;
  children: React.ReactNode;
}

export function TravelMain({
  travelStatus,
  travelData,
  goBackHandler,
  goAddPost,
  isOwner,
  children,
}: Props) {
  return (
    <main className="TravelMain">
      <section className="TravelMain__window">
        <IconButtonBlack
          onClick={goBackHandler}
          bootstrapIcon="bi bi-arrow-left-short"
        />

        {
          travelStatus === 200 && travelData && !('error' in travelData)
            ? (
              <TravelInfo
                title={travelData.title}
                destination={travelData.destination}
                startAt={new Date(travelData.startAt)}
                endAt={new Date(travelData.endAt)}
                comradesCount={travelData.comradesCount}
                description={travelData.description}
                photoUrl={travelData.photo}
              />
            )
            : travelStatus !== null && (<ForbiddenWindow />)
        }
        {(travelStatus === null) ? <LoadingSpinner /> : null}

        {
          travelStatus === 200
          && travelData
          && !('error' in travelData)
          && isOwner
          && (<AddButton onClick={goAddPost} />)
        }
        <div id="scrollTo" />

        {children}
      </section>
    </main>
  );
}
