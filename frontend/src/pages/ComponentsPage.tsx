import { useState } from 'react'
import {
    MoonIcon,
    SunIcon,
    InfoIcon,
    AlertTriangleIcon,
    BellIcon,
    UserIcon,
    TagIcon,
    CheckCircleIcon,
    TrendingUpIcon,
} from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarBadge,
} from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { PulseDot } from '@/components/ui/pulse-dot'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Separator className="flex-1" />
            </div>
            <div className="flex flex-wrap items-start gap-3">{children}</div>
        </section>
    )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <Card className="min-w-48 flex-1">
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2">{children}</CardContent>
        </Card>
    )
}

export default function ComponentsPage() {
    const { theme, setTheme } = useTheme()
    const [progress] = useState(68)
    const [switchOn, setSwitchOn] = useState(false)
    const [checked, setChecked] = useState(false)

    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Header */}
            <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-2xl font-bold">Component Library</h1>
                        <p className="text-muted-foreground text-sm">
                            All UI components in one place
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="version">v0.1.0</Badge>
                        <Badge variant="outline">{theme === 'latte' ? 'Latte' : 'Mocha'}</Badge>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
                {/* Buttons */}
                <Section title="Buttons">
                    <DemoCard label="Variants">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </DemoCard>
                    <DemoCard label="Sizes">
                        <Button size="xs">XSmall</Button>
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </DemoCard>
                    <DemoCard label="Icon buttons">
                        <Button size="icon-sm" variant="outline">
                            <BellIcon />
                        </Button>
                        <Button size="icon" variant="outline">
                            <UserIcon />
                        </Button>
                        <Button size="icon-lg" variant="default">
                            <InfoIcon />
                        </Button>
                    </DemoCard>
                    <DemoCard label="States">
                        <Button disabled>Disabled</Button>
                        <Button variant="outline" disabled>
                            Disabled outline
                        </Button>
                    </DemoCard>
                </Section>

                {/* Badges */}
                <Section title="Badges">
                    <DemoCard label="Base variants">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="ghost">Ghost</Badge>
                    </DemoCard>
                    <DemoCard label="Semantic variants">
                        <Badge variant="version">v1.4.2</Badge>
                        <Badge variant="latest">
                            <CheckCircleIcon />
                            latest
                        </Badge>
                        <Badge variant="trending">
                            <TrendingUpIcon />
                            trending
                        </Badge>
                        <Badge variant="tag">
                            <TagIcon />
                            react
                        </Badge>
                        <Badge variant="info">
                            <InfoIcon />
                            info
                        </Badge>
                        <Badge variant="deprecated">deprecated</Badge>
                    </DemoCard>
                </Section>

                {/* Cards */}
                <Section title="Cards">
                    <Card className="w-64">
                        <CardHeader>
                            <CardTitle>Default</CardTitle>
                            <CardDescription>Subtle ring, hover brightens border.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Standard card with hover feedback.
                            </p>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button size="sm">Action</Button>
                            <Button size="sm" variant="ghost">
                                Cancel
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card variant="elevated" className="w-64">
                        <CardHeader>
                            <CardTitle>Elevated</CardTitle>
                            <CardDescription>Muted bg, lifts on hover.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Hover to see the lift effect.
                            </p>
                        </CardContent>
                    </Card>
                    <Card variant="flat" className="w-64">
                        <CardHeader>
                            <CardTitle>Flat</CardTitle>
                            <CardDescription>
                                Transparent bg, hover reveals surface.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Minimal footprint until hovered.
                            </p>
                        </CardContent>
                    </Card>
                    <Card size="sm" className="w-64">
                        <CardHeader>
                            <CardTitle>Small card</CardTitle>
                            <CardDescription>Compact spacing variant.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Same card, tighter padding.
                            </p>
                        </CardContent>
                    </Card>
                </Section>

                {/* Alerts */}
                <Section title="Alerts">
                    <div className="flex flex-1 flex-col gap-3">
                        <Alert>
                            <InfoIcon />
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription>
                                This is a default informational alert with a neutral tone.
                            </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                            <AlertTriangleIcon />
                            <AlertTitle>Error occurred</AlertTitle>
                            <AlertDescription>
                                Something went wrong. Please try again later.
                            </AlertDescription>
                        </Alert>
                    </div>
                </Section>

                {/* Inputs */}
                <Section title="Inputs">
                    <DemoCard label="Text Input">
                        <div className="flex w-full flex-col gap-2">
                            <Label htmlFor="demo-input">Label</Label>
                            <Input id="demo-input" placeholder="Enter text…" />
                        </div>
                    </DemoCard>
                    <DemoCard label="Disabled">
                        <Input placeholder="Disabled input" disabled />
                    </DemoCard>
                    <DemoCard label="Textarea">
                        <Textarea placeholder="Write something…" rows={3} className="w-full" />
                    </DemoCard>
                    <DemoCard label="Select">
                        <Select>
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="Pick a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="mango">Mango</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </DemoCard>
                </Section>

                {/* Controls */}
                <Section title="Controls">
                    <DemoCard label="Checkbox">
                        <div className="flex w-full flex-col gap-3">
                            <label className="inline-flex w-fit cursor-pointer items-center gap-2">
                                <Checkbox
                                    checked={checked}
                                    onCheckedChange={(v) => setChecked(!!v)}
                                />
                                <span className="text-sm">{checked ? 'Checked' : 'Unchecked'}</span>
                            </label>
                            <label className="inline-flex w-fit cursor-not-allowed items-center gap-2 opacity-50">
                                <Checkbox disabled defaultChecked />
                                <span className="text-sm">Disabled checked</span>
                            </label>
                        </div>
                    </DemoCard>
                    <DemoCard label="Switch">
                        <div className="flex w-full flex-col gap-3">
                            <label className="inline-flex w-fit cursor-pointer items-center gap-2">
                                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                                <span className="text-sm">{switchOn ? 'On' : 'Off'}</span>
                            </label>
                            <label className="inline-flex w-fit cursor-pointer items-center gap-2">
                                <Switch size="sm" />
                                <span className="text-sm">Small switch</span>
                            </label>
                        </div>
                    </DemoCard>
                </Section>

                {/* Tabs */}
                <Section title="Tabs">
                    <div className="flex flex-1 flex-col gap-4">
                        <Tabs defaultValue="preview">
                            <TabsList>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                <TabsTrigger value="code">Code</TabsTrigger>
                                <TabsTrigger value="docs">Docs</TabsTrigger>
                            </TabsList>
                            <TabsContent value="preview">
                                <Card>
                                    <CardContent className="pt-4">
                                        Rendered component preview goes here.
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="code">
                                <Card>
                                    <CardContent className="text-muted-foreground pt-4 font-mono text-sm">
                                        {'<Button>Click me</Button>'}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="docs">
                                <Card>
                                    <CardContent className="text-muted-foreground pt-4 text-sm">
                                        Documentation and API reference.
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        <Tabs defaultValue="a">
                            <TabsList variant="line">
                                <TabsTrigger value="a">Overview</TabsTrigger>
                                <TabsTrigger value="b">Settings</TabsTrigger>
                                <TabsTrigger value="c">Activity</TabsTrigger>
                            </TabsList>
                            <TabsContent value="a">
                                <p className="text-muted-foreground pt-2 text-sm">
                                    Line variant — Overview content.
                                </p>
                            </TabsContent>
                            <TabsContent value="b">
                                <p className="text-muted-foreground pt-2 text-sm">
                                    Line variant — Settings content.
                                </p>
                            </TabsContent>
                            <TabsContent value="c">
                                <p className="text-muted-foreground pt-2 text-sm">
                                    Line variant — Activity content.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </Section>

                {/* Kbd */}
                <Section title="Kbd">
                    <DemoCard label="Keys">
                        <Kbd>⌘</Kbd>
                        <Kbd>K</Kbd>
                        <Kbd>Esc</Kbd>
                        <Kbd>Enter</Kbd>
                        <Kbd>Tab</Kbd>
                    </DemoCard>
                    <DemoCard label="Combinations">
                        <KbdGroup>
                            <Kbd>⌘</Kbd>
                            <Kbd>K</Kbd>
                        </KbdGroup>
                        <KbdGroup>
                            <Kbd>Ctrl</Kbd>
                            <Kbd>Shift</Kbd>
                            <Kbd>P</Kbd>
                        </KbdGroup>
                        <span className="text-muted-foreground text-sm">
                            Press{' '}
                            <KbdGroup>
                                <Kbd>⌘</Kbd>
                                <Kbd>/</Kbd>
                            </KbdGroup>{' '}
                            to search
                        </span>
                    </DemoCard>
                </Section>

                {/* Pulse Dot */}
                <Section title="PulseDot">
                    <DemoCard label="Status indicators">
                        <div className="flex w-full flex-col gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <PulseDot variant="online" />
                                <span>Online</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PulseDot variant="busy" />
                                <span>Busy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PulseDot variant="away" />
                                <span>Away</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PulseDot variant="offline" />
                                <span>Offline</span>
                            </div>
                        </div>
                    </DemoCard>
                    <DemoCard label="Sizes">
                        <div className="flex items-center gap-3">
                            <PulseDot size="sm" variant="online" />
                            <PulseDot size="default" variant="online" />
                            <PulseDot size="lg" variant="online" />
                        </div>
                    </DemoCard>
                    <DemoCard label="In context">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <AvatarFallback>JD</AvatarFallback>
                                <AvatarBadge />
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Jane Doe</span>
                                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                    <PulseDot size="sm" variant="online" />
                                    Active now
                                </span>
                            </div>
                        </div>
                    </DemoCard>
                </Section>

                {/* Progress */}
                <Section title="Progress">
                    <DemoCard label="Progress bar">
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-muted-foreground text-xs">{progress}%</span>
                                <Progress value={progress} />
                            </div>
                            <Progress value={30} />
                            <Progress value={100} />
                        </div>
                    </DemoCard>
                </Section>

                {/* Avatar */}
                <Section title="Avatar">
                    <DemoCard label="Sizes & fallback">
                        <Avatar size="sm">
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>CD</AvatarFallback>
                        </Avatar>
                        <Avatar size="lg">
                            <AvatarFallback>EF</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </DemoCard>
                    <DemoCard label="Group">
                        <AvatarGroup>
                            <Avatar>
                                <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarFallback>BB</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarFallback>CC</AvatarFallback>
                            </Avatar>
                            <AvatarGroupCount>+4</AvatarGroupCount>
                        </AvatarGroup>
                    </DemoCard>
                </Section>

                {/* Skeleton */}
                <Section title="Skeleton">
                    <DemoCard label="Loading states">
                        <div className="flex w-full flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded-full" />
                                <div className="flex flex-1 flex-col gap-2">
                                    <Skeleton className="h-3 w-1/2" />
                                    <Skeleton className="h-3 w-3/4" />
                                </div>
                            </div>
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    </DemoCard>
                </Section>

                {/* Spinner */}
                <Section title="Spinner">
                    <DemoCard label="Loading indicator">
                        <Spinner className="size-4" />
                        <Spinner className="size-6" />
                        <Spinner className="text-primary size-8" />
                    </DemoCard>
                </Section>

                {/* Separator */}
                <Section title="Separator">
                    <DemoCard label="Horizontal">
                        <div className="flex w-full flex-col gap-3">
                            <span className="text-sm">Above</span>
                            <Separator />
                            <span className="text-sm">Below</span>
                        </div>
                    </DemoCard>
                    <DemoCard label="Vertical">
                        <div className="flex h-8 items-center gap-3">
                            <span className="text-sm">Left</span>
                            <Separator orientation="vertical" />
                            <span className="text-sm">Right</span>
                        </div>
                    </DemoCard>
                </Section>
            </main>

            {/* Floating theme switcher */}
            <button
                onClick={() => setTheme(theme === 'latte' ? 'mocha' : 'latte')}
                aria-label="Toggle theme"
                className="bg-primary text-primary-foreground ring-foreground/10 focus-visible:ring-ring/50 fixed right-6 bottom-6 z-50 flex size-12 items-center justify-center rounded-full shadow-lg ring-1 transition-all hover:scale-105 hover:shadow-xl focus-visible:ring-3 focus-visible:outline-none active:scale-95"
            >
                {theme === 'latte' ? (
                    <MoonIcon className="size-5" />
                ) : (
                    <SunIcon className="size-5" />
                )}
            </button>
        </div>
    )
}
