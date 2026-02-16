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
    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required">*</span>}
            </label>
            <textarea
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                {...register}
                className={`form-textarea ${error ? 'error' : ''}`}
            />
            {error && <span className="form-error">{error}</span>}
        </div>
    )
}

export default FormTextarea
