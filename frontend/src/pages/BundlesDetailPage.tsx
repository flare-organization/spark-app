import { ArrowLeft, FileText, Globe, Lock, Package } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { MarkdownContent } from '@/components/markdown'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useBundle } from '@/hooks/use-bundle'
import { bundleInitials, formatDate, formatSize } from '@/lib/format'
import { BundleDetailStatusEnum } from '@openapi/model/bundleDetail.ts'

export default function BundlesDetailPage() {
    const { name } = useParams<{ name: string }>()
    const { bundle, loading, error, notFound } = useBundle(name)

    if (loading) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-8">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-full max-w-lg" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-20 text-center">
                <Package className="text-muted-foreground size-10" aria-hidden="true" />
                <h1 className="font-mono text-xl font-semibold">Bundle not found</h1>
                <p className="text-muted-foreground text-sm">No bundle named “{name}” exists.</p>
                <Link to="/" className="text-primary mt-2 text-sm hover:underline">
                    Back to bundles
                </Link>
            </div>
        )
    }

    if (error || !bundle) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                <p className="text-destructive text-sm">{error ?? 'Could not load bundle'}</p>
            </div>
        )
    }

    const { latestVersion } = bundle
    const readme = latestVersion?.readme
    const isPublic = bundle.status === BundleDetailStatusEnum.PUBLIC

    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-7 px-6 py-8">
            <Link
                to="/"
                className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm"
            >
                <ArrowLeft className="size-4" aria-hidden="true" />
                All bundles
            </Link>

            <header className="flex items-start gap-4">
                <Avatar size="lg">
                    <AvatarFallback>{bundleInitials(bundle.name)}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="text-primary font-mono text-2xl font-semibold tracking-tight">
                            {bundle.name}
                        </h1>
                        {latestVersion && (
                            <Badge variant="secondary" className="font-mono">
                                v{latestVersion.version}
                            </Badge>
                        )}
                        <Badge variant="outline" className="gap-1">
                            {isPublic ? (
                                <Globe className="size-3" aria-hidden="true" />
                            ) : (
                                <Lock className="size-3" aria-hidden="true" />
                            )}
                            {isPublic ? 'Public' : 'Private'}
                        </Badge>
                    </div>
                    {bundle.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {bundle.description}
                        </p>
                    )}
                    {bundle.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1.5">
                            {bundle.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="grid gap-7 md:grid-cols-[1fr_220px]">
                <main className="min-w-0">
                    <div className="mb-3 flex items-center gap-2">
                        <FileText className="text-muted-foreground size-4" aria-hidden="true" />
                        <h2 className="font-mono text-sm font-semibold tracking-tight">README</h2>
                    </div>
                    <Card>
                        <CardContent className="py-5">
                            {readme ? (
                                <MarkdownContent>{readme}</MarkdownContent>
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    This bundle has no README yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </main>

                <aside className="flex flex-col gap-3">
                    <h2 className="font-mono text-sm font-semibold tracking-tight">Versions</h2>
                    {latestVersion && (
                        <div className="text-muted-foreground flex flex-col gap-1 text-xs">
                            <span>Latest published {formatDate(latestVersion.publishedAt)}</span>
                            {latestVersion.fileSize != null && (
                                <span>{formatSize(latestVersion.fileSize)}</span>
                            )}
                        </div>
                    )}
                    <Separator />
                    {bundle.versions.length === 0 ? (
                        <p className="text-muted-foreground text-xs">No releases yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {bundle.versions.map((version) => (
                                <li
                                    key={version.version}
                                    className="flex items-baseline justify-between gap-2"
                                >
                                    <span className="font-mono text-sm">{version.version}</span>
                                    <span className="text-muted-foreground text-xs">
                                        {formatDate(version.publishedAt)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>
            </div>
        </div>
    )
}
