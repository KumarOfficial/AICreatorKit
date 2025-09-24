import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/contexts/AuthContext'
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Creator Kit" },
    { name: "description", content: "Multi-tenant LinkInBio platform" },
  ];
}

export default function Home() {
  const { user, loading, initialized } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (initialized && !loading) {
      if (user) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    }
  }, [user, loading, initialized, navigate])

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return null
}
