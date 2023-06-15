import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useInstructorClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: instructorClasses = null } = useQuery({
    queryKey: ['classes', user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecure(`/classes/${user?.email}`);
        return response;
      } catch (error) {
        // Handle the error here (e.g., show an error message)
        console.error("Error fetching instructor classes:", error);
        throw error;
      }
    },
  });

  return [instructorClasses, refetch];
};

export default useInstructorClasses;

