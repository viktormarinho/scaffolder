import { Route, Routes } from 'react-router-dom'

// This file implements File-System routing for the client react app,
// and you should not need to edit it.

type RoutesType = {
    [key: string]: { default: React.ElementType }
}

type PreservedRoutesType = {
    '404'?: React.ElementType
}

const ROUTES: RoutesType = import.meta.glob("/src/pages/**/[a-z[]*.tsx", { eager: true })
const PRESERVED: RoutesType = import.meta.glob('/src/pages/404.tsx', { eager: true })

const routes = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')

    return { path, component: ROUTES[route].default }
})

const preserved: PreservedRoutesType = Object.keys(PRESERVED).reduce((preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '')
    return { ...preserved, [key]: PRESERVED[file].default }
}, {})

export const AppRoutes = () => {
    const NotFound = preserved?.['404']

    return (
        <Routes>
            {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={Component ? <Component /> : <></>} />
            ))}
            <Route path='*' element={NotFound ? <NotFound /> : <></>} />
        </Routes>
    )
}