import Loading from 'components/Loading';
import React, { Suspense } from 'react';

const MainPage = React.lazy(() => import("pages/MainPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <MainPage/>
      </Suspense>
    </div>
  );
}

export default App;