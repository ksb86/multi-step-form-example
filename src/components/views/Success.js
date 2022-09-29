import { useAtom } from 'jotai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { formAtom, initialState } from '../../App';
import { Button } from '../shared';

export default function Success() {
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
            <h3 className="mb-4 d-flex align-items-center justify-content-center"><BsFillCheckCircleFill className="me-3" fill="green" />Success!</h3>
            <div>You should receive a confirmation email soon.</div>
            <div className="d-flex mt-5 align-items-center justify-content-end">
                <Button className="btn-secondary me-3" text="Back" type="button" onClick={() => navigate('/confirmation')} />
                <Button className="" text="Restart" />
            </div>
        </form>
    );
}
