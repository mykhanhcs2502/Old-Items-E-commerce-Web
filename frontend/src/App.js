import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import PayMethod from './pages/PaymentMethod/PayMethod';

function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}

function App() {
  return (
    <div>
    </div>
  );

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/paymethod" element={<PayMethod />} />
  //       <Route path="*" element={<PageNotFound />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

}

export default App;