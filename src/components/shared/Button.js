import cx from 'classnames';

export default function Button({text, className, ...props}) {

    return (
        <button className={cx(className, 'btn btn-primary')} {...props}>{text}</button>
    )
}