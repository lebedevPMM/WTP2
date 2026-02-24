import React from 'react'

interface FormInputProps {
    label: string
    name: string
    type?: string
    placeholder?: string
    error?: string
    required?: boolean
    register?: any
    disabled?: boolean
    className?: string
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    required = false,
    register,
    disabled = false,
    className = ''
}) => {
    const errorId = `${name}-error`
    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required" aria-hidden="true">*</span>}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                aria-required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                {...register}
                className={`form-input ${error ? 'error' : ''}`}
            />
            {error && <span id={errorId} className="form-error" role="alert">{error}</span>}
        </div>
    )
}

export default FormInput
