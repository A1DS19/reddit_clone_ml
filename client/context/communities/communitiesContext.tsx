import React from 'react';
import { CommunityResponse, JoinedCommunities } from 'types/communities';
import { ReactFCWithChildren } from 'types/shared';

export interface CommunitiesContext {
  errorMessage: string | null;
  setErrorMessage: (error: string | null) => void;
  joinedCommunities: JoinedCommunities[];
  setJoinedCommunities: (joinedCommunities: JoinedCommunities[]) => void;
  selectedCommunity: CommunityResponse | null;
  setSelectedCommunity: (community: CommunityResponse) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  addJoinedCommunity: (newCommunity: JoinedCommunities) => void;
}

export const CommunitiesContext = React.createContext<CommunitiesContext | false>(false);

export const CommunitiesProvider: ReactFCWithChildren = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = React.useState<JoinedCommunities[]>(
    []
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunityState] =
    React.useState<CommunityResponse | null>(null);
  const [loading, setLoading] = React.useState(false);

  const setSelectedCommunity = (community: CommunityResponse) => {
    setSelectedCommunityState(community);
    localStorage.setItem('selectedCommunity', community?.slug.toString());
  };

  const addJoinedCommunity = (newCommunity: JoinedCommunities) =>
    setJoinedCommunities((prevCommunities) => [...prevCommunities, newCommunity]);

  const values: CommunitiesContext = {
    errorMessage,
    setErrorMessage,
    joinedCommunities,
    selectedCommunity,
    setSelectedCommunity,
    loading,
    setJoinedCommunities,
    addJoinedCommunity,
    setLoading,
  };

  return (
    <CommunitiesContext.Provider value={values}>{children}</CommunitiesContext.Provider>
  );
};
