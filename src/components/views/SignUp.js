import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { formAtom } from '../../App';
import { Button, Input } from '../shared';

export default function SignUp() {
    const [formState, setFormState] = useAtom(formAtom);
    const navigate = useNavigate();

    const handleChange = (e, input) => {
        setFormState({
            ...formState,
            [input]: {
                error: e.target.value.trim() ? '' : formState[input].error,
                value: e.target.value,
            },
        });
    };

    const validateInputs = () => {
        let hasError = false;
        let newFormState = {
            ...formState,
        };

        if (!formState.name.value.trim()) {
            newFormState = {
                ...newFormState,
                name: {
                    ...newFormState.name,
                    error: 'First Name is required',
                },
            };
            hasError = true;
        }

        if (
            !formState.email.value.trim() ||
            !validator.isEmail(formState.email.value.trim())
        ) {
            newFormState = {
                ...newFormState,
                email: {
                    ...formState.email,
                    error: 'A valid email is required',
                },
            };
            hasError = true;
        }

        if (!formState.password.value.trim()) {
            // improvement: furthur password validation here
            newFormState = {
                ...newFormState,
                password: {
                    ...formState.password,
                    error: 'Password is required',
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
            navigate('/more-info');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Sign Up</h3>
            <Input
                className="px-3 py-1 my-2 w-100"
                label="First Name"
                error={formState.name.error}
                value={formState.name.value}
                onChange={(e) => handleChange(e, 'name')}
            />
            <Input
                className="px-3 py-1 my-2 w-100"
                label="E-mail"
                error={formState.email.error}
                value={formState.email.value}
                onChange={(e) => handleChange(e, 'email')}
            />
            <Input
                className="px-3 py-1 my-2 w-100"
                label="Password"
                type="password"
                error={formState.password.error}
                value={formState.password.value}
                onChange={(e) => handleChange(e, 'password')}
            />
            <div className="d-flex mt-5 align-items-center justify-content-end">
                <Button text="Next" />
            </div>
        </form>
    );
}
