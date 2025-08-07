import { useState } from 'react'
import './App.css'

function App() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(false)

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [...prev, { message, type, timestamp }])
    }

    const testPingEndpoint = async () => {
        setLoading(true)
        addLog('🔍 Testing /api/ping endpoint...', 'info')

        try {
            const response = await fetch('/api/ping')
            const data = await response.json()

            if (response.ok) {
                addLog(`✅ Ping successful: ${data.message}`, 'success')
                addLog(`📊 Response: ${JSON.stringify(data, null, 2)}`, 'data')
            } else {
                addLog(`❌ Ping failed with status: ${response.status}`, 'error')
            }
        } catch (error) {
            addLog(`💥 Network error: ${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    const testProxyEndpoint = async () => {
        setLoading(true)
        addLog('🔍 Testing /api/proxy endpoint...', 'info')

        try {
            const response = await fetch('/api/proxy')
            const data = await response.json()

            if (response.ok) {
                addLog(`✅ Proxy successful: ${data.message}`, 'success')
                addLog(`📊 Response: ${JSON.stringify(data, null, 2)}`, 'data')
            } else {
                addLog(`❌ Proxy failed with status: ${response.status}`, 'error')
            }
        } catch (error) {
            addLog(`💥 Network error: ${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    const clearLogs = () => {
        setLogs([])
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>🧪 GCP Test Application</h1>
                <p>Frontend connected to backend API</p>
            </header>

            <main className="App-main">
                <div className="button-group">
                    <button
                        onClick={testPingEndpoint}
                        disabled={loading}
                        className="test-button ping-button"
                    >
                        {loading ? '⏳ Testing...' : '📡 Test Ping API'}
                    </button>

                    <button
                        onClick={testProxyEndpoint}
                        disabled={loading}
                        className="test-button proxy-button"
                    >
                        {loading ? '⏳ Testing...' : '🔄 Test Proxy API'}
                    </button>

                    <button
                        onClick={clearLogs}
                        className="test-button clear-button"
                    >
                        🗑️ Clear Logs
                    </button>
                </div>

                <div className="logs-container">
                    <h3>📋 API Response Logs</h3>
                    <div className="logs">
                        {logs.length === 0 ? (
                            <p className="no-logs">No logs yet. Click a test button to start!</p>
                        ) : (
                            logs.map((log, index) => (
                                <div key={index} className={`log-entry ${log.type}`}>
                                    <span className="timestamp">[{log.timestamp}]</span>
                                    <span className="message">{log.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
