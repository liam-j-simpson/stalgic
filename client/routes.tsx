import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/App.tsx'

import Dashboard from './Pages/Dashboard.tsx'
import Layout from './components/Layout.tsx';

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
);

export default routes