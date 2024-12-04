import { SiteHeader } from "./SiteHeader";

export function Layout({preview, children}) {
  return (
    <div className="min-h-screen md:p-10 lg:p-20 p-5">
      <SiteHeader />
      {children}
    </div>
  )
}