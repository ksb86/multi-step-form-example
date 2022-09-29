import cx from 'classnames';

export default function Input({label, className, error, ...props}) {
    return (
        <div>
            <input className={cx({'border-danger': Boolean(error)}, 'input border rounded-2', className)} placeholder={label} {...props} />
            {error ? <div className="small text-danger">{error}</div> : ''}
        </div>
    )
}