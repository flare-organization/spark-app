import { Logo } from '@/components/logo'
import { LoginForm } from '@/components/ui/login-form'

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-card relative hidden items-center justify-center lg:flex">
                <Logo size={96} className="gap-4 [&>span]:text-4xl" />
            </div>
        </div>
    )
}
