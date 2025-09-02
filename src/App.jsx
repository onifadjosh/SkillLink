import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Shadcn + Vite + JS + Tailwind v4 🎉</h1>
      <Button variant="default">Default</Button>
      <Button variant="outline" className="ml-2">Outline</Button>
    </div>
  )
}

export default App
