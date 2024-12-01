import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/App.tsx'

import Dashboard from './Pages/Dashboard.tsx'
import Layout from './components/Layout.tsx'
import AddCapsulePage from './Pages/AddCapsulePage.tsx'
import UploadToCapsule from './Pages/UploadToCapsulePage.tsx'
import ListAllCapsules from './components/ViewCapsule/ListAllCapsules.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="addcapsule" element={<AddCapsulePage />} />
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<ListAllCapsules />} />
      <Route path="/dashboard/:id" element={<UploadToCapsule />} />
    </Route>
  </Route>,
)

export default routes
