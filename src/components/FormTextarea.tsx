import React from 'react'

interface FormTextareaProps {
    label: string
    name: string
    placeholder?: string
    error?: string
    required?: boolean
    register?: any
    disabled?: boolean
    rows?: number
    className?: string
}

const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    name,
    placeholder,
    error,
    required = false,
    register,
    disabled = false,
    rows = 4,
    className = ''
}) => {
    const errorId = `${name}-error`
    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required" aria-hidden="true">*</span>}
            </label>
            <textarea
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                aria-required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                {...register}
                className={`form-textarea ${error ? 'error' : ''}`}
            />
            {error && <span id={errorId} className="form-error" role="alert">{error}</span>}
        </div>
    )
}

export default FormTextarea
