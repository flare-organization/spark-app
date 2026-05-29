import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBundle } from '@/services/bundleService'
import type {CreateBundleRequest} from "@openapi/model/createBundleRequest.ts";

export default function BundlesCreatePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError(null)

    const request: CreateBundleRequest = {
      name: name.trim(),
      readme: "",
      slug: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) // <--random slug for testing purposes :)
    }

    try {
      await createBundle(request)
      navigate('/bundles')
    } catch {
      setError('Failed to create bundle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link to="/bundles" className="text-muted-foreground text-sm hover:underline">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">Create bundle</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My bundle"
            autoFocus
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={loading || !name.trim()}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </div>
  )
}