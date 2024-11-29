import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/App.tsx'

import Dashboard from './Pages/Dashboard.tsx'
import Layout from './components/Layout.tsx'
import AddCapsulePage from './Pages/AddCapsulePage.tsx'
import UploadToCapsule from './Pages/UploadToCapsulePage.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="addcapsule" element={<AddCapsulePage />} />
    <Route path="upload" element={<UploadToCapsule />}/>
  </Route>,
)

export default routes
