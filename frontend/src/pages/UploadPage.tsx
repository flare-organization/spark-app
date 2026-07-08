import { type SubmitEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadBundleFile } from '@/services/bundleService.ts'

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [bundleId, setBundleId] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [response, setResponse] = useState<string>('')
    const [busy, setBusy] = useState(false)

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!file || !bundleId) return
        setBusy(true)
        setStatus('Uploading…')
        setResponse('')
        try {
            const result = await uploadBundleFile(bundleId, file)
            setStatus('Upload successful')
            setResponse(JSON.stringify(result, null, 2))
        } catch (err) {
            setStatus('Request failed')
            setResponse(err instanceof Error ? err.message : String(err))
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
            <h1 className="text-2xl font-bold">Upload file</h1>
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-md flex-col items-center gap-4 border-4 border-solid"
            >
                <input
                    type="text"
                    value={bundleId}
                    onChange={(e) => setBundleId(e.target.value)}
                    placeholder="Bundle ID"
                    className="w-full text-sm"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full text-sm"
                />
                <Button type="submit" disabled={!file || !bundleId || busy}>
                    {busy ? 'Uploading…' : 'Upload'}
                </Button>
            </form>
            {status && (
                <div className="flex w-full max-w-md flex-col gap-2">
                    <div className="text-sm font-medium">Status: {status}</div>
                    {response && (
                        <pre className="bg-muted max-h-64 overflow-auto rounded p-3 text-xs break-all whitespace-pre-wrap">
                            {response}
                        </pre>
                    )}
                </div>
            )}
        </div>
    )
}
