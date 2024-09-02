import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}