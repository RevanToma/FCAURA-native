import { useQuery } from "@tanstack/react-query";
import { fetchProfileSetup } from "../asyncStorage";

export const useUserProfile = () => {
  const query = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchProfileSetup,
  });

  return query;
};
