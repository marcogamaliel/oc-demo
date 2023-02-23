import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ClientsView } from "./views/clients/clients.view"
import { ErrorBoundary, ErrorView } from "./views/error/error.view"
import { LoginView } from "./views/login/login.view"
import { CreateOCView } from "./views/ocs/create-oc/create-oc.view"
import { OCView } from "./views/ocs/oc/oc.view"
import { OCsView } from "./views/ocs/ocs/ocs.view"
import { ProductsView } from "./views/products/products.view"
import { SettingsView } from "./views/settings/settings.view"

export function AppRoutes() {
    const router = createBrowserRouter([
        {path: "/ocs/create", element: <ErrorBoundary><CreateOCView /></ErrorBoundary>},
        {path: "/ocs/:id", element: <ErrorBoundary><OCView /></ErrorBoundary>},
        {path: "/ocs/:id/edit", element: <ErrorBoundary><LoginView /></ErrorBoundary>},
        {path: "/ocs", element: <ErrorBoundary><OCsView /></ErrorBoundary>},
        {path: "/settings", element: <ErrorBoundary><SettingsView /></ErrorBoundary>},
        {path: "/clients", element: <ErrorBoundary><ClientsView /></ErrorBoundary>},
        {path: "/products", element: <ErrorBoundary><ProductsView /></ErrorBoundary>},
        {path: "/login", element: <ErrorBoundary><LoginView /></ErrorBoundary>},
        {path: "/", element: <ErrorBoundary><OCsView /></ErrorBoundary>},
        {path: "*", element: <ErrorView />}
    ])
    return <RouterProvider router={router} />
}