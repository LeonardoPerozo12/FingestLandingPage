import PropTypes from 'prop-types'
import '../../../css/authStyles.css';
import logoImage from '../../assets/FingestLogo - Landscape.svg';

export function AuthLayout({ authContent }) {
    return (
        <div className="auth-container">
            <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '45px', marginBottom: '45px' }}>
                    <img src={logoImage} alt="Logo" style={{ width: '300px', marginTop: '25px' }} />
                    <div
                        id="auth-content-col"
                        className="column"
                        style={{ padding: '25px' }}
                    >
                        {authContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

AuthLayout.propTypes = {
    authContent: PropTypes.node
}