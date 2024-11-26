import { useRouteError } from "react-router-dom";
import { lazy } from "react";

const Error500 = lazy(() => import("./errorStatusComponents/Error500"));
const UnexpectedError = lazy(() => import("./errorStatusComponents/UnexpectedError"));

export default function Error() {
  const error = useRouteError();

  if (error.status === 500) {
    return <Error500 error={error}/>;
  }
  return <UnexpectedError error={error} />;
}
