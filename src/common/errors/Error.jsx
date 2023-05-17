import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return <div>Error message: {error.statusText || error.message}</div>;
};

export default Error;
