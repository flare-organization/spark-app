import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getBundles } from '@/services/bundleService'
import type {Bundle} from "@openapi/model/bundle.ts";

export default function BundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [error, setError] = useState<string | null>(null)

    console.log("hello")

  useEffect(() => {
    getBundles()
      .then(setBundles)
      .catch(() => setError('Could not load bundles'))
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bundles</h1>
        <Link to="/bundles/create">
          <Button>Create bundle</Button>
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {bundles.length === 0 && !error && (
        <p className="text-muted-foreground">No bundles yet.</p>
      )}

      <ul className="flex flex-col gap-2">
        {bundles.map((bundle) => (
          <li
            key={bundle.id}
            className="border rounded-md px-4 py-3 text-sm"
          >
            {bundle.name}
          </li>
        ))}
      </ul>
    </div>
  )
}