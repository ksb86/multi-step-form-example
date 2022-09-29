import cx from 'classnames';

export default function Checkbox({ label: Label, className, error, ...props }) {
    return (
        <div className="form-check mt-3">
            <input className={cx({'border-danger': Boolean(error)}, 'form-check-input border', className)} type="checkbox" value="" id="flexCheckDefault" {...props} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                <Label />
            </label>
            {error ? <div className="small text-danger">{error}</div> : ''}
        </div>
    );
}
