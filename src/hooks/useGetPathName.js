import { useEffect } from "react";

const useGetPathName = ({ action, dependecies }) => {
  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    action(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependecies || []);
};

export default useGetPathName;
