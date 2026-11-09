import ScamSignalPage from '../components/scam-signal/ScamSignalPage'

export default function Page() {
  return <ScamSignalPage demoMode={process.env.PORTFOLIO_DEMO === 'true'} />
}
