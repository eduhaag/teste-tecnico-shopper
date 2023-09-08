import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

import './styles.module.css'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}