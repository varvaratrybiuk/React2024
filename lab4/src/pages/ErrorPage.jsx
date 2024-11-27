import { useRouteError } from "react-router-dom";
import { lazy, Suspense } from "react";

const Error500 = lazy(() =>
  import("../components/error/errorStatusComponents/Error500")
);
const UnexpectedError = lazy(() =>
  import("../components/error/errorStatusComponents/UnexpectedError")
);

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Suspense fallback={<p>Loading error page...</p>}>
      {error.status === 500 ? (
        <Error500 error={error} />
      ) : (
        <UnexpectedError error={error} />
      )}
    </Suspense>
  );
}
