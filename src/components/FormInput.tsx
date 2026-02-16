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
    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required">*</span>}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register}
                className={`form-input ${error ? 'error' : ''}`}
            />
            {error && <span className="form-error">{error}</span>}
        </div>
    )
}

export default FormInput
