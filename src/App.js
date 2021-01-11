import React, { Suspense } from 'react';

const MainPage = React.lazy(() => import("pages/MainPage"));
const ReactNotification = React.lazy(() => import("react-notifications-component"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <ReactNotification />
        <MainPage/>
      </Suspense>
    </div>
  );
}

export default App;