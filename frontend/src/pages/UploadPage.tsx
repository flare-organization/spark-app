import {type SubmitEvent, useState} from 'react'
import {Button} from '@/components/ui/button'

const ENDPOINT = 'http://localhost:8080/api/upload'

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<string>('')
    const [response, setResponse] = useState<string>('')
    const [busy, setBusy] = useState(false)

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!file) return
        setBusy(true)
        setStatus('Uploading…')
        setResponse('')
        try {
            const form = new FormData()
            form.append('file', file)
            const res = await fetch(ENDPOINT, {method: 'POST', body: form})
            const text = await res.text()
            setStatus(`${res.status} ${res.statusText}`)
            setResponse(text)
        } catch (err) {
            setStatus('Request failed')
            setResponse(err instanceof Error ? err.message : String(err))
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
            <h1 className="text-2xl font-bold">Upload file</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md border-solid border-4">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full text-sm"
                />
                <Button type="submit" disabled={!file || busy}>
                    {busy ? 'Uploading…' : 'Upload'}
                </Button>
            </form>
            {status && (
                <div className="w-full max-w-md flex flex-col gap-2">
                    <div className="text-sm font-medium">Status: {status}</div>
                    {response && (
                        <pre
                            className="text-xs bg-muted p-3 rounded overflow-auto max-h-64 whitespace-pre-wrap break-all">{response}
                        </pre>
                    )}
                </div>
            )}
        </div>
    )
}
