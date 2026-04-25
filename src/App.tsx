/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-emerald-500 selection:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

