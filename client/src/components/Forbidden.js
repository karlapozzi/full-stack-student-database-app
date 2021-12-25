import React from 'react';

//Create page to show when a user doesn't have permission to access something
export default function Forbidden() {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh no! You can't access this page.</p>
      </div>
    </main>
  );
}