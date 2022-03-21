import { Header } from "./Header";

export function Layout({preview, children}) {
  return (
    <div className="min-h-screen md:p-10 lg:p-20 p-5">
      <Header />
      {children}
    </div>
  )
}