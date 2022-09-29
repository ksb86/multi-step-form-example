import { useState} from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { BsFillXCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { formAtom } from '../../App';
import { Button } from '../shared';

export default function Confirmation() {
    const [formState] = useAtom(formAtom);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3001/api/submit',
                data: Object.entries(formState).reduce((acc, [key, value]) => {
                    acc[key] = value.value
                    return acc;
                }, {}),
                validateStatus: () => true,
            });
            setPending(false);
            if (response.status !== 200) {
                // improvement: save response.data.error to state and display on error page
                navigate('/error');
            } else {
                navigate('/success');
            }
        } catch (error) {
            setPending(false);
            navigate('/error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Confirmation</h3>
            <ul className="w-100 list-group list-group-flush">
                <li className="d-flex justify-content-between list-group-item"><span className="pe-3">First Name:</span><span>{formState.name.value}</span></li>
                <li className="d-flex justify-content-between list-group-item"><span className="pe-3">E-mail:</span><span>{formState.email.value}</span></li>
                <li className="d-flex justify-content-between list-group-item text-truncate"><span className="pe-3">Password:</span><span>{formState.password.value.split('').fill('*')}</span></li>
                <li className="d-flex justify-content-between list-group-item"><span className="pe-3">Favorite color:</span><span>{formState.color.value}</span></li>
                <li className="d-flex justify-content-between list-group-item"><span className="pe-3">Terms and conditions:</span><span>{formState.terms.value ? <BsFillCheckCircleFill fill="green" />: <BsFillXCircleFill fill="red" />}</span></li>
            </ul>
            <div className="d-flex mt-5 align-items-center justify-content-end">
                {pending ? <ImSpinner8 className="spin" /> : null}
                <Button disabled={pending} className="btn-secondary ms-3" text="Back" type="button" onClick={() => navigate('/more-info')} />
                <Button disabled={pending} className="ms-3" text={`Submit${pending ? 'ting': ''}`} />
            </div>
        </form>
    );
}
