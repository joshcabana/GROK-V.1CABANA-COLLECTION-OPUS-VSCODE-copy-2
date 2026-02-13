import OrderSuccessContent from './OrderSuccessContent'

type SuccessPageProps = {
  searchParams?: Promise<{
    session_id?: string | string[]
  }>
}

export default async function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const sessionId = resolvedSearchParams?.session_id
  const normalizedSessionId = Array.isArray(sessionId) ? sessionId[0] : sessionId

  return <OrderSuccessContent sessionId={normalizedSessionId} />
}
