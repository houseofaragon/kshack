import { Header } from "./Header";

export function Layout({preview, children}) {
  return (
    <div className="min-h-screen lg:p-20 md:p-10 p-5">
      <Header />
      {children}
    </div>
  )
}