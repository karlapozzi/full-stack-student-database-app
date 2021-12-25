import React from 'react';

//Create page to show when someone navigates to a page that doesn't exist or when a 404 is returned by the API
export default function NotFound() {
  return (
    <main>
      <div className="wrap">
        <h2>Not Found</h2>
        <p>Sorry! We couldn't find the page you're looking for.</p>
      </div>
    </main>
  );
}