import { useAtom } from 'jotai';
import { BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { formAtom, initialState } from '../../App';
import { Button } from '../shared';

export default function Error() {
    const [, setFormState] = useAtom(formAtom);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        localStorage.removeItem('the-form-state');
        setFormState(initialState);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="mb-4 d-flex align-items-center justify-content-center"><BsFillXCircleFill className="me-3" fill="red" />Error</h3>
            <div>Uh oh, something went wrong. Please try again later.</div>
            <div className="d-flex mt-5 align-items-center justify-content-end">
                <Button className="btn-secondary me-3" text="Back" type="button" onClick={() => navigate('/confirmation')} />
                <Button className="" text="Restart" />
            </div>
        </form>
    );
}
