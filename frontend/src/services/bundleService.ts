export interface Bundle {
  id: string
  name: string
  slug: string
  createdAt: string
}

export async function getBundles(): Promise<Bundle[]> {
  const res = await fetch('/api/v1/bundles')
  if (!res.ok) throw new Error('Failed to fetch bundles')
  return res.json()
}

export async function createBundle(name: string): Promise<Bundle> {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  const res = await fetch('/api/v1/bundles/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, slug }),
  })
  if (!res.ok) throw new Error('Failed to create bundle')
  return res.json()
}