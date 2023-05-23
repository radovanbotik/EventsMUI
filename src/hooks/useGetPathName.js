import { useEffect } from "react";

const useGetPathName = ({ action, dependecies }) => {
  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    action(pathname);
  }, dependecies || []);
};

export default useGetPathName;
