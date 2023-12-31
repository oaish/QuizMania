"use client";
export const setInitBreadcrumb = (data) => {
    localStorage.setItem("crumbs", JSON.stringify(data))
}

export const setBreadcrumb = (crumbs, path, name) => {
    localStorage.setItem("crumbs", JSON.stringify([...crumbs, {path, name}]))
}

export const getBreadcrumbs = () => {
    return JSON.parse(localStorage.getItem("crumbs"))
}