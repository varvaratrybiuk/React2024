
import './ProgressBar.css'

export default function ProgressBar(props) {
    const { progress } = props
    return (
        <div className="progress-bar" style={{ width: `${progress}%` }}>
            <span className="progress-text">{Math.round(progress)}%</span>
        </div>
    )
}
