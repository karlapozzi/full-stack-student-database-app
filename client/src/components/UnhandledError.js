import React from 'react';

//Create page to show when the API returns a server error or other unhandled response status
export default function UnhandledError() {
  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </main>
  );
}