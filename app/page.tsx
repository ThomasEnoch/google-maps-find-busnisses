import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Business Lead Generator</h1>
      <div className="max-w-md">
        <SearchForm />
      </div>
    </div>
  )
}
