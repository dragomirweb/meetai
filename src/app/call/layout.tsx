interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen flex-col overflow-hidden bg-black">
      {children}
    </div>
  )
}

export default Layout
