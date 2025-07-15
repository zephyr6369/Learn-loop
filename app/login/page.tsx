import { AuthForms } from "@/components/auth-forms"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
      <AuthForms />
    </div>
  )
}
