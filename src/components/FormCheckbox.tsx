import React from 'react'

interface FormCheckboxProps {
    name: string
    label: React.ReactNode
    error?: string
    register?: object
    className?: string
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
    name,
    label,
    error,
    register,
    className = ''
}) => {
    const errorId = `${name}-error`
    return (
        <div className={`form-field form-checkbox-field ${className}`}>
            <label htmlFor={name} className="form-checkbox-label">
                <input
                    id={name}
                    type="checkbox"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    {...register}
                    className={`form-checkbox ${error ? 'error' : ''}`}
                />
                <span className="form-checkbox-text">{label}</span>
            </label>
            {error && <span id={errorId} className="form-error" role="alert">{error}</span>}
        </div>
    )
}

export default FormCheckbox
