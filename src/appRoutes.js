import React from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './pages/home';
import LoginAdmin from './admin/loginAdmin';
import HeaderAdmin from './admin/headerAdmin';
import UsersAdminList from './admin/users/usersAdminList';
import CompaniesAdminList from './admin/companies/companiesAdminList';
import DevicesAdminList from './admin/devices/devicesAdminList';
import AuthAdminComp from './admin/authAdminComp';
import AddDeviceForm from "./admin/devices/addDeviceForm";
import EditDeviceForm from "./admin/devices/editDeviceForm";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={<HeaderAdmin />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/admin" element={<LoginAdmin/>} />
                <Route path="/admin/users" element={<UsersAdminList/>} />
                <Route path="/admin/companies" element={<CompaniesAdminList/>} />
                <Route path="/admin/devices" element={<DevicesAdminList/>} />
                <Route path="/admin/devices/add" element={<AddDeviceForm/>} />
                <Route path="/admin/devices/edit/:id" element={<EditDeviceForm/>} />
                <Route path="/*" element={<h2>Page 404, not found</h2>} />
            </Routes>
            <Routes>
                <Route path="/admin/:dir/*" element={<AuthAdminComp/>} />
            </Routes>

        </BrowserRouter>
    )
}
