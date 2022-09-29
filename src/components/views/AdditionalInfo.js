import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { formAtom } from '../../App';
import { Button, Checkbox, Select } from '../shared';

export default function AdditionalInfo() {
    const [formState, setFormState] = useAtom(formAtom);
    const navigate = useNavigate();
    const [colors, setColors] = useState([]);
    const [pending, setPending] = useState(false);
    const cancelTokenRef = useRef(new AbortController());

    useEffect(() => {
        async function getColors() {
            setPending(true);
            try {
                const { data } = await axios('http://localhost:3001/api/colors', {
                    signal: cancelTokenRef.current.signal,
                });
                setColors(data);
                setPending(false);
            } catch (error) {
                console.warn('canceled get api/colors');
            }
        }

        // improvement: cache colors and only call if empty or stale
        getColors();

        return () => {
            cancelTokenRef.current.abort();
        };
    }, []);

    const handleChange = (e, input) => {
        setFormState({
            ...formState,
            [input]: {
                error: e.target.value.trim() ? '' : formState[input].error,
                value: input === 'terms' ? e.target.checked : e.target.value,
            },
        });
    };

    const validateInputs = () => {
        let hasError = false;
        let newFormState = {
            ...formState,
        };

        if (!formState.color.value.trim()) {
            newFormState = {
                ...newFormState,
                color: {
                    ...newFormState.color,
                    error: 'Favorite color is required',
                },
            };
            hasError = true;
        }

        if (hasError) {
            setFormState(newFormState);
        }

        return hasError;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('the-form-state', JSON.stringify(formState));
        const hasError = validateInputs();
        if (!hasError) {
            navigate('/confirmation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Additional Info</h3>
            <Select
                options={colors}
                pending={pending}
                className="px-3 py-1 my-1"
                error={formState.color.error}
                value={formState.color.value}
                onChange={(e) => handleChange(e, 'color')}
            />
            <Checkbox
                checked={formState.terms.value}
                label={() => (<>I agree to <a href="https://www.upgrade.com/funnel/borrower-documents/TERMS_OF_USE" red="noopener noreferrer" className="link" target="_blank">Terms and conditions</a>.</>)}
                error={formState.terms.error}
                onChange={(e) => handleChange(e, 'terms')}
            />
            <div className="d-flex mt-5 align-items-center justify-content-end">
                <Button className="btn-secondary ms-3" text="Back" type="button" onClick={() => navigate('/')} />
                <Button disabled={pending} className="ms-3" text="Next" />
            </div>
        </form>
    );
}
