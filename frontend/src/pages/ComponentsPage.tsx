import { useState } from "react"
import {
  MoonIcon,
  SunIcon,
  InfoIcon,
  AlertTriangleIcon,
  BellIcon,
  UserIcon,
  SearchIcon,
  XIcon,
  UploadIcon,
  TrendingUpIcon,
} from "lucide-react"
import { Kbd } from "@/components/ui/kbd"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-wrap gap-3 items-start">{children}</div>
    </section>
  )
}

function DemoCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Card className="min-w-48 flex-1">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 items-center">
        {children}
      </CardContent>
    </Card>
  )
}

export default function ComponentsPage() {
  const { theme, setTheme } = useTheme()
  const [progress] = useState(68)
  const [switchOn, setSwitchOn] = useState(false)
  const [checked, setChecked] = useState(false)
  const [tags, setTags] = useState(["cache", "spring-boot"])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Component Library</h1>
            <p className="text-sm text-muted-foreground">
              All UI components in one place
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {theme === "latte" ? "Latte" : "Mocha"}
            </Badge>
            <Badge variant="secondary">
              {import.meta.env.DEV ? "Dev" : "Prod"}
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-12">
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
          <DemoCard label="Variants">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </DemoCard>
          <DemoCard label="Semantic">
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
          </DemoCard>
          <DemoCard label="Tags & versions">
            <Badge variant="secondary">v2.1.0</Badge>
            <Badge variant="tag">auth</Badge>
            <Badge variant="tag">spring-boot</Badge>
            <Badge variant="tag">
              <TrendingUpIcon />
              trending
            </Badge>
          </DemoCard>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Default card</CardTitle>
              <CardDescription>
                This is a card description with some extra detail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card body content goes here. You can put anything inside.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </CardFooter>
          </Card>
          <Card size="sm" className="w-72">
            <CardHeader>
              <CardTitle>Small card</CardTitle>
              <CardDescription>A more compact card variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Same card, tighter spacing.
              </p>
            </CardContent>
          </Card>
          <div className="flex w-full flex-wrap gap-3">
            <Card variant="default" interactive className="w-56">
              <CardContent className="text-sm text-muted-foreground">
                Default · hover for accent border
              </CardContent>
            </Card>
            <Card variant="elevated" interactive className="w-56">
              <CardContent className="text-sm text-muted-foreground">
                Elevated · hover to lift
              </CardContent>
            </Card>
            <Card variant="flat" interactive className="w-56">
              <CardContent className="text-sm text-muted-foreground">
                Flat · hover for fill
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Alerts */}
        <Section title="Alerts">
          <div className="flex flex-col gap-3 flex-1">
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
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="demo-input">Label</Label>
              <Input id="demo-input" placeholder="Enter text…" />
            </div>
          </DemoCard>
          <DemoCard label="Disabled">
            <Input placeholder="Disabled input" disabled />
          </DemoCard>
          <DemoCard label="Textarea">
            <Textarea
              placeholder="Write something…"
              rows={3}
              className="w-full"
            />
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

        {/* Checkboxes & Switches */}
        <Section title="Controls">
          <DemoCard label="Checkbox">
            <div className="flex flex-col gap-3 w-full">
              <label className="flex w-fit items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(v) => setChecked(!!v)}
                />
                <span className="text-sm">
                  {checked ? "Checked" : "Unchecked"}
                </span>
              </label>
              <label className="flex w-fit items-center gap-2 cursor-pointer opacity-50">
                <Checkbox disabled defaultChecked />
                <span className="text-sm">Disabled checked</span>
              </label>
            </div>
          </DemoCard>
          <DemoCard label="Switch">
            <div className="flex flex-col gap-3 w-full">
              <label className="flex w-fit items-center gap-2 cursor-pointer">
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                <span className="text-sm">{switchOn ? "On" : "Off"}</span>
              </label>
              <label className="flex w-fit items-center gap-2 cursor-pointer">
                <Switch size="sm" />
                <span className="text-sm">Small switch</span>
              </label>
            </div>
          </DemoCard>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <div className="flex-1 flex flex-col gap-4">
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
                  <CardContent className="pt-4 font-mono text-sm text-muted-foreground">
                    {"<Button>Click me</Button>"}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="docs">
                <Card>
                  <CardContent className="pt-4 text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground pt-2">
                  Line variant — Overview content.
                </p>
              </TabsContent>
              <TabsContent value="b">
                <p className="text-sm text-muted-foreground pt-2">
                  Line variant — Settings content.
                </p>
              </TabsContent>
              <TabsContent value="c">
                <p className="text-sm text-muted-foreground pt-2">
                  Line variant — Activity content.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* Progress */}
        <Section title="Progress">
          <DemoCard label="Progress bar">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {progress}%
                </span>
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
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-2 flex-1">
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
            <Spinner className="size-8 text-primary" />
          </DemoCard>
        </Section>

        {/* Search & Keyboard */}
        <Section title="Search & Keyboard">
          <DemoCard label="Search input">
            <div className="relative w-full">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search packages, orgs, tags…"
                className="pl-9 pr-14"
              />
              <Kbd className="absolute top-1/2 right-2.5 -translate-y-1/2">
                ⌘K
              </Kbd>
            </div>
          </DemoCard>
          <DemoCard label="Keys">
            <Kbd>⌘K</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>↵</Kbd>
            <div className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>P</Kbd>
            </div>
          </DemoCard>
        </Section>

        {/* Tag input */}
        <Section title="Tag input">
          <DemoCard label="Removable chips">
            <div className="flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-input p-2 transition-colors hover:border-foreground/25">
              {tags.map((t) => (
                <Badge
                  key={t}
                  asChild
                  variant="tag"
                  interactive
                  className="gap-1 pr-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((x) => x !== t))}
                    aria-label={`Remove ${t}`}
                  >
                    {t}
                    <XIcon className="size-3 opacity-70" />
                  </button>
                </Badge>
              ))}
              <span className="px-1 font-mono text-xs text-muted-foreground">
                + tag
              </span>
            </div>
          </DemoCard>
        </Section>

        {/* File upload */}
        <Section title="File upload">
          <div
            role="button"
            tabIndex={0}
            className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input py-10 text-center transition-colors outline-none hover:border-foreground/25 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
              <UploadIcon className="size-5" />
            </div>
            <p className="text-sm">
              <span className="text-foreground">Drag your .zip here</span>
              <span className="text-muted-foreground">, or </span>
              <span className="text-primary underline-offset-2 group-hover:underline">
                click to browse
              </span>
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Accepted: .zip · Max 50 MB
            </p>
          </div>
        </Section>

        {/* Tab switcher with counts */}
        <Section title="Tab switcher">
          <div className="flex-1">
            <Tabs defaultValue="top">
              <TabsList variant="line">
                <TabsTrigger value="top">
                  Top
                  <span className="rounded bg-muted px-1.5 font-mono text-[11px] text-muted-foreground group-data-active/tabs-trigger:bg-primary/15 group-data-active/tabs-trigger:text-primary">
                    6
                  </span>
                </TabsTrigger>
                <TabsTrigger value="trending">
                  Trending
                  <span className="rounded bg-muted px-1.5 font-mono text-[11px] text-muted-foreground group-data-active/tabs-trigger:bg-primary/15 group-data-active/tabs-trigger:text-primary">
                    4
                  </span>
                </TabsTrigger>
                <TabsTrigger value="new">
                  New
                  <span className="rounded bg-muted px-1.5 font-mono text-[11px] text-muted-foreground group-data-active/tabs-trigger:bg-primary/15 group-data-active/tabs-trigger:text-primary">
                    12
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="top">
                <p className="pt-2 text-sm text-muted-foreground">
                  Top packages this week.
                </p>
              </TabsContent>
              <TabsContent value="trending">
                <p className="pt-2 text-sm text-muted-foreground">
                  Trending packages.
                </p>
              </TabsContent>
              <TabsContent value="new">
                <p className="pt-2 text-sm text-muted-foreground">
                  Newly published packages.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* Org avatars */}
        <Section title="Org avatars">
          <DemoCard label="Mono initials">
            <Avatar>
              <AvatarFallback className="bg-primary/15 font-mono text-primary">
                TF
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-info/15 font-mono text-info">
                CL
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-success/15 font-mono text-success">
                NG
              </AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback className="bg-warning/15 font-mono text-warning">
                OB
              </AvatarFallback>
            </Avatar>
          </DemoCard>
        </Section>

        {/* Separator */}
        <Section title="Separator">
          <DemoCard label="Horizontal">
            <div className="flex flex-col gap-3 w-full">
              <span className="text-sm">Above</span>
              <Separator />
              <span className="text-sm">Below</span>
            </div>
          </DemoCard>
          <DemoCard label="Vertical">
            <div className="flex items-center gap-3 h-8">
              <span className="text-sm">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Right</span>
            </div>
          </DemoCard>
        </Section>
      </main>

      {/* Floating theme switcher */}
      <button
        onClick={() => setTheme(theme === "latte" ? "mocha" : "latte")}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-foreground/10 transition-all hover:scale-105 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {theme === "latte" ? (
          <MoonIcon className="size-5" />
        ) : (
          <SunIcon className="size-5" />
        )}
      </button>
    </div>
  )
}
