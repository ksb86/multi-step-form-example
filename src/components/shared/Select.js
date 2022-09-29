import cx from 'classnames';
import { ImSpinner8 } from 'react-icons/im';

export default function Select({ label, options, className, value, error, pending, ...props }) {
    return (
        <div>
            <div className="d-flex align-items-center">
                <select className={cx({'border-danger': Boolean(error)}, 'form-select border', className)} value={value} {...props}>
                    <option value="">{pending ? 'loading colors...' : 'Select your favorite color'}</option>
                    {options.map(o => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                {pending ? <ImSpinner8 className="spin ms-3" /> : null}
            </div>
            {error ? <div className="small text-danger">{error}</div> : ''}
        </div>
    );
}
