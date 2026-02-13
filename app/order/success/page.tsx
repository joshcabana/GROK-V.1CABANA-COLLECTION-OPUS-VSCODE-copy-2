import OrderSuccessContent from './OrderSuccessContent'

type SuccessPageProps = {
  searchParams?: {
    session_id?: string | string[]
  }
}

export default function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams?.session_id
  const normalizedSessionId = Array.isArray(sessionId) ? sessionId[0] : sessionId

  return <OrderSuccessContent sessionId={normalizedSessionId} />
}
