import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import ReactNotification from 'react-notifications-component';

const MainPage = React.lazy(() => import("pages/MainPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <ReactNotification />
        <MainPage/>
      </Suspense>
    </div>
  );
}

export default App;