"use client";

import EmptyState from "./components/EmptyState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <EmptyState title="Ooops!!!" subtitle="Something went wrong!" />
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
