import React from 'react'

interface FormSelectProps {
    label: string
    name: string
    options: { value: string; label: string }[]
    error?: string
    required?: boolean
    register?: any
    disabled?: boolean
    placeholder?: string
    className?: string
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    options,
    error,
    required = false,
    register,
    disabled = false,
    placeholder = 'Select an option',
    className = ''
}) => {
    const errorId = `${name}-error`
    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required" aria-hidden="true">*</span>}
            </label>
            <select
                id={name}
                disabled={disabled}
                aria-required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                {...register}
                className={`form-select ${error ? 'error' : ''}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span id={errorId} className="form-error" role="alert">{error}</span>}
        </div>
    )
}

export default FormSelect
